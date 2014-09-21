import configparser
import json

from importlib import import_module
from os.path import splitext
from bottle import route, abort, request
from tournament_of_lulz.exceptions.service_exception import ServiceException
from tournament_of_lulz.database.database import get_connection
import mysql.connector

CONFIG = configparser.ConfigParser()
CONFIG.read('./tournament_of_lulz/configuration/server.conf')

"""
    APIs are defined such that their paths follow a regular pattern.  From left to right,
    the path specifies key/value pairs, separated by a '/' (after the /api/ header).

    The resource type being acted on is given as the last segment of the path, with an optional
    resource ID following the resource type.

    The response format is appended to the end, typically something like '.json'.

    Examples:
    The resource type being accessed is 'image'.  The resource id is '123'.  Contextual to that is
    the key/value pair "tournament" / "456".
        GET http://example.com/api/tournament/456/image/123.json

    The resource type being accessed is 'image'.  It's a POST operation, so there's no resource id
    in the request.  Contextual to that is the key/value pair "tournament" / "456".
        POST http://example.com/api/tournament/456/image.json

    In both of these examples, the get() or post() method of the 'image' module's controller will be invoked,
    passing along the path-extracted key/value pairs and the query parameters dictionary as data.  When a
    resource id is present, it will be added to the data dict with the special key 'id'.

    Modules are dynamically imported at runtime.  Which modules are permitted to be invoked by which HTTP
    methods is controlled via the server.conf configuration file.
"""


@route('/api/<path:path>', method='ANY')
def route_request(path):
    (module, data, response_format) = _parse_request(path)
    if module is None:
        abort(400, "Malformed API call - no path given")
        return

    if response_format != '.json':
        abort(405, "Unsupported response format")
        return

    if _is_module_permitted(module, request.method) is not True:
        abort(405)
        return

    # Now that we know the call is well-formed and that we're permitted to call it, load up the method to call
    imported_module = import_module("tournament_of_lulz.modules." + module + ".controller_" + module)
    if imported_module is None:
        abort(503, "Server misconfiguration in routing - module does not exist")
        return

    method = getattr(imported_module, request.method.lower())
    if method is None:
        abort(503, "Server misconfiguration in routing - method does not exist")
        return

    # Grab a DB connection to use for this web transaction
    try:
        db_connection = get_connection(CONFIG)
    except mysql.connector.Error:
        abort(503, "Unable to connect to database")
        return

    # Actually call it, capturing any ServiceExceptions raised
    try:
        raw_response = method(db_connection, data)
    except ServiceException as exception:
        db_connection.close()
        abort(code=exception.http_status_code, text=exception.message)
        return

    # Close up the DB connection
    db_connection.close()

    # TODO: In the future, format the response based on different response_format's before outputting

    return raw_response


def _parse_request(path):
    data = request.params.decode()
    tokens = path.split('/')

    if len(tokens) == 1 and tokens[0] == '':
        return None, data, None

    if len(tokens) % 2 == 0:
        # id will be the last item, module name the second-to-last
        resource_id = tokens.pop()

        # separate id from format
        response_format = splitext(resource_id)[1]
        resource_id = splitext(resource_id)[0]

        data['id'] = resource_id
        module = tokens.pop()
    else:
        # no id.  module name is last item
        module = tokens.pop()

        # separate module name from format
        response_format = splitext(module)[1]
        module = splitext(module)[0]

    while len(tokens) > 0:
        value = tokens.pop()
        key = tokens.pop()
        data[key] = value

    return module, data, response_format


def _is_module_permitted(module, method):
    allowed_methods = json.loads(CONFIG.get('routing', 'allowed_methods'))
    if module not in allowed_methods:
        return False

    if method not in allowed_methods[module]:
        return False

    return True

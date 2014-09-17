import configparser

import mysql.connector


CONFIG = configparser.ConfigParser()
CONFIG.read('./tournament_of_lulz/configuration/server.conf')


def get_connection():
    if CONFIG['database'].get('unix_socket', None):
        connection = mysql.connector.connect(user=CONFIG['database']['user'],
                                             database=CONFIG['database']['schema'],
                                             password=CONFIG['database']['password'],
                                             unix_socket=CONFIG['database']['unix_socket'],
                                             autocommit=True)
    else:
        connection = mysql.connector.connect(user=CONFIG['database']['user'],
                                             database=CONFIG['database']['schema'],
                                             password=CONFIG['database']['password'],
                                             host=CONFIG['database']['host'], port=CONFIG['database']['port'],
                                             autocommit=True)

    return connection

import unittest
from unittest.mock import patch, Mock
from tournament_of_lulz import server
from tournament_of_lulz.exceptions.service_exception import ServiceException
from mysql.connector import Error

class ServerTest(unittest.TestCase):
    def setUp(self):
        patcher = patch('tournament_of_lulz.server.get_connection')
        self.mock_database = patcher.start()
        self.mock_connection = Mock()
        self.mock_database.return_value = self.mock_connection
        self.addCleanup(patcher.stop)

        patcher = patch('tournament_of_lulz.server.abort')
        self.mock_abort = patcher.start()
        self.addCleanup(patcher.stop)

        patcher = patch('tournament_of_lulz.server.request')
        self.mock_request = patcher.start()
        self.mock_request.params.decode.return_value = {}
        self.addCleanup(patcher.stop)

        server.CONFIG = Mock()

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_no_id(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_module.get.return_value = "raw data response"
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["GET"]}'

        self.mock_request.method = 'GET'

        # Preconditions

        # Run the test
        response = server.route_request("test_api.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 0)
        self.assertEqual(response, "raw data response")
        self.assertEqual(self.mock_connection.close.call_count, 1)

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_path_params(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_get = Mock()
        mock_get.return_value = "raw data response"
        mock_module.get = mock_get
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["GET"]}'

        self.mock_request.method = 'GET'

        # Preconditions

        # Run the test
        response = server.route_request("some_id/123/test_api.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 0)
        self.assertEqual(response, "raw data response")
        self.assertEqual(self.mock_connection.close.call_count, 1)

        get_call_args = mock_get.call_args[0][1]
        self.assertDictEqual(get_call_args, {
            'some_id': '123'
        })

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_id(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_get = Mock()
        mock_get.return_value = "raw data response"
        mock_module.get = mock_get
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["GET"]}'

        self.mock_request.method = 'GET'

        # Preconditions

        # Run the test
        response = server.route_request("test_api/123.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 0)
        self.assertEqual(response, "raw data response")
        self.assertEqual(self.mock_connection.close.call_count, 1)
        get_call_args = mock_get.call_args[0][1]
        self.assertDictEqual(get_call_args, {
            'id': '123'
        })

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_post_data(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_post = Mock()
        mock_post.return_value = "raw data response"
        mock_module.post = mock_post
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["POST"]}'

        self.mock_request.method = 'POST'

        self.mock_request.params.decode.return_value = {
            'post_data': 'present'
        }

        # Preconditions

        # Run the test
        response = server.route_request("test_api.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 0)
        self.assertEqual(response, "raw data response")
        self.assertEqual(self.mock_connection.close.call_count, 1)
        get_call_args = mock_post.call_args[0][1]
        self.assertDictEqual(get_call_args, {
            'post_data': 'present'
        })

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_request_data_and_id_and_path(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_post = Mock()
        mock_post.return_value = "raw data response"
        mock_module.post = mock_post
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["POST"]}'

        self.mock_request.method = 'POST'

        self.mock_request.params.decode.return_value = {
            'request_data': 'here'
        }

        # Preconditions

        # Run the test
        response = server.route_request("some_id/123/test_api/999.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 0)
        self.assertEqual(response, "raw data response")
        self.assertEqual(self.mock_connection.close.call_count, 1)
        get_call_args = mock_post.call_args[0][1]
        self.assertDictEqual(get_call_args, {
            'some_id': '123',
            'id': '999',
            'request_data': 'here'
        })

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_bad_module_name(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_post = Mock()
        mock_post.return_value = "raw data response"
        mock_module.post = mock_post
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["POST"]}'

        self.mock_request.method = 'POST'

        self.mock_request.params.decode.return_value = {
            'request_data': 'here'
        }

        # Preconditions

        # Run the test
        response = server.route_request("bad.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 1)
        self.assertEqual(self.mock_abort.call_args[0][0], 405)
        self.assertEqual(response, None)
        self.assertEqual(self.mock_database.call_count, 0)

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_bad_request_method(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_post = Mock()
        mock_post.return_value = "raw data response"
        mock_module.post = mock_post
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["POST"]}'

        self.mock_request.method = 'DELETE'

        self.mock_request.params.decode.return_value = {
            'request_data': 'here'
        }

        # Preconditions

        # Run the test
        response = server.route_request("test_api.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 1)
        self.assertEqual(self.mock_abort.call_args[0][0], 405)
        self.assertEqual(response, None)
        self.assertEqual(self.mock_database.call_count, 0)

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_empty_path(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_post = Mock()
        mock_post.return_value = "raw data response"
        mock_module.post = mock_post
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["POST"]}'

        self.mock_request.method = 'POST'

        self.mock_request.params.decode.return_value = {
            'request_data': 'here'
        }

        # Preconditions

        # Run the test
        response = server.route_request("")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 1)
        self.assertEqual(self.mock_abort.call_args[0][0], 400)
        self.assertEqual(response, None)
        self.assertEqual(self.mock_database.call_count, 0)

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_bad_output_format(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_post = Mock()
        mock_post.return_value = "raw data response"
        mock_module.post = mock_post
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["POST"]}'

        self.mock_request.method = 'POST'

        self.mock_request.params.decode.return_value = {
            'request_data': 'here'
        }

        # Preconditions

        # Run the test
        response = server.route_request("test_api.xml")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 1)
        self.assertEqual(self.mock_abort.call_args[0][0], 405)
        self.assertEqual(response, None)
        self.assertEqual(self.mock_database.call_count, 0)

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_non_existent_module(self, mock_import_module):
        # Setup
        mock_import_module.return_value = None

        server.CONFIG.get.return_value = '{"test_api_that_definitely_does_not_exist": ["POST"]}'

        self.mock_request.method = 'POST'

        self.mock_request.params.decode.return_value = {
            'request_data': 'here'
        }

        # Preconditions

        # Run the test
        response = server.route_request("test_api_that_definitely_does_not_exist.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 1)
        self.assertEqual(self.mock_abort.call_args[0][0], 503)
        self.assertEqual(response, None)
        self.assertEqual(self.mock_database.call_count, 0)

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_missing_method(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_post = Mock()
        mock_post.return_value = "raw data response"
        mock_module.post = mock_post
        mock_module.get = None
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["GET"]}'

        self.mock_request.method = 'GET'

        self.mock_request.params.decode.return_value = {
            'request_data': 'here'
        }

        # Preconditions

        # Run the test
        response = server.route_request("test_api.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 1)
        self.assertEqual(self.mock_abort.call_args[0][0], 503)
        self.assertEqual(response, None)
        self.assertEqual(self.mock_database.call_count, 0)

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_bad_db(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_module.get.return_value = "raw data response"
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["GET"]}'

        self.mock_request.method = 'GET'
        self.mock_database.side_effect = Error()

        # Preconditions

        # Run the test
        response = server.route_request("test_api.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 1)
        self.assertEqual(self.mock_abort.call_args[0][0], 503)
        self.assertEqual(response, None)
        self.assertEqual(self.mock_database.call_count, 1)

        # Cleanup

    @patch('tournament_of_lulz.server.import_module')
    def test_route_request_with_service_exception(self, mock_import_module):
        # Setup
        mock_module = Mock()
        mock_module.get.side_effect = ServiceException(417)
        mock_module.get.return_value = "raw data response"
        mock_import_module.return_value = mock_module

        server.CONFIG.get.return_value = '{"test_api": ["GET"]}'

        self.mock_request.method = 'GET'

        # Preconditions

        # Run the test
        response = server.route_request("test_api.json")

        # Postconditions
        self.assertEqual(self.mock_abort.call_count, 1)
        self.assertEqual(self.mock_abort.call_args[1]['code'], 417)
        self.assertEqual(self.mock_abort.call_args[1]['text'], None)
        self.assertEqual(response, None)
        self.assertEqual(self.mock_database.call_count, 1)
        self.assertEqual(self.mock_connection.close.call_count, 1)

        # Cleanup


import unittest
from unittest.mock import patch, Mock, MagicMock
from tournament_of_lulz.database import database


class DatabaseTest(unittest.TestCase):
    def setUp(self):
        self.mock_connection = Mock()
        self.mock_cursor = Mock()
        self.mock_execute = Mock()
        self.mock_cursor.execute = self.mock_execute
        self.mock_connection.cursor.return_value = self.mock_cursor

    @patch('mysql.connector.connect')
    def test_get_connection_on_socket(self, mock_connect):
        # Setup
        mock_config = {
            'database': {
                'unix_socket': 'test_socket',
                'user': 'test_user',
                'schema': 'test_schema',
                'password': 'test_password'
            }
        }

        # Preconditions

        # Run the test
        returned_connection = database.get_connection(mock_config)

        # Postconditions
        mock_connect.assert_was_called_with(
            user=mock_config['database']['user'],
            database=mock_config['database']['schema'],
            password=mock_config['database']['password'],
            unix_socket=mock_config['database']['unix_socket']
        )
        self.assertIsInstance(returned_connection, MagicMock)

        # Cleanup

    @patch('mysql.connector.connect')
    def test_get_connection_on_port(self, mock_connect):
        # Setup
        mock_config = {
            'database': {
                'user': 'test_user',
                'schema': 'test_schema',
                'password': 'test_password',
                'host': 'test_host',
                'port': 'test_port'
            }
        }

        # Preconditions

        # Run the test
        returned_connection = database.get_connection(mock_config)

        # Postconditions
        mock_connect.assert_was_called_with(
            user=mock_config['database']['user'],
            database=mock_config['database']['schema'],
            password=mock_config['database']['password'],
            host=mock_config['database']['host'],
            port=mock_config['database']['port']
        )
        self.assertIsInstance(returned_connection, MagicMock)

        # Cleanup

    def test_fetchall_normal(self):
        # Setup
        mock_mysql_fetchall = Mock()
        mock_mysql_fetchall.return_value = "fetched SQL"
        self.mock_cursor.fetchall = mock_mysql_fetchall
        sql = "test SQL"
        params = {
        }

        # Preconditions

        # Run the test
        data = database.fetchall(self.mock_connection, sql, params)

        # Postconditions
        self.mock_connection.cursor.assert_called_with()
        self.mock_execute.assert_called_with(sql, params)
        mock_mysql_fetchall.assert_called_with()
        self.assertEqual(data, "fetched SQL")

        # Cleanup

    def test_fetchone_normal(self):
        # Setup
        mock_mysql_fetchone = Mock()
        mock_mysql_fetchone.return_value = "fetched single SQL"
        self.mock_cursor.fetchone = mock_mysql_fetchone
        sql = "test SQL"
        params = {
        }

        # Preconditions

        # Run the test
        data = database.fetchone(self.mock_connection, sql, params)

        # Postconditions
        self.mock_connection.cursor.assert_called_with()
        self.mock_execute.assert_called_with(sql, params)
        mock_mysql_fetchone.assert_called_with()
        self.assertEqual(data, "fetched single SQL")

        # Cleanup

    def test_update_normal(self):
        # Setup
        self.mock_cursor.rowcount = 999
        sql = "test SQL"
        params = {
        }

        # Preconditions

        # Run the test
        count = database.update(self.mock_connection, sql, params)

        # Postconditions
        self.mock_connection.cursor.assert_called_with()
        self.mock_execute.assert_called_with(sql, params)
        self.assertEqual(count, 999)

        # Cleanup

    def test_insert_normal(self):
        # Setup
        self.mock_cursor.lastrowid = 888
        sql = "test SQL"
        params = {
        }

        # Preconditions

        # Run the test
        lastrowid = database.insert(self.mock_connection, sql, params)

        # Postconditions
        self.mock_connection.cursor.assert_called_with()
        self.mock_execute.assert_called_with(sql, params)
        self.assertEqual(lastrowid, 888)

        # Cleanup

    def test_delete_normal(self):
        # Setup
        self.mock_cursor.rowcount = 777
        sql = "test SQL"
        params = {
        }

        # Preconditions

        # Run the test
        count = database.delete(self.mock_connection, sql, params)

        # Postconditions
        self.mock_connection.cursor.assert_called_with()
        self.mock_execute.assert_called_with(sql, params)
        self.assertEqual(count, 777)

        # Cleanup


import unittest
from unittest.mock import patch
from tournament_of_lulz.modules.results import model_results
from tournament_of_lulz.exceptions.service_exception import ServiceException


class ModelResultsTest(unittest.TestCase):
    def setUp(self):
        self.model = model_results.ModelResults(None, 999)

    @patch('tournament_of_lulz.modules.results.model_results.fetchall')
    @patch('tournament_of_lulz.modules.results.model_results.update')
    def test_register_win_normal(self, mock_update, mock_fetchall):
        # Setup
        mock_fetchall.return_value = [
            (
                '1', 'f4176acb7d90e0bfef404857c2a5d2a9', 'http://i.imgur.com/IHSU4Bh.png',
                'http://imgur.com/gallery/IHSU4Bh', 'http://i.imgur.com/IHSU4Bhm.png',
                'Communication is key to any successful relationship.', 1500, 350, 0.06
            ),
            (
                '2', '499a2c346bc66480982b464d3433a983', 'http://i.imgur.com/0DXJ8BS.png',
                'http://imgur.com/gallery/0DXJ8BS', 'http://i.imgur.com/0DXJ8BSm.png', 'An actual unpopular opinion.',
                1500, 350, 0.06
            )
        ]

        params_winner = {
            'winner_id': '1',
            'rating': 1662.3108949761174,
            'rd': 290.3189646747521,
            'volatility': 0.06
        }

        params_loser = {
            'loser_id': '2',
            'rating': 1337.6891050238826,
            'rd': 290.3189646747521,
            'volatility': 0.06
        }

        # Preconditions

        # Run the test
        self.model.register_win('1', '2')

        # Postconditions
        mock_update_calls = mock_update.call_args_list

        self.assertEqual(len(set(params_winner.items()) ^ set(mock_update_calls[0][0][2].items())), 0)
        self.assertEqual(len(set(params_loser.items()) ^ set(mock_update_calls[1][0][2].items())), 0)

        # Cleanup

    @patch('tournament_of_lulz.modules.results.model_results.fetchall')
    @patch('tournament_of_lulz.modules.results.model_results.update')
    def test_register_win_reverse_order(self, mock_update, mock_fetchall):
        # Setup
        mock_fetchall.return_value = [
            (
                '1', 'f4176acb7d90e0bfef404857c2a5d2a9', 'http://i.imgur.com/IHSU4Bh.png',
                'http://imgur.com/gallery/IHSU4Bh', 'http://i.imgur.com/IHSU4Bhm.png',
                'Communication is key to any successful relationship.', 1500, 350, 0.06
            ),
            (
                '2', '499a2c346bc66480982b464d3433a983', 'http://i.imgur.com/0DXJ8BS.png',
                'http://imgur.com/gallery/0DXJ8BS', 'http://i.imgur.com/0DXJ8BSm.png', 'An actual unpopular opinion.',
                1500, 350, 0.06
            )
        ]

        params_winner = {
            'winner_id': '2',
            'rating': 1662.3108949761174,
            'rd': 290.3189646747521,
            'volatility': 0.06
        }

        params_loser = {
            'loser_id': '1',
            'rating': 1337.6891050238826,
            'rd': 290.3189646747521,
            'volatility': 0.06
        }

        # Preconditions

        # Run the test
        self.model.register_win('2', '1')

        # Postconditions
        mock_update_calls = mock_update.call_args_list

        self.assertDictEqual(params_winner, mock_update_calls[0][0][2])
        self.assertDictEqual(params_loser, mock_update_calls[1][0][2])

        # Cleanup

    @patch('tournament_of_lulz.modules.results.model_results.fetchall')
    @patch('tournament_of_lulz.modules.results.model_results.update')
    def test_invalid_image_id(self, mock_update, mock_fetchall):
        # Setup
        mock_fetchall.return_value = [
            (
                '1', 'f4176acb7d90e0bfef404857c2a5d2a9', 'http://i.imgur.com/IHSU4Bh.png',
                'http://imgur.com/gallery/IHSU4Bh', 'http://i.imgur.com/IHSU4Bhm.png',
                'Communication is key to any successful relationship.', 1500, 350, 0.06
            )
        ]

        # Preconditions

        # Run the test
        with self.assertRaises(ServiceException):
            self.model.register_win('2', '1')

        # Postconditions
        self.assertEqual(mock_update.call_count, 0)

        # Cleanup

import unittest
from unittest.mock import patch, Mock
from tournament_of_lulz.modules.results.controller_results import post
from tournament_of_lulz.exceptions.service_exception import ServiceException


class ModelResultsTest(unittest.TestCase):
    @patch("tournament_of_lulz.modules.results.controller_results.ModelResults")
    def test_post_normal(self, model_results):
        # Setup
        mock_model = Mock()
        mock_model.register_win = Mock()
        model_results.return_value = mock_model

        data = {
            'tournament': '999',
            'winner_id': 1,
            'loser_id': 2
        }

        # Preconditions

        # Run the test
        post(None, data)

        # Postconditions
        mock_model.register_win.assert_called_with(data['winner_id'], data['loser_id'])

        # Cleanup

    @patch("tournament_of_lulz.modules.results.controller_results.ModelResults")
    def test_post_missing_tournament_id(self, model_results):
        # Setup
        data = {
            'winner_id': 1,
            'loser_id': 2
        }

        # Preconditions

        # Run the test
        with self.assertRaises(ServiceException) as cm:
            post(None, data)

        # Postconditions
        self.assertEqual(model_results.call_count, 0)
        self.assertEqual(cm.exception.http_status_code, 400)

        # Cleanup

    @patch("tournament_of_lulz.modules.results.controller_results.ModelResults")
    def test_post_missing_winner_id(self, model_results):
        # Setup
        data = {
            'tournament': 999,
            'loser_id': 2
        }

        # Preconditions

        # Run the test
        with self.assertRaises(ServiceException) as cm:
            post(None, data)

        # Postconditions
        self.assertEqual(model_results.call_count, 0)
        self.assertEqual(cm.exception.http_status_code, 400)

        # Cleanup

    @patch("tournament_of_lulz.modules.results.controller_results.ModelResults")
    def test_post_missing_loser_id(self, model_results):
        # Setup
        data = {
            'tournament': 999,
            'winner_id': 1
        }

        # Preconditions

        # Run the test
        with self.assertRaises(ServiceException) as cm:
            post(None, data)

        # Postconditions
        self.assertEqual(model_results.call_count, 0)
        self.assertEqual(cm.exception.http_status_code, 400)

        # Cleanup

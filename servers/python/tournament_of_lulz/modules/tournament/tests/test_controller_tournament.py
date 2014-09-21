import unittest
from unittest.mock import patch, Mock
from tournament_of_lulz.modules.tournament.controller_tournament import post, delete


class ControllerTournamentTest(unittest.TestCase):
    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ViewTournament")
    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ModelTournament")
    def test_post_normal(self, model_tournament, view_tournament):
        # Setup
        mock_model = Mock()
        mock_model.create_new_tournament = Mock()
        model_tournament.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_tournament.return_value = mock_view

        data = {
        }

        # Preconditions

        # Run the test
        post(None, data)

        # Postconditions
        mock_model.create_new_tournament.assert_called_with(8, None)
        mock_view.render.assert_called_once_with()

        # Cleanup

    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ViewTournament")
    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ModelTournament")
    def test_post_with_num_images(self, model_tournament, view_tournament):
        # Setup
        mock_model = Mock()
        mock_model.create_new_tournament = Mock()
        model_tournament.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_tournament.return_value = mock_view

        data = {
            'num_images': 16
        }

        # Preconditions

        # Run the test
        post(None, data)

        # Postconditions
        mock_model.create_new_tournament.assert_called_with(16, None)
        mock_view.render.assert_called_once_with()

        # Cleanup

    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ViewTournament")
    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ModelTournament")
    def test_post_with_small_num_images(self, model_tournament, view_tournament):
        # Setup
        mock_model = Mock()
        mock_model.create_new_tournament = Mock()
        model_tournament.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_tournament.return_value = mock_view

        data = {
            'num_images': -999
        }

        # Preconditions

        # Run the test
        post(None, data)

        # Postconditions
        mock_model.create_new_tournament.assert_called_with(1, None)
        mock_view.render.assert_called_once_with()

        # Cleanup

    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ViewTournament")
    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ModelTournament")
    def test_post_with_large_num_images(self, model_tournament, view_tournament):
        # Setup
        mock_model = Mock()
        mock_model.create_new_tournament = Mock()
        model_tournament.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_tournament.return_value = mock_view

        data = {
            'num_images': 999
        }

        # Preconditions

        # Run the test
        post(None, data)

        # Postconditions
        mock_model.create_new_tournament.assert_called_with(32, None)
        mock_view.render.assert_called_once_with()

        # Cleanup

    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ViewTournament")
    @patch("tournament_of_lulz.modules.tournament.controller_tournament.ModelTournament")
    def test_post_with_a_starting_image_id(self, model_tournament, view_tournament):
        # Setup
        mock_model = Mock()
        mock_model.create_new_tournament = Mock()
        model_tournament.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_tournament.return_value = mock_view

        data = {
            'starting_image_id': 888
        }

        # Preconditions

        # Run the test
        post(None, data)

        # Postconditions
        mock_model.create_new_tournament.assert_called_with(8, 888)
        mock_view.render.assert_called_once_with()

        # Cleanup

    def test_delete_normal(self):
        # Setup
        data = {
        }

        # Preconditions

        # Run the test
        retval = delete(None, data)

        # Postconditions
        self.assertEqual(retval, "")

        # Cleanup

import unittest
from unittest.mock import patch, Mock
from tournament_of_lulz.modules.top_images.controller_top_images import get


class ControllerTopImagesTest(unittest.TestCase):
    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ViewTopImages")
    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ModelTopImages")
    def test_post_normal(self, model_top_images, view_top_images):
        # Setup
        mock_model = Mock()
        mock_model.load_top_images = Mock()
        model_top_images.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_top_images.return_value = mock_view

        data = {
        }

        # Preconditions

        # Run the test
        get(None, data)

        # Postconditions
        mock_model.load_top_images.assert_called_with(0, 10)
        mock_view.render.assert_called_once_with()

        # Cleanup

    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ViewTopImages")
    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ModelTopImages")
    def test_post_start_only(self, model_top_images, view_top_images):
        # Setup
        mock_model = Mock()
        mock_model.load_top_images = Mock()
        model_top_images.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_top_images.return_value = mock_view

        data = {
            'start': 500
        }

        # Preconditions

        # Run the test
        get(None, data)

        # Postconditions
        mock_model.load_top_images.assert_called_with(500, 10)
        mock_view.render.assert_called_once_with()

        # Cleanup

    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ViewTopImages")
    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ModelTopImages")
    def test_post_limit_only(self, model_top_images, view_top_images):
        # Setup
        mock_model = Mock()
        mock_model.load_top_images = Mock()
        model_top_images.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_top_images.return_value = mock_view

        data = {
            'limit': 5
        }

        # Preconditions

        # Run the test
        get(None, data)

        # Postconditions
        mock_model.load_top_images.assert_called_with(0, 5)
        mock_view.render.assert_called_once_with()

        # Cleanup

    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ViewTopImages")
    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ModelTopImages")
    def test_post_start_and_limit(self, model_top_images, view_top_images):
        # Setup
        mock_model = Mock()
        mock_model.load_top_images = Mock()
        model_top_images.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_top_images.return_value = mock_view

        data = {
            'start': 500,
            'limit': 7
        }

        # Preconditions

        # Run the test
        get(None, data)

        # Postconditions
        mock_model.load_top_images.assert_called_with(500, 7)
        mock_view.render.assert_called_once_with()

        # Cleanup

    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ViewTopImages")
    @patch("tournament_of_lulz.modules.top_images.controller_top_images.ModelTopImages")
    def test_post_large_limit(self, model_top_images, view_top_images):
        # Setup
        mock_model = Mock()
        mock_model.load_top_images = Mock()
        model_top_images.return_value = mock_model

        mock_view = Mock()
        mock_view.render = Mock()
        view_top_images.return_value = mock_view

        data = {
            'limit': 500
        }

        # Preconditions

        # Run the test
        get(None, data)

        # Postconditions
        mock_model.load_top_images.assert_called_with(0, 32)    # clamped to 32
        mock_view.render.assert_called_once_with()

        # Cleanup

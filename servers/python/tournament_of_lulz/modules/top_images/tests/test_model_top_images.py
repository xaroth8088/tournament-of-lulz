import unittest
from unittest.mock import patch
from tournament_of_lulz.modules.top_images.model_top_images import ModelTopImages


class ModelTopImagesTest(unittest.TestCase):
    def setUp(self):
        self.model = ModelTopImages(None)

    @patch('tournament_of_lulz.modules.top_images.model_top_images.fetchall')
    def test_load_normal(self, mock_fetchall):
        # Setup
        data = [
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
        mock_fetchall.return_value = data

        # Preconditions

        # Run the test
        self.model.load_top_images(5, 10)

        # Postconditions
        mock_fetchall.assert_was_called()

        fetchall_args = mock_fetchall.call_args
        self.assertEqual(fetchall_args[0][2]['start'], 5)
        self.assertEqual(fetchall_args[0][2]['limit'], 10)

        self.assertEqual(len(self.model.top_images), 2)

        # Cleanup

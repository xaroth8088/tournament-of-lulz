import unittest
from unittest.mock import Mock
from tournament_of_lulz.modules.tournament.view_tournament import ViewTournament
from tournament_of_lulz.modules.image.model_image import ModelImage


class ViewTournamentTest(unittest.TestCase):
    def setUp(self):
        self.model = Mock()
        self.model.tournament_id = 999
        self.model.images = []
        self.view = ViewTournament(self.model)

    def test_render_normal(self):
        # Setup
        self.assertEqual(len(self.model.images), 0)
        image = ModelImage()
        image.init_with_db_row(
            (
                '1', 'f4176acb7d90e0bfef404857c2a5d2a9', 'http://i.imgur.com/IHSU4Bh.png',
                'http://imgur.com/gallery/IHSU4Bh', 'http://i.imgur.com/IHSU4Bhm.png',
                'Communication is key to any successful relationship.', 1500, 350, 0.06
            )
        )
        self.model.images.append(image)

        image = ModelImage()
        image.init_with_db_row(
            (
                '2', '499a2c346bc66480982b464d3433a983', 'http://i.imgur.com/0DXJ8BS.png',
                'http://imgur.com/gallery/0DXJ8BS', 'http://i.imgur.com/0DXJ8BSm.png', 'An actual unpopular opinion.',
                1500, 350, 0.06
            )
        )
        self.model.images.append(image)

        # Preconditions

        # Run the test
        retval = self.view.render()

        # Postconditions
        self.assertTrue('images' in retval)
        self.assertTrue('tournament_id' in retval)
        self.assertEqual(len(retval['images']), 2)
        self.assertEqual(retval['images'][0]['image_id'], '1')
        self.assertEqual(retval['tournament_id'], 999)

        # Cleanup

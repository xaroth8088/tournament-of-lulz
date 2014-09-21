import unittest
from unittest.mock import patch
from tournament_of_lulz.modules.tournament.model_tournament import ModelTournament


class ModelTournamentTest(unittest.TestCase):
    def setUp(self):
        self.model = ModelTournament(None)

    @patch('tournament_of_lulz.modules.tournament.model_tournament.insert')
    @patch('tournament_of_lulz.modules.tournament.model_tournament.fetchall')
    def test_load_normal(self, mock_fetchall, mock_insert):
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
        self.assertIsNone(self.model.images)

        # Run the test
        self.model.create_new_tournament(2, None)

        # Postconditions
        self.assertEqual(mock_insert.call_count, 1)
        self.assertEqual(len(self.model.images), 2)

        # Cleanup

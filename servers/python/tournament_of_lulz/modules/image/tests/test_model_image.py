import unittest
from tournament_of_lulz.modules.image import model_image


class ModelImageTest(unittest.TestCase):
    def setUp(self):
        self.image = model_image.ModelImage()

    def test_init_with_db_row(self):
        data = [
            '320',
            '39570dd668d2896673d87df59b7def40',
            'http://i.imgur.com/bBvK8vo.png',
            'http://imgur.com/gallery/bBvK8vo',
            'http://i.imgur.com/bBvK8vom.png',
            'Noticed this one girl highlighting all the notes',
            '1897.5879088080062',
            '216.0448091137806',
            '0.059999385235406474'
        ]
        self.assertTrue(self.image.image_id is None)

        self.image.init_with_db_row(data)

        self.assertTrue(self.image.image_id is not None)

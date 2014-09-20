import unittest
from tournament_of_lulz.modules.image import model_image, view_image


class ViewImageTest(unittest.TestCase):
    def setUp(self):
        self.model = model_image.ModelImage()
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
        self.model.init_with_db_row(data)

        self.view = view_image.ViewImage(self.model)

    def test_init_with_db_row(self):
        # Setup

        # Preconditions

        # Run the test
        retval = self.view.render()

        # Postconditions
        self.assertEqual(retval['image_id'], self.model.image_id)
        self.assertEqual(retval['image_url_hash'], self.model.image_url_hash)
        self.assertEqual(retval['image_url'], self.model.image_url)
        self.assertEqual(retval['page_url'], self.model.page_url)
        self.assertEqual(retval['thumbnail_url'], self.model.thumbnail_url)
        self.assertEqual(retval['title'], self.model.title)
        self.assertEqual(retval['rating'], self.model.rating)
        self.assertEqual(retval['rd'], self.model.rd)
        self.assertEqual(retval['volatility'], self.model.volatility)
        self.assertEqual(len(retval.keys()), 9)

        # Cleanup

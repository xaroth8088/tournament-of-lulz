""" A class which handles communication with the Imgur API
"""

import json

import requests


class ImgurAPI:
    def __init__(self, config):
        self.config = config
        self.file_extensions = {
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/png': 'png'
        }

    def _convert_raw_image(self, raw_image):
        image = {}

        try:
            image['page_url'] = "http://imgur.com/gallery/%s" % raw_image['id']
            image['image_url'] = raw_image['link']
            image['thumbnail_url'] = "http://i.imgur.com/%sm.%s" % (
            raw_image['id'], self.file_extensions[raw_image['type']])
            image['title'] = raw_image['title']
        except KeyError:
            return None

        return image

    def _transform_result(self, result):
        converted = []

        # Example API response object:
        """
        {
            'type':'image/jpeg',
            'title':'/b/ has a torture idea',
            'height':742,
            'vote':None,
            'favorite':False,
            'size':93655,
            'link':'http://i.imgur.com/Q5SVNpZ.jpg',
            'downs':142,
            'score':3668,
            'width':799,
            'views':135492,
            'datetime':1401128127,
            'id':'Q5SVNpZ',
            'account_url':None,
            'description':None,
            'nsfw':False,
            'ups':3189,
            'bandwidth':12689503260,
            'is_album':False,
            'section':'4chan',
            'animated':False
        }
        """

        if 'data' not in result:
            return []

        for raw_image in result['data']:
            # Do some filtering of which images we want to take in, and transform the data into something more usable elsewhere
            if raw_image['is_album'] is not False:
                # TODO: We can/should probably just pull out the 'images' section and turn those into entries, too.
                continue

            if raw_image['nsfw'] is not False:
                continue

            if raw_image['animated'] is not False:
                continue

            if raw_image['type'] not in self.file_extensions:
                continue

            image = self._convert_raw_image(raw_image)

            if image is not None:
                converted.append(image)

        return converted

    def fetch_viral_images(self):
        headers = {
        "Authorization": "Client-ID %s" % self.config['imgur']['client_id']
        }

        try:
            r = requests.get(self.config['imgur']['api_endpoint'], headers=headers)
        except requests.exceptions.ConnectionError:
            return []

        if r.status_code != 200:
            return []

        try:
            result = json.loads(r.text)
        except ValueError:
            return []

        return self._transform_result(result)

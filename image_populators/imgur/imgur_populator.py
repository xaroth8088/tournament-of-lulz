""" A script which pulls down image metadata from imgur, for use in Tournament of Lulz
"""

import hashlib

import mysql.connector

from imgur_api import ImgurAPI


class ImgurPopulator:
    def __init__(self, config):
        self.config = config

    def _fetch_viral_gallery(self):
        imgur = ImgurAPI(self.config)
        return imgur.fetch_viral_images()

    def _store_rows_to_db(self, images):
        if self.config['database'].get('unix_socket', None):
            cnx = mysql.connector.connect(user=self.config['database']['user'],
                                          database=self.config['database']['schema'],
                                          password=self.config['database']['password'],
                                          unix_socket=self.config['database']['unix_socket'])
        else:
            cnx = mysql.connector.connect(user=self.config['database']['user'],
                                          database=self.config['database']['schema'],
                                          password=self.config['database']['password'],
                                          host=self.config['database']['host'], port=self.config['database']['port'])

        cursor = cnx.cursor()

        add_image_sql = (
        "INSERT IGNORE INTO images "
        "(page_url, image_url_hash, image_url, thumbnail_url, title) "
        "VALUES "
        "(%(page_url)s, %(image_url_hash)s, %(image_url)s, %(thumbnail_url)s, %(title)s) "
        )

        for row in images:
            # Encode the image URL hash
            row['image_url_hash'] = hashlib.md5(row['image_url'].encode('utf-8')).hexdigest()

            # Insert new image
            cursor.execute(add_image_sql, row)

        # Make sure data is committed to the database
        cnx.commit()

        cursor.close()
        cnx.close()

    def populate(self):
        images = self._fetch_viral_gallery()
        # try:
        self._store_rows_to_db(images)

    # except mysql.connector.errors.InterfaceError:
    # print( "Unable to connect to database, or other database problem.")


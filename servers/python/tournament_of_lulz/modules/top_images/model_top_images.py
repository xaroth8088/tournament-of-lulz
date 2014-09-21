from tournament_of_lulz.database.database import fetchall
from tournament_of_lulz.modules.image.model_image import ModelImage


class ModelTopImages():
    def __init__(self, db_connection):
        self.db_connection = db_connection
        self.top_images = []

    def load_top_images(self, start, limit):
        self.top_images = []

        sql = (
            "SELECT image_id, image_url_hash, image_url, page_url, thumbnail_url, title, rating, rd, volatility "
            "FROM images "
            "ORDER BY rating DESC "
            "LIMIT %(start)s, %(limit)s"
        )
        params = {
            'start': start,
            'limit': limit
        }
        data = fetchall(self.db_connection, sql, params)

        for row in data:
            image = ModelImage()
            image.init_with_db_row(row)
            self.top_images.append(image)

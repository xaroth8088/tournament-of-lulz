from tournament_of_lulz.database.database import get_connection
from tournament_of_lulz.modules.image.model_image import ModelImage


class ModelTopImages():
    def __init__(self):
        self.top_images = []

    def load_top_images(self, start, limit):
        self.top_images = []

        connection = get_connection()
        cursor = connection.cursor()

        sql = (
            "SELECT image_id, image_url_hash, image_url, page_url, thumbnail_url, title, rating, rd, volatility "
            "FROM images "
            "ORDER BY rating, image_id DESC "
            "LIMIT %(start)s, %(limit)s"
        )
        params = {
            'start': start,
            'limit': limit
        }
        cursor.execute(sql, params)

        for row in cursor:
            image = ModelImage()
            image.init_with_db_row(row)
            self.top_images.append(image)

        cursor.close()
        connection.close()

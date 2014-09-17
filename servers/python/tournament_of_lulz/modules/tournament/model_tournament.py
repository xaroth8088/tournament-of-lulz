from tournament_of_lulz.database.database import get_connection
from tournament_of_lulz.modules.image.model_image import ModelImage


class ModelTournament():
    def __init__(self):
        self.tournament_id = None
        self.images = None
        self.start_time = None

    def create_new_tournament(self, num_images, starting_image_id):
        self.images = []

        connection = get_connection()
        cursor = connection.cursor()

        sql = (
            "INSERT INTO tournaments "
            "(tournament_id, start_time)"
            "VALUES "
            "(NULL, NOW())"
        )
        cursor.execute(sql)

        self.tournament_id = cursor.lastrowid

        # TODO: Handle case where a starting image_id is included

        # Pick images
        sql = (
            "SELECT image_id, image_url_hash, image_url, page_url, thumbnail_url, title, rating, rd, volatility "
            "FROM images "
            "ORDER BY RAND() "
            "LIMIT %(limit)s"
        )
        params = {
            'limit': num_images
        }
        cursor.execute(sql, params)

        for row in cursor:
            image = ModelImage()
            image.init_with_db_row(row)
            self.images.append(image)

        # TODO: Populate results table

        cursor.close()
        connection.close()

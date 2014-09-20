from tournament_of_lulz.database.database import get_connection, insert, fetchall
from tournament_of_lulz.modules.image.model_image import ModelImage


class ModelTournament():
    def __init__(self):
        self.tournament_id = None
        self.images = None
        self.start_time = None

    def create_new_tournament(self, num_images, starting_image_id):
        self.images = []

        connection = get_connection()

        sql = (
            "INSERT INTO tournaments "
            "(tournament_id, start_time)"
            "VALUES "
            "(NULL, NOW())"
        )
        self.tournament_id = insert(connection, sql)

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
        data = fetchall(connection, sql, params)

        for row in data:
            image = ModelImage()
            image.init_with_db_row(row)
            self.images.append(image)

        # TODO: Populate results table

        connection.close()

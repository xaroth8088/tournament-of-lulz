from tournament_of_lulz.database.database import get_connection
from tournament_of_lulz.modules.image.model_image import ModelImage
from glicko2.glicko2 import Player


class ModelResults():
    def __init__(self):
        pass

    def register_win(self, winner_id, loser_id):
        images = []

        connection = get_connection()
        cursor = connection.cursor()

        # Load the two images
        sql = (
            "SELECT image_id, image_url_hash, image_url, page_url, thumbnail_url, title, rating, rd, volatility "
            "FROM images "
            "WHERE "
            "image_id IN ( %(winner_id)s, %(loser_id)s )"
        )
        params = {
            'winner_id': winner_id,
            'loser_id': loser_id
        }
        cursor.execute(sql, params)

        for row in cursor:
            image = ModelImage()
            image.init_with_db_row(row)
            images.append(image)

        if images[0].image_id == winner_id:
            winner_image = images[0]
            loser_image = images[1]
        else:
            loser_image = images[0]
            winner_image = images[1]

        # Run the Glicko-2 rating algo for the match
        winner = Player(winner_image.rating, winner_image.rd, winner_image.volatility)
        loser = Player(loser_image.rating, loser_image.rd, loser_image.volatility)
        winner.update_player([loser_image.rating], [loser_image.rd], [1])
        loser.update_player([winner_image.rating], [winner_image.rd], [0])

        # Update the two images
        winner_image.rating = winner.getRating()
        winner_image.rd = winner.getRd()
        winner_image.volatility = winner.vol

        loser_image.rating = loser.getRating()
        loser_image.rd = loser.getRd()
        loser_image.volatility = loser.vol

        sql = (
            "UPDATE images "
            "SET rating = %(rating)s, "
            "rd = %(rd)s, "
            "volatility = %(volatility)s "
            "WHERE "
            "image_id = %(winner_id)s"
        )
        params = {
            'winner_id': winner_id,
            'rating': winner_image.rating,
            'rd': winner_image.rd,
            'volatility': winner_image.volatility
        }
        cursor.execute(sql, params)

        sql = (
            "UPDATE images "
            "SET rating = %(rating)s, "
            "rd = %(rd)s, "
            "volatility = %(volatility)s "
            "WHERE "
            "image_id = %(loser_id)s"
        )
        params = {
            'loser_id': loser_id,
            'rating': loser_image.rating,
            'rd': loser_image.rd,
            'volatility': loser_image.volatility
        }
        cursor.execute(sql, params)

        # TODO: Ensure this match-up hasn't occurred before for this tournament_id

        cursor.close()
        connection.close()
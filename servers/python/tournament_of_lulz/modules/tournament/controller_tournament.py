from tournament_of_lulz.modules.tournament.model_tournament import ModelTournament
from tournament_of_lulz.modules.tournament.view_tournament import ViewTournament

MAX_IMAGES = 32  # a reasonable maximum


def post(data):
    num_images = 8
    if 'num_images' in data:
        num_images = int(data['num_images'])

    if num_images < 1:
        num_images = 1

    if num_images > MAX_IMAGES:
        num_images = MAX_IMAGES

    starting_image_id = None
    if 'starting_image_id' in data:
        starting_image_id = data['starting_image_id']

    tournament = ModelTournament()
    tournament.create_new_tournament(num_images, starting_image_id)
    view = ViewTournament(tournament)

    return view.render()


def delete(data):
    return ""

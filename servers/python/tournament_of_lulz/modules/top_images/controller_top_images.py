from tournament_of_lulz.modules.top_images.model_top_images import ModelTopImages
from tournament_of_lulz.modules.top_images.view_top_images import ViewTopImages


def get(db_connection, data):
    start = 0
    limit = 10

    if 'start' in data:
        start = int(data['start'])
    if 'limit' in data:
        limit = int(data['limit'])

    if limit > 32:
        limit = 32

    top_images_model = ModelTopImages(db_connection)
    top_images_model.load_top_images(start, limit)
    view = ViewTopImages(top_images_model)
    return view.render()

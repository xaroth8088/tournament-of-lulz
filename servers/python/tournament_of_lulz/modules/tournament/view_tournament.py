from tournament_of_lulz.modules.image.view_image import ViewImage


class ViewTournament():
    def __init__(self, model):
        self.model = model

    def render(self):
        retval = {
            'tournament_id': self.model.tournament_id,
            'images': []
        }

        for image in self.model.images:
            image_view = ViewImage(image)
            retval['images'].append(image_view.render())

        return retval

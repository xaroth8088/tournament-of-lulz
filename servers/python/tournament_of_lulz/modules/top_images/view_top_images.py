from tournament_of_lulz.modules.image.view_image import ViewImage


class ViewTopImages():
    def __init__(self, model):
        self.model = model

    def render(self):
        retval = {
            "images": []
        }

        for image in self.model.top_images:
            image_view = ViewImage(image)
            retval['images'].append(image_view.render())

        return retval

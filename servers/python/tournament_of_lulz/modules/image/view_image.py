class ViewImage():
    def __init__(self, model):
        self.model = model
    
    def render(self):
        retval = {}

        retval['image_id'] = self.model.image_id
        retval['image_url_hash'] = self.model.image_url_hash
        retval['image_url'] = self.model.image_url
        retval['page_url'] = self.model.page_url
        retval['thumbnail_url'] = self.model.thumbnail_url
        retval['title'] = self.model.title
        retval['rating'] = self.model.rating
        retval['rd'] = self.model.rd
        retval['volatility'] = self.model.volatility

        return retval

class ModelImage():
    def __init__(self):
        self.image_id = None
        self.image_url_hash = None
        self.image_url = None
        self.page_url = None
        self.thumbnail_url = None
        self.title = None
        self.rating = None
        self.rd = None
        self.volatility = None

    def init_with_db_row(self, row):
        self.image_id = row[0]
        self.image_url_hash = row[1]
        self.image_url = row[2]
        self.page_url = row[3]
        self.thumbnail_url = row[4]
        self.title = row[5]
        self.rating = row[6]
        self.rd = row[7]
        self.volatility = row[8]

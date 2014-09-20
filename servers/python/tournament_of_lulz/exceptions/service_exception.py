class ServiceException(Exception):
    def __init__(self, http_status_code, message):
        Exception.__init__(self, message)
        self.http_status_code = http_status_code

FROM python:3.8-slim-buster
WORKDIR /home
COPY . .
RUN pip install -r requirements.txt

EXPOSE 8088

CMD ["python", "__main__.py"]

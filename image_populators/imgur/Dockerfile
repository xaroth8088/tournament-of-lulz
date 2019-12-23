FROM python:3.8-slim-buster
WORKDIR /home
COPY . .
RUN pip install -r requirements.txt

CMD ["python", "populate_script.py"]

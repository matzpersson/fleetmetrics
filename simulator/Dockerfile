FROM python:3

RUN pip install geopy numpy paho-mqtt

WORKDIR /app
COPY . ./

CMD [ "python", "./main.py" ]
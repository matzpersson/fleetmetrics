FROM python:3

RUN pip install geopy numpy paho-mqtt

WORKDIR /app
RUN echo "THIS IS WHERE"
RUN ls -l
COPY ./simulator ./

CMD [ "python", "./main.py" ]
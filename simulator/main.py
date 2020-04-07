# --- NMEA 0183 Simulator

# Dedency: pip install geopy, numpy, paho-mqtt

import datetime
import logging
import sys
import time
import json
import os

sys.path.append('./lib/')
sys.path.append('./devices/')

import random

from Mqtt import MqttPublisher

from Vessel import Vessel

# Start logging
format = "%(asctime)s: %(message)s"
logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")

logging.info("Starting Nmea 0183 Simulator...")

# MQTT Connection
logging.info("Init MqttPublisher...")
mqtt_publisher = MqttPublisher(logging)
mqtt_publisher.start()

# Vessels
filepath = "./vessels/"
for filename in os.listdir("./vessels"):
    if filename.endswith('.json'):
        with open(filepath + filename) as json_file:
            vessel = json.load(json_file)

        vessel = Vessel(logging, vessel, mqtt_publisher)
        vessel.start()


while True:
    i = input()
    if i == 'p':
        tempValue = random.randrange(0, 101, 2)
        temperature = "Temperature is {}".format(tempValue)
        mqtt_publisher.publish("the topic", temperature)

    time.sleep(1)

import time
import os
import sys
import threading

from Gps import Gps
from Depth import Depth
from Wind import Wind

class Vessel(threading.Thread):
    def __init__(self, logging, vessel, mqtt_publisher):
        threading.Thread.__init__(self)
        self.logging = logging

        self.vessel = vessel
        self.mqtt_publisher = mqtt_publisher

    def run(self):
        self.logging.info("Running Gps..")

        self.logging.info("Init Gps...")
        gps = Gps(self.logging, self.vessel, self.mqtt_publisher)
        gps.start()

        self.logging.info("Init Depth Sounder...")
        depth = Depth(self.logging, self.vessel, self.mqtt_publisher)
        depth.start()

        self.logging.info("Init Anometer...")
        wind = Wind(self.logging, self.vessel, self.mqtt_publisher)
        wind.start()

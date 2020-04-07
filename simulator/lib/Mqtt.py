import time
import os
import sys
import paho.mqtt.client as mqtt
import threading

class MqttPublisher(threading.Thread):
    def __init__(self, logging, broker="localhost", port=1883):
        self.logging = logging

        threading.Thread.__init__(self)

        self.broker = broker
        self.port = port
        self.client = mqtt.Client()
        # self.client.on_publish = self.on_publish

    def run(self):
        while True:
            try:
                self.logging.info("Attempting to connect to MttqPublisher")
                self.client.connect(self.broker, self.port)
                self.client.loop_start()
            except Exception:
                self.logging.info("... Failed to connect. Try again in 10s")

            time.sleep(10)

    def publish(self, topic, msg):
        self.client.publish(topic, payload=msg, qos=1, retain=True)
        self.logging.info("MttqPublisher sending: {} for topic: {}".format(msg, topic))

    def on_publish(self, client, userdata, mid):
        self.logging.info("Mttq published!")

# Fleet Metrics

FleetMetrics is a end-2-end data gathering framework typically collecting metrics from vessels, vehicles and field devices delivering compact sentences over MQTT protocol delivered to a central NodeJS micro service gateway. The NodeJS gateway features a MQTT broker service to receive field data, a REST Api for websites and mobiles to access and a socketIO interface for pushing metrics to listening websites and devices when changes are received from the field.

The platform also includes a series of Python simulators that creates random MQTT sentences for protocols such as NMEA sentences delivered to the Gateway API to provide simulation for theoretical field devices in client demonstrations.

The FleetMetrics front-end is a single-tenant React website styled with Bootstrap and socketIO to listen to any metric changes on the Gateway api.

FleetMetrics is provided as a open-source platform encouraging anyone to submit PR's with site improvements and simulation code for their projects.

## Deployment
We have included deployment options for Azure. We are currently working on the Kubernetes deployment scripts. Docker-compose options are available to deploy the whole framework locally with a series of Dockerfiles in each app directory. We are currently also working on our GitLab CI/CD pipeline scripts which we will make available soon. 

Instructions for launching applications in each application folder. The core framework include following applications with :
* simulator - Python3 MQTT NMEA Simulator
* server - NodeJS MQTT Broker, REST API and sockerIO broadcasts.
* spa - React/Redux based front-end.

## Storage
This project is using MongoDb as the storage engine as it deals quickly and nicely with large datasets.

## Contribution
We are hoping to get more people involved in contributing code and ideas to this framework especially simulators to showcase how various types of data in field devices can be visualised.

## Next
Following are tasks that we are now working on completing and publishing:
* Noise Modelling simulators
* Cane Tracking locos simulator
* PyCom NMEA network data gathering device
* Pycom Remote Digital Voltage Meter
* Gitlab Continuous Pipelines
* React Native mobile data collection

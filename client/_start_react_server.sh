#!/bin/bash

docker kill nest_open_weather_client_prod
docker rm nest_open_weather_client_prod

docker run -d --restart=always -p 80:80 --name nest_open_weather_client_prod \
    nest_open_weather_client_prod

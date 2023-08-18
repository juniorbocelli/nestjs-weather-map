#!/bin/bash

docker kill open_weather-postgresql
docker rm open_weather-postgresql

docker run \
  --name open_weather-postgresql \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=test1234 \
  -e POSTGRES_DB=open_weather_local \
  -p 5432:5432 postgres

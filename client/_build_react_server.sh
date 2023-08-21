#!/bin/bash

echo "Iniciando ambiente de produção..."
cp ./docker/react_server/Dockerfile-prod ./Dockerfile

echo "Construindo containers de produção..."
docker image build -t nest_open_weather_client_prod:latest .

rm ./Dockerfile

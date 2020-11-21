#!/bin/bash
if [ -z $DOCKER_REGISTRY_URL ];
then
  echo "Usage: DOCKER_REGISTRY_URL=<registry.example.com> IMGUR_CLIENT_ID=<your_client_id_here> deploy.sh"
  exit 1
fi

if [ -z $IMGUR_CLIENT_ID ];
then
  echo "Usage: DOCKER_REGISTRY_URL=<registry.example.com> IMGUR_CLIENT_ID=<your_client_id_here> deploy.sh"
  exit 1
fi

docker build -t "${DOCKER_REGISTRY_URL}/toplulz-imgur-populator:latest" .
docker push "${DOCKER_REGISTRY_URL}/toplulz-imgur-populator:latest"
envsubst < toplulz-imgur-populator.k8s.tmpl > toplulz-imgur-populator.k8s.yaml
kubectl apply -f toplulz-imgur-populator.k8s.yaml
rm toplulz-imgur-populator.k8s.yaml

#!/bin/bash
if [ -z $DOCKER_REGISTRY_URL ];
then
  echo "Usage: DOCKER_REGISTRY_URL=<registry.example.com> TRAEFIK_INGRESS_URL=<toplulz.example.com> deploy.sh"
  exit 1
fi

if [ -z $TRAEFIK_INGRESS_URL ];
then
  echo "Usage: DOCKER_REGISTRY_URL=<registry.example.com> TRAEFIK_INGRESS_URL=<toplulz.example.com> deploy.sh"
  exit 1
fi

docker build -t "${DOCKER_REGISTRY_URL}/toplulz-python-server:latest" .
docker push "${DOCKER_REGISTRY_URL}/toplulz-python-server:latest"
kubectl delete deployment toplulz-python-server-deployment
envsubst < toplulz-python-server.k8s.tmpl > toplulz-python-server.k8s.yaml
kubectl apply -f toplulz-python-server.k8s.yaml
rm toplulz-python-server.k8s.yaml

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

docker build -t "${DOCKER_REGISTRY_URL}/toplulz-mvc-client:latest" .
docker push "${DOCKER_REGISTRY_URL}/toplulz-mvc-client:latest"
kubectl delete deployment toplulz-mvc-client-deployment
envsubst < toplulz-mvc-client.k8s.tmpl > toplulz-mvc-client.k8s.yaml
kubectl apply -f toplulz-mvc-client.k8s.yaml
rm toplulz-mvc-client.k8s.yaml

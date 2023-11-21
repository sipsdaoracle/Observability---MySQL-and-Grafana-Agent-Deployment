# Get the list of pod names in the default namespace
PODS=$(kubectl get pods -n default -o jsonpath='{.items[*].metadata.name}')

# Loop through the list and move each pod to the monitoring namespace
for POD in $PODS; do
  kubectl get pod $POD -n default -o yaml | sed "s/namespace: default/namespace: monitoring/" | kubectl apply -n monitoring -f -
done

# Stop on errors
set -e

regionGroup="fleetmetrics-group"
clusterName="fleetmetrics-aks"
location="australiasoutheast"
nodeCount=3

# alphanumeric only and max 12 characters
nodePoolName="fmpool"

# Creates Resource group
printf "az group create -l $location -n $regionGroup"

# Configure Kubernetes
printf "az aks create -k 1.15.7 --resource-group $regionGroup --name $clusterName --node-count $nodeCount --enable-addons monitoring --generate-ssh-keys --nodepool-name $nodePoolName\n"

# Associate kubectl
printf "az aks get-credentials --resource-group $regionGroup --name $clusterName\n"

# Test it is working
printf "kubectl get nodes\n"

# Set permissions for dashboard roles
printf "kubectl create clusterrolebinding kubernetes-dashboard --clusterrole=cluster-admin --serviceaccount=kube-system:kubernetes-dashboard\n"

# Browse the dashboard
printf "az aks browse --resource-group $regionGroup --name $clusterName\n"

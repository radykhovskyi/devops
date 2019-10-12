
## Instructions

 1. Install minicube `brew cask install minikube`
 2. Set docker to point to `minikube eval $(minikube docker-env)`
 3. Build local image with http server `docker build -t http-server:1.0 .`
 4. Apply deployments file `kubectl apply -f service-one.yml` & `kubectl apply -f service-two.yml`
 5. Check pods status
 ```bash
    radykhovskyiserhii@PDF079-macmini kubernetes $ kubectl get deployment
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
service1-dev   1/1     1            1           7m44s
service2-dev   1/1     1            1           3m35s
    ```
```bash
radykhovskyiserhii@PDF079-macmini kubernetes $ kubectl get pods
NAME                            READY   STATUS    RESTARTS   AGE
service1-dev-5fd7b9c8cb-48kmj   1/1     Running   0          44m
service2-dev-69bd7985f7-5tvj8   1/1     Running   0          40m
```
 6. Expose pods as a service (can be accessible outside internal network)
` kubectl expose -f service-one.yml` & ` kubectl expose -f service-two.yml`

```bash
radykhovskyiserhii@PDF079-macmini kubernetes $ kubectl get services
NAME           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes     ClusterIP   10.96.0.1       <none>        443/TCP    10h
service1-dev   ClusterIP   10.109.25.157   <none>        8080/TCP   27s
service2-dev   ClusterIP   10.100.57.209   <none>        8080/TCP   16s
```
 7. Apply Ingress config `kubectl apply -f ingress.yml`

```bash
radykhovskyiserhii@PDF079-macmini kubernetes $ kubectl get ingress
NAME      HOSTS                       ADDRESS     PORTS   AGE
ingress   service1.xyz,service2.xyz   10.0.2.15   80      14m
```

```bash
radykhovskyiserhii@PDF079-macmini kubernetes $ kubectl describe ingress ingress
Name:             ingress
Namespace:        default
Address:          10.0.2.15
Default backend:  default-http-backend:80 (<none>)
Rules:
  Host          Path  Backends
  ----          ----  --------
  service1.xyz
                   service1-dev:8080 (172.17.0.6:8080)
  service2.xyz
                   service2-dev:8080 (172.17.0.7:8080)
Annotations:
  kubectl.kubernetes.io/last-applied-configuration:  {"apiVersion":"networking.k8s.io/v1beta1","kind":"Ingress","metadata":{"annotations":{},"name":"ingress","namespace":"default"},"spec":{"rules":[{"host":"service1.xyz","http":{"paths":[{"backend":{"serviceName":"service1-dev","servicePort":8080}}]}},{"host":"service2.xyz","http":{"paths":[{"backend":{"serviceName":"service2-dev","servicePort":8080}}]}}]}}

Events:
  Type    Reason  Age    From                      Message
  ----    ------  ----   ----                      -------
  Normal  CREATE  4m14s  nginx-ingress-controller  Ingress default/ingress
  Normal  UPDATE  4m14s  nginx-ingress-controller  Ingress default/ingress
```
 8. Add to `/etc/hosts` –> `192.168.99.100 service1.xyz service2.xyz` (get ip using `minikube ip`)
 9. Check result
  ```bash
radykhovskyiserhii@PDF079-macmini 2-kubernetes (master) $ curl service1.xyz
This is Service1
```

```bash
radykhovskyiserhii@PDF079-macmini 2-kubernetes (master) $ curl service2.xyz
This is Service2
```

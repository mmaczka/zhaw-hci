

docker rmi zhaw-hci/postgres
pushd .
cd docker\postgres
docker build -t zhaw-hci/postgres .
popd
pushd .
cd app
docker build -t zhaw-hci/app .
popd


docker rm db

docker rm app
docker run  -d -t -i -p 5433:5432 --name db zhaw-hci/postgres
docker run  -d -t -i --link db:db -p 80:3000 --name app zhaw-hci/app

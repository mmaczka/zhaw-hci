docker rm db
docker run  -d -t -i -p 5433:5432 --name db zhaw-hci/postgres
docker rm app
docker run  -d -t -i --link db:db -p 80:3000 --name app zhaw-hci/app
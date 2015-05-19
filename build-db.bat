docker rmi zhaw-hci/postgres
pushd .
cd docker
cd postgres
docker build --rm -t zhaw-hci/postgres .
popd
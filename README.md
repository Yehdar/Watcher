# Watcher

## Abstract
Staff management system

## Documentation
- if on a linux environment, remember to add `sudo` to every docker command.
- to build docker image: `sudo docker-compose build {name}`
- to boot up the database container: `sudo docker-compose up -d db`
- to access database: `sudo docker exec -it db psql -U postgres`
- to check docker containers: `sudo docker ps -a`
- to debug by checking docker logs: `sudo docker-compose logs {image name}`
- to use maven: `mvn clean package`

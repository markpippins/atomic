#!/bin/bash
docker run -d --name atomic-mongodb  -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoUser -e MONGO_INITDB_ROOT_PASSWORD=somePassword -v mongodb_data:/data/db mongo:latest

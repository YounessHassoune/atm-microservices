#!/bin/bash
mongo --eval  "db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD'); db = db.getSiblingDB('${MONGO_USER_SERVICE_DATABASE}');db.createUser({user: '${MONGO_USER_SERVICE_USERNAME}', pwd: '${MONGO_USER_SERVICE_PASSWORD}', roles:[{role:'readWrite', db: '${MONGO_USER_SERVICE_DATABASE}'}]});"

#!/bin/bash
mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var admin = db.getSiblingDB('admin');
    admin.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD);
    var user_1 = {
        user: '$MONGO_USER_SERVICE_USERNAME',
        pwd: '$MONGO_USER_SERVICE_PASSWORD',
        roles: [{
            role: 'readWrite',
            db: '$MONGO_USER_SERVICE_DATABASE'
        }]
    }; 
    db.createUser(user_1);
EOF
#!/bin/bash

PATH_ORIGIN=$(pwd)
VERSION=v1
SERVICE_NAME=$SERVICE_NAME_ENV
SERVICE_ROUTE=$SERVICE_ROUTE_ENV
BRANCH_NAME=$BRANCH_NAME_ENV
SERVER=$SERVER_DEPLOYMENT
GIT_FECTH=$GIT_FETCH_ENV
INTERN_PORT=$INTERN_PORT
PORT=$PORT

cd $SERVICE_ROUTE

if [ $SERVER == "production" ]
then 
	SERVICE_NAME=$SERVICE_NAME-production
	SERVER_OK=true
	CONF_FRONT=production
elif [ $SERVER == "dev" ]
then
	SERVICE_NAME=$SERVICE_NAME-dev
	SERVER_OK=true
	CONF_FRONT=dev
else
	SERVER_OK=false
fi

if [ $SERVER_OK == true ]
then
	echo "BRANCH_NAME=$BRANCH_NAME"
	echo "SERVER=$SERVER"

	if [ "$GIT_FETCH" = true ]
	then
    		echo "Fetching code from branch $BRANCH_NAME"
        	git fetch
        	git reset --hard origin/$BRANCH_NAME
	else
    		echo "Not fetching"
	fi
	CONTAINER_TAG=$VERSION
	IMAGE_NAME="$SERVICE_NAME:$CONTAINER_TAG"
	echo "Stopping service $SERVICE_NAME"
	sudo docker stop $SERVICE_NAME
	if [ $? -eq 0 ]
	then
        	echo "$SERVICE_NAME service stopped"
	else
    		echo "$SERVICE_NAME not exists"
	fi
	echo "Removing image $IMAGE_NAME"
	sudo docker rm $SERVICE_NAME
	if [ $? -eq 0 ]
	then
    		echo "$IMAGE_NAME image removed"
	else
    		echo "$IMAGE_NAME not exists"
	fi

    sudo docker build -t $IMAGE_NAME .

    echo "Running service $SERVICE_NAME ..."
    sudo docker run -d \
        -p $PORT:$INTERN_PORT \
        --name $SERVICE_NAME \
        $IMAGE_NAME
    
    if [ $? -eq 0 ]
    then
        echo "Docker run corretly"
    else
        echo "ERROR running docker"
    fi 
else
	echo "Not server sended"
fi

cd $PATH_ORIGIN

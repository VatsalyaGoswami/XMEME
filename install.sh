#!/bin/bash
# Any installation related commands
# sudo apt-get install -y abc
# add nodejs 12 ppa (personal package archive) from nodesource
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
# install nodejs and npm
sudo apt-get install -y nodejs
# import mongodb 4.0 public gpg key
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
# create the /etc/apt/sources.list.d/mongodb-org-4.0.list file for mongodb
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
# reload local package database
sudo apt-get update
# install the latest version of mongodb
sudo apt-get install -y mongodb-org
# start mongodb
sudo systemctl start mongod
# set mongodb to start automatically on system startup
sudo systemctl enable mongod
# Any configuration related commands



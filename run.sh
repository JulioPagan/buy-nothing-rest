#!/bin/bash

sudo apt update
sudo apt upgrade
sudo snap install curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs
sudo apt install npm
npm install

npm run test

npm run test:cov


npm run start
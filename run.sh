#!/bin/bash

sudo apt update
sudo apt upgrade
sudo apt install npm
npm install

npm run test

npm run test:cov


npm run start
#!/bin/bash
export NODE_ENV=production 

yarn build

kill -9 $(lsof -t -i:4200)

yarn start --port 4200 &

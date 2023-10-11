#!/bin/bash
set -e

if [[ $NODE_ENV = "development" ]] ; then
  npm install --also=dev
  npm run dev
else
  npm run typeorm migration:run
  npm run swagger
  npm run start
fi

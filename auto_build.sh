#! /bin/bash

git reset --hard origin/master
git clean -f
git pull
yarn
yarn run build
pm2 info 0
pm2 reload lushx

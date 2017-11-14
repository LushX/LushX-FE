#! /bin/bash
git reset --hard origin/master
git clean -f
git pull
yarn
yarn run build
pm2 restart lushx

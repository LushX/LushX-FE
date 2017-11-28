#! /bin/bash

echo 'Starting pull code from GitHub...'
git reset --hard origin/master
git clean -f
git pull

echo 'Starting install dependencies...'
yarn

# 由于服务器内存过小，暂停使用自动打包

echo 'Starting build project...'
yarn run build

echo 'reloading website...'
pm2 reload lushx

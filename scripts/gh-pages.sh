#!/usr/bin/env zsh

# 确保脚本抛出遇到的错误
set -e

# 查看当前目录
pwd

# 生成静态文件
pnpm run docs:build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy to the gh-pages'
git push -f git@github.com:ShuangDa1018/react-shuang.git master:gh-pages
# git push -f https://github.com/ShuangDa1018/react-shuang.git master:gh-pages
# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:ShuangDa1018/react-shuang.git main:gh-pages
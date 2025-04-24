#!/bin/bash
# 该脚本用于生成ECS部署所需文件，即将build生成的.next文件夹，public,package.json,package-lock.json,next.config.js
# 复制到deploy_folder，并将其压缩为zip文件

TARGET_FOLDER="deploy_folder"

# 检查是否存在目标文件夹,不存在则创建，存在则清空
if [ ! -d "$TARGET_FOLDER" ]; then
  echo "目标文件夹不存在，正在创建..."
  mkdir "$TARGET_FOLDER"
else
  echo "目标文件夹已存在，正在清空..."
  rm -rf "$TARGET_FOLDER"/*
fi

# 检查是否存在.next文件夹
if [ ! -d ".next" ]; then
  echo ".next文件夹不存在，请先运行npm run build"
  exit 1
fi

# 复制文件夹和文件到目标文件夹
echo "正在复制文件到目标文件夹..."
cp -r .next "$TARGET_FOLDER"
cp -r public "$TARGET_FOLDER"
cp package.json "$TARGET_FOLDER"
cp package-lock.json "$TARGET_FOLDER"
cp next.config.mjs "$TARGET_FOLDER"
echo "复制完成"

# 压缩目标文件夹为tar.gz文件，包括.开头的文件夹


echo "正在压缩文件..."
cd "$TARGET_FOLDER" || exit
tar -czvf "${TARGET_FOLDER}.tar.gz" .
echo "压缩完成，文件名为${TARGET_FOLDER}.tar.gz"

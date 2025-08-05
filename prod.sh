#!/bin/bash

# ==== 可配置变量 ====
REMOTE_USER="root"
REMOTE_HOST="47.236.201.39"
REMOTE_DIR="/usr/local/nginx/html/demo"
DIST_DIR="dist"
TAR_FILE="dist.tgz"
TARGET_DIR="demo"
BUILD_CMD="npm run build"

git reset --hard
git pull origin main

# ==== 本地操作 ====
echo "🧹 清理本地构建文件..."
rm -rf $DIST_DIR $TAR_FILE

echo "🔨 执行构建命令：$BUILD_CMD"
$BUILD_CMD

echo "📦 打包构建目录为 $TAR_FILE"
tar -zcvf $TAR_FILE $DIST_DIR

echo "🚀 上传 $TAR_FILE 到远程：$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
scp $TAR_FILE $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# ==== 远程操作 ====
echo "📡 连接远程服务器进行部署..."
ssh $REMOTE_USER@$REMOTE_HOST <<EOF
cd $REMOTE_DIR

echo "🧹 清空目标目录 $TARGET_DIR 下旧文件..."
rm -rf $TARGET_DIR/*

echo "📂 解压 $TAR_FILE..."
tar -zxvf $TAR_FILE

echo "📁 将 $DIST_DIR/* 移动到 $TARGET_DIR/"
mv $DIST_DIR/* $TARGET_DIR/

echo "🧹 清理临时文件..."
rm -rf $DIST_DIR $TAR_FILE

echo "🔄 重启 nginx..."
systemctl restart nginx

echo "✅ 远程部署完成！"
EOF

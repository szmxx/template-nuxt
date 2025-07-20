#!/bin/bash

# 构建和部署脚本
# 用于构建Docker镜像并启动应用（在容器内完成构建）

set -e  # 遇到错误时退出

echo "🚀 开始构建和部署 Nuxt 应用..."

# 1. 停止并删除现有容器（如果存在）
echo "🛑 停止现有容器..."
docker-compose -f docker-compose.yml down 2>/dev/null || true

# 2. 构建 Docker 镜像
echo "🐳 构建 Docker 镜像..."
docker-compose -f docker-compose.yml build --no-cache

# 3. 启动容器
echo "🚀 启动应用容器..."
docker-compose -f docker-compose.yml up -d

# 4. 等待应用启动
echo "⏳ 等待应用启动..."
sleep 10

# 5. 检查应用状态
echo "🔍 检查应用状态..."
docker-compose -f docker-compose.yml ps

# 6. 显示日志
echo "📋 显示应用日志..."
docker-compose -f docker-compose.yml logs --tail=20

echo ""
echo "🎉 部署完成！"
echo "📱 应用访问地址: http://localhost:8080"
echo "📊 查看日志: docker-compose -f docker-compose.yml logs -f"
echo "🛑 停止应用: docker-compose -f docker-compose.yml down"
echo ""
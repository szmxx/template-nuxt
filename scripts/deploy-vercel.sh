#!/bin/bash

# 简化的 Vercel 部署脚本
# 使用方法: ./scripts/deploy-vercel.sh [preview|production]

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${2:-$BLUE}$1${NC}"
}

# 检查工具
check_tools() {
    command -v pnpm >/dev/null || { log "错误: 需要安装 pnpm" "$RED"; exit 1; }
    command -v vercel >/dev/null || { log "安装 Vercel CLI..." "$YELLOW"; pnpm add -g vercel; }
}

# 部署函数
deploy() {
    local env=${1:-"preview"}
    
    log "=== Vercel 部署 ($env) ===" "$BLUE"
    
    # 基本检查
    [ -f "package.json" ] || { log "错误: 请在项目根目录运行" "$RED"; exit 1; }
    
    check_tools
    
    # 部署
    log "开始部署..." "$BLUE"
    if [ "$env" = "production" ]; then
        vercel --prod
    else
        vercel
    fi
    
    log "✅ 部署完成!" "$GREEN"
    log "💡 记得检查: 网站加载、OAuth登录、GA统计" "$YELLOW"
}

# 显示帮助
show_help() {
    cat << EOF
Vercel 部署脚本

用法:
  $0 [preview|production]    # 部署到指定环境
  $0 --help                 # 显示帮助

示例:
  $0                         # 部署到预览环境
  $0 production              # 部署到生产环境

注意: 请确保已在 Vercel 中配置必要的环境变量
EOF
}

# 主逻辑
case "${1:-preview}" in
    --help|-h) show_help ;;
    production|prod) deploy "production" ;;
    preview|*) deploy "preview" ;;
esac
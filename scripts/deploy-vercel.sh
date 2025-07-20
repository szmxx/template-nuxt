#!/bin/bash

# Vercel 部署脚本
# 使用方法: ./scripts/deploy-vercel.sh [环境]
# 环境选项: preview (默认) | production

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    echo -e "${2}${1}${NC}"
}

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 检查必要的工具
check_requirements() {
    print_message "检查部署要求..." "$BLUE"
    
    if ! command_exists "pnpm"; then
        print_message "错误: 未找到 pnpm。请先安装 pnpm: npm install -g pnpm" "$RED"
        exit 1
    fi
    
    if ! command_exists "vercel"; then
        print_message "错误: 未找到 Vercel CLI。正在安装..." "$YELLOW"
        pnpm add -g vercel
    fi
    
    print_message "✓ 所有要求已满足" "$GREEN"
}

# 检查环境变量
check_env_vars() {
    print_message "检查环境变量配置..." "$BLUE"
    
    if [ ! -f ".env.example" ]; then
        print_message "警告: 未找到 .env.example 文件" "$YELLOW"
    else
        print_message "✓ 找到环境变量示例文件" "$GREEN"
    fi
    
    # 检查必要的环境变量
    required_vars=("NUXT_AUTH_SECRET" "NUXT_PUBLIC_GOOGLE_ANALYTICS_ID")
    missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if ! vercel env ls | grep -q "$var"; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        print_message "警告: 以下环境变量未在 Vercel 中配置:" "$YELLOW"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        echo
        print_message "请使用以下命令添加环境变量:" "$BLUE"
        for var in "${missing_vars[@]}"; do
            echo "  vercel env add $var production"
        done
        echo
        read -p "是否继续部署? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        print_message "✓ 所有必要的环境变量已配置" "$GREEN"
    fi
}

# 运行测试
run_tests() {
    print_message "运行测试..." "$BLUE"
    
    if [ -f "package.json" ] && grep -q '"test"' package.json; then
        if pnpm test; then
            print_message "✓ 所有测试通过" "$GREEN"
        else
            print_message "错误: 测试失败" "$RED"
            read -p "是否忽略测试失败并继续部署? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                exit 1
            fi
        fi
    else
        print_message "跳过测试 (未找到测试脚本)" "$YELLOW"
    fi
}

# 构建项目
build_project() {
    print_message "构建项目..." "$BLUE"
    
    if pnpm build; then
        print_message "✓ 项目构建成功" "$GREEN"
    else
        print_message "错误: 项目构建失败" "$RED"
        exit 1
    fi
}

# 部署到 Vercel
deploy_to_vercel() {
    local env=${1:-"preview"}
    
    print_message "部署到 Vercel ($env)..." "$BLUE"
    
    if [ "$env" = "production" ]; then
        vercel --prod
    else
        vercel
    fi
    
    if [ $? -eq 0 ]; then
        print_message "✓ 部署成功!" "$GREEN"
        
        # 获取部署 URL
        if [ "$env" = "production" ]; then
            deployment_url=$(vercel ls --scope=$(vercel whoami) | grep "$(basename $(pwd))" | head -1 | awk '{print $2}')
        else
            deployment_url=$(vercel ls --scope=$(vercel whoami) | grep "$(basename $(pwd))" | head -1 | awk '{print $2}')
        fi
        
        if [ -n "$deployment_url" ]; then
            print_message "部署 URL: https://$deployment_url" "$GREEN"
        fi
    else
        print_message "错误: 部署失败" "$RED"
        exit 1
    fi
}

# 显示部署后检查清单
show_checklist() {
    print_message "\n部署后检查清单:" "$BLUE"
    echo "□ 网站正常加载"
    echo "□ Cookie 同意横幅显示"
    echo "□ Google Analytics 事件发送成功"
    echo "□ OAuth 登录功能正常"
    echo "□ PWA 功能正常"
    echo "□ 国际化切换正常"
    echo "□ 主题切换正常"
    echo "□ SEO 元数据正确"
    echo
    print_message "建议使用以下工具检查性能:" "$BLUE"
    echo "- PageSpeed Insights: https://pagespeed.web.dev/"
    echo "- GTmetrix: https://gtmetrix.com/"
    echo "- WebPageTest: https://www.webpagetest.org/"
}

# 主函数
main() {
    local env=${1:-"preview"}
    
    print_message "=== Vercel 部署脚本 ===" "$BLUE"
    print_message "部署环境: $env" "$BLUE"
    echo
    
    # 检查是否在项目根目录
    if [ ! -f "package.json" ] || [ ! -f "nuxt.config.ts" ]; then
        print_message "错误: 请在项目根目录运行此脚本" "$RED"
        exit 1
    fi
    
    # 执行部署步骤
    check_requirements
    check_env_vars
    
    # 询问是否运行测试
    read -p "是否运行测试? (Y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        run_tests
    fi
    
    # 询问是否构建项目
    read -p "是否在本地构建项目进行验证? (Y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        build_project
    fi
    
    # 确认部署
    echo
    print_message "准备部署到 $env 环境" "$YELLOW"
    read -p "确认部署? (Y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        print_message "部署已取消" "$YELLOW"
        exit 0
    fi
    
    # 执行部署
    deploy_to_vercel "$env"
    
    # 显示检查清单
    show_checklist
    
    print_message "\n🎉 部署完成!" "$GREEN"
}

# 显示帮助信息
show_help() {
    echo "Vercel 部署脚本"
    echo
    echo "使用方法:"
    echo "  $0 [环境]                部署到指定环境"
    echo "  $0 --help               显示此帮助信息"
    echo
    echo "环境选项:"
    echo "  preview                 部署到预览环境 (默认)"
    echo "  production              部署到生产环境"
    echo
    echo "示例:"
    echo "  $0                      # 部署到预览环境"
    echo "  $0 preview              # 部署到预览环境"
    echo "  $0 production           # 部署到生产环境"
    echo
    echo "环境变量配置:"
    echo "  在部署前，请确保在 Vercel 中配置了以下环境变量:"
    echo "  - NUXT_AUTH_SECRET"
    echo "  - NUXT_PUBLIC_GOOGLE_ANALYTICS_ID"
    echo "  - NUXT_PUBLIC_SITE_URL"
    echo "  - NUXT_PUBLIC_SITE_NAME"
    echo "  - OAuth 提供商的客户端 ID 和密钥"
    echo
    echo "更多信息请参考: docs/Vercel-部署指南.md"
}

# 处理命令行参数
case "${1:-}" in
    --help|-h)
        show_help
        exit 0
        ;;
    production|prod)
        main "production"
        ;;
    preview|"")
        main "preview"
        ;;
    *)
        print_message "错误: 未知的环境 '$1'" "$RED"
        echo "使用 --help 查看帮助信息"
        exit 1
        ;;
esac
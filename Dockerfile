# Dockerfile

# 多阶段构建 - 构建阶段
FROM node:20-alpine AS builder

# 安装 pnpm
RUN npm install -g pnpm

# 创建应用目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 复制 Docker 环境变量文件
COPY .env.docker .env

# 构建应用
RUN pnpm run build

# 生产环境镜像
FROM node:20-alpine AS runner

# 安装 PM2
RUN npm install -g pm2

# 创建应用目录
WORKDIR /app

# 从构建阶段复制构建产物
COPY --from=builder /app/.output /app/.output

# 设置环境变量
ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV=production

# 暴露端口
EXPOSE 80


# 启动 Nuxt 应用
CMD ["pm2-runtime", "start", "/app/.output/server/index.mjs", "--name", "nuxt-app"]

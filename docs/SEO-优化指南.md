# SEO 优化指南

本项目已经配置了完善的 SEO 优化方案，包括全局配置和页面级别的简化配置。

## 🎯 全局 SEO 配置

### nuxt.config.ts 中的全局配置

```typescript
export default defineNuxtConfig({
  // 站点基础信息
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://your-domain.com",
    name: process.env.NUXT_PUBLIC_SITE_NAME || "Nuxt 模板项目",
    description: "一个集成了 UnoCSS、VueUse 和 SEO 优化的现代化 Nuxt 3 模板项目",
    defaultLocale: "zh-CN",
  },

  // 全局 App 配置 - 默认 meta 标签
  app: {
    head: {
      meta: [
        { name: 'author', content: 'szmintel' },
        { property: 'og:site_name', content: '站点名称' },
        { name: 'twitter:card', content: 'summary_large_image' },
        // ... 更多默认配置
      ],
    },
  },
})
```

### 环境变量配置

在 `.env` 文件中配置站点信息：

```bash
NUXT_PUBLIC_SITE_URL=https://your-domain.com
NUXT_PUBLIC_SITE_NAME=你的站点名称
NUXT_PUBLIC_SITE_DESCRIPTION=站点描述
NUXT_PUBLIC_DEFAULT_LOCALE=zh-CN
```

## 🚀 页面级别 SEO 配置

### 1. 基础页面 SEO

使用 `useSEO()` composable 进行基础配置：

```vue
<script setup>
// 简单的页面 SEO 配置
useSEO({
  title: '页面标题',
  description: '页面描述',
  keywords: '关键词1, 关键词2, 关键词3',
  ogType: 'website', // 或 'article', 'product', 'profile'
})
</script>
```

### 2. 文章页面 SEO

使用 `useArticleSEO()` 专门为文章页面优化：

```vue
<script setup>
const publishDate = new Date('2024-01-01')
const modifiedDate = new Date()

useArticleSEO({
  title: '文章标题',
  description: '文章描述',
  keywords: '文章关键词',
  headline: '文章标题（用于结构化数据）',
  author: '作者名称',
  datePublished: publishDate,
  dateModified: modifiedDate,
})
</script>
```

### 3. 带面包屑的页面 SEO

使用 `useWebPageSEO()` 添加面包屑导航：

```vue
<script setup>
useWebPageSEO({
  title: '页面标题',
  description: '页面描述',
  breadcrumb: [
    { name: '首页', url: 'https://your-domain.com' },
    { name: '分类页', url: 'https://your-domain.com/category' },
    { name: '当前页', url: 'https://your-domain.com/category/current' },
  ],
})
</script>
```

## 📋 SEO 配置参数说明

### useSEO() 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | t('seo.title') | 页面标题 |
| description | string | t('seo.description') | 页面描述 |
| keywords | string | 默认关键词 | 页面关键词 |
| ogType | string | 'website' | Open Graph 类型 |
| ogImage | string | - | Open Graph 图片 |
| canonical | string | 自动生成 | 规范化 URL |
| noIndex | boolean | false | 是否禁止索引 |
| author | string | 'szmintel' | 作者信息 |

### useArticleSEO() 额外参数

| 参数 | 类型 | 说明 |
|------|------|------|
| headline | string | 文章标题（结构化数据） |
| datePublished | Date | 发布时间 |
| dateModified | Date | 修改时间 |

### useWebPageSEO() 额外参数

| 参数 | 类型 | 说明 |
|------|------|------|
| breadcrumb | Array | 面包屑导航数组 |

## 🎨 最佳实践

### 1. 标题优化

```vue
<script setup>
// ✅ 好的做法
useSEO({
  title: '具体页面标题 - 站点名称',
  // 保持在 60 字符以内
})

// ❌ 避免的做法
useSEO({
  title: '这是一个非常非常长的标题，超过了搜索引擎推荐的字符限制，可能会被截断',
})
</script>
```

### 2. 描述优化

```vue
<script setup>
// ✅ 好的做法
useSEO({
  description: '简洁明了的页面描述，包含主要关键词，长度控制在 160 字符以内。',
})

// ❌ 避免的做法
useSEO({
  description: '描述过短', // 太短
  // 或者描述过长，超过 160 字符...
})
</script>
```

### 3. 关键词优化

```vue
<script setup>
// ✅ 好的做法
useSEO({
  keywords: '主关键词, 相关关键词1, 相关关键词2, 长尾关键词',
  // 3-5 个相关关键词
})

// ❌ 避免的做法
useSEO({
  keywords: '关键词1, 关键词2, 关键词3, 关键词4, 关键词5, 关键词6, 关键词7, 关键词8',
  // 关键词堆砌
})
</script>
```

### 4. 多语言 SEO

```vue
<script setup>
const { t } = useI18n()

// ✅ 使用国际化
useSEO({
  title: t('page.title'),
  description: t('page.description'),
  keywords: t('page.keywords'),
})
</script>
```

### 5. 动态内容 SEO

```vue
<script setup>
const route = useRoute()
const { data: post } = await $fetch(`/api/posts/${route.params.id}`)

// ✅ 基于动态内容生成 SEO
useArticleSEO({
  title: `${post.title} - 博客`,
  description: post.excerpt,
  keywords: post.tags.join(', '),
  headline: post.title,
  author: post.author,
  datePublished: new Date(post.publishedAt),
  dateModified: new Date(post.updatedAt),
})
</script>
```

## 🔍 SEO 检查清单

### 页面级别检查

- [ ] 每个页面都有唯一的 title
- [ ] 每个页面都有合适的 description
- [ ] 关键词与页面内容相关
- [ ] 设置了正确的 canonical URL
- [ ] Open Graph 标签完整
- [ ] Twitter Card 配置正确

### 技术 SEO 检查

- [ ] 启用了 sitemap.xml 自动生成
- [ ] 配置了 robots.txt
- [ ] 使用了结构化数据
- [ ] 页面加载速度优化
- [ ] 移动端友好
- [ ] HTTPS 配置

### 内容 SEO 检查

- [ ] 标题包含主要关键词
- [ ] 内容原创且有价值
- [ ] 图片添加了 alt 属性
- [ ] 内部链接结构合理
- [ ] 面包屑导航清晰

## 🛠️ 调试和测试

### 1. 本地调试

```bash
# 查看生成的 meta 标签
pnpm dev
# 在浏览器中查看页面源代码
```

### 2. SEO 工具测试

- **Google Search Console**: 监控搜索表现
- **Google PageSpeed Insights**: 测试页面速度
- **Google Rich Results Test**: 测试结构化数据
- **Facebook Sharing Debugger**: 测试 Open Graph
- **Twitter Card Validator**: 测试 Twitter Card

### 3. 生产环境检查

```bash
# 构建并预览
pnpm build
pnpm preview

# 检查 sitemap
curl https://your-domain.com/sitemap.xml

# 检查 robots.txt
curl https://your-domain.com/robots.txt
```

## 📚 相关资源

- [Nuxt SEO 官方文档](https://nuxtseo.com/)
- [Google SEO 指南](https://developers.google.com/search/docs)
- [Open Graph 协议](https://ogp.me/)
- [Twitter Card 文档](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [结构化数据指南](https://developers.google.com/search/docs/guides/intro-structured-data)

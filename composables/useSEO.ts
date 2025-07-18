/**
 * SEO 配置 Composable
 * 简化页面级别的 SEO 设置，避免重复代码
 */

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: "website" | "article" | "product" | "profile";
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const useSEO = (config: SEOConfig = {}) => {
  const { t, locale } = useI18n();
  const route = useRoute();

  // 获取站点基础信息
  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL;
  const siteName = process.env.NUXT_PUBLIC_SITE_NAME;

  // 构建完整的页面 URL
  const fullUrl = config.canonical || `${siteUrl}${route.path}`;

  // 默认配置
  const defaultConfig = {
    title: t("seo.title"),
    description: t("seo.description"),
    keywords: "Nuxt 3, Vue 3, UnoCSS, VueUse, SEO, i18n, 模板, 全栈开发",
    ogType: "website" as const,
    author: "szmintel",
  };

  // 合并配置
  const finalConfig = { ...defaultConfig, ...config };

  // 构建 meta 标签
  const meta: any[] = [
    { name: "description", content: finalConfig.description },
    { name: "keywords", content: finalConfig.keywords },
  ];

  // 添加作者信息
  if (finalConfig.author) {
    meta.push({ name: "author", content: finalConfig.author });
  }

  // 添加 noindex 标签
  if (config.noIndex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  // Open Graph 标签
  meta.push(
    { property: "og:title", content: finalConfig.title },
    { property: "og:description", content: finalConfig.description },
    { property: "og:type", content: finalConfig.ogType },
    { property: "og:url", content: fullUrl },
    {
      property: "og:locale",
      content: locale.value === "zh-CN" ? "zh_CN" : "en_US",
    }
  );

  // 添加 OG 图片
  if (finalConfig.ogImage) {
    meta.push({ property: "og:image", content: finalConfig.ogImage });
  }

  // 文章类型的额外标签
  if (finalConfig.ogType === "article") {
    if (finalConfig.author) {
      meta.push({ property: "article:author", content: finalConfig.author });
    }
    if (finalConfig.publishedTime) {
      meta.push({
        property: "article:published_time",
        content: finalConfig.publishedTime,
      });
    }
    if (finalConfig.modifiedTime) {
      meta.push({
        property: "article:modified_time",
        content: finalConfig.modifiedTime,
      });
    }
  }

  // Twitter Card 标签
  meta.push(
    { name: "twitter:title", content: finalConfig.title },
    { name: "twitter:description", content: finalConfig.description }
  );

  // 构建 link 标签
  const link: any[] = [{ rel: "canonical", href: fullUrl }];

  // 应用 SEO 配置
  useHead({
    title: finalConfig.title,
    meta,
    link,
  });

  return {
    title: finalConfig.title,
    description: finalConfig.description,
    url: fullUrl,
    siteName,
  };
};

/**
 * 文章页面专用的 SEO 配置
 */
export const useArticleSEO = (
  config: SEOConfig & {
    headline?: string;
    datePublished?: Date;
    dateModified?: Date;
  }
) => {
  const now = new Date();

  const articleConfig: SEOConfig = {
    ...config,
    ogType: "article",
    publishedTime: config.datePublished?.toISOString() || now.toISOString(),
    modifiedTime: config.dateModified?.toISOString() || now.toISOString(),
  };

  const seoData = useSEO(articleConfig);

  // 添加结构化数据
  if (config.headline) {
    useSchemaOrg([
      defineArticle({
        headline: config.headline,
        description: config.description || seoData.description,
        author: {
          "@type": "Person",
          name: config.author || "szmintel",
        },
        datePublished: articleConfig.publishedTime,
        dateModified: articleConfig.modifiedTime,
        inLanguage: "zh-CN",
      }),
    ]);
  }

  return seoData;
};

/**
 * 网站页面专用的 SEO 配置
 */
export const useWebPageSEO = (
  config: SEOConfig & {
    breadcrumb?: Array<{ name: string; url: string }>;
  }
) => {
  const seoData = useSEO({ ...config, ogType: "website" });

  // 构建结构化数据数组
  const schemaData: any[] = [];

  // 添加网页结构化数据
  schemaData.push(
    defineWebPage({
      "@type": "WebPage",
      name: config.title || seoData.title,
      description: config.description || seoData.description,
    })
  );

  // 如果有面包屑，添加面包屑结构化数据
  if (config.breadcrumb && config.breadcrumb.length > 0) {
    schemaData.push(
      defineBreadcrumb({
        itemListElement: config.breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      })
    );
  }

  useSchemaOrg(schemaData);

  return seoData;
};

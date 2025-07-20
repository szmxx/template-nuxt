import GoogleProvider from "@auth/core/providers/google";
import GitHubProvider from "@auth/core/providers/github";
import DiscordProvider from "@auth/core/providers/discord";
import TwitterProvider from "@auth/core/providers/twitter";
import FacebookProvider from "@auth/core/providers/facebook";
import CredentialsProvider from "@auth/core/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import type { JWT } from "@auth/core/jwt";
import type { User, Account, Profile } from "@auth/core/types";

const runtimeConfig = useRuntimeConfig();

const authConfig = {
  // 认证密钥和来源配置
  secret: runtimeConfig.authSecret,
  // 信任主机和来源配置
  trustHost: true,
  // OAuth 提供商配置
  providers: [
    // Google OAuth 配置
    GoogleProvider({
      clientId: runtimeConfig.googleClientId,
      clientSecret: runtimeConfig.googleClientSecret,
      allowDangerousEmailAccountLinking: true,
    }),

    // GitHub OAuth 配置
    GitHubProvider({
      clientId: runtimeConfig.githubClientId,
      clientSecret: runtimeConfig.githubClientSecret,
    }),

    // Discord OAuth 配置
    DiscordProvider({
      clientId: runtimeConfig.discordClientId,
      clientSecret: runtimeConfig.discordClientSecret,
    }),

    // Twitter OAuth 配置
    TwitterProvider({
      clientId: runtimeConfig.twitterClientId,
      clientSecret: runtimeConfig.twitterClientSecret,
    }),

    // Facebook OAuth 配置
    FacebookProvider({
      clientId: runtimeConfig.facebookClientId,
      clientSecret: runtimeConfig.facebookClientSecret,
    }),

    // 凭证登录配置
    CredentialsProvider({
      id: "credentials",
      name: "凭证登录",
      credentials: {
        username: {
          label: "用户名",
          type: "text",
          placeholder: "请输入用户名",
        },
        password: {
          label: "密码",
          type: "password",
          placeholder: "请输入密码",
        },
      },
      async authorize(credentials: any) {
        try {
          // 这里应该连接到你的数据库或API来验证用户凭证
          // 示例：简单的硬编码验证（生产环境中应该替换为真实的用户验证逻辑）
          if (
            credentials?.username === "admin" &&
            credentials?.password === "password"
          ) {
            return {
              id: "1",
              name: "管理员",
              email: "admin@example.com",
              image: null,
            };
          }

          // 可以添加更多用户验证逻辑
          // 例如：从数据库查询用户，验证密码哈希等

          console.log("登录失败: 用户名或密码错误");
          return null;
        } catch (error) {
          console.error("凭证验证错误:", error);
          return null;
        }
      },
    }),
  ].filter((provider) => {
    // 只包含已配置的提供商
    const providerName = provider.id;

    // 凭证登录提供商始终启用
    if (providerName === "credentials") {
      return true;
    }

    // OAuth提供商的标准处理
    const clientIdKey = `${providerName}ClientId`;
    const clientSecretKey = `${providerName}ClientSecret`;

    return (
      (runtimeConfig as any)[clientIdKey] &&
      (runtimeConfig as any)[clientSecretKey]
    );
  }),

  // 会话配置
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 天
    updateAge: 24 * 60 * 60, // 24 小时
    generateSessionToken: () => crypto.randomUUID(),
  },

  // JWT 配置
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },

  // 回调配置
  callbacks: {
    // JWT 回调 - 处理令牌
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: Account | null;
      user: User | null;
    }): Promise<JWT> {
      // 首次登录时保存账户信息
      if (account && user) {
        (token as any).accessToken = account.access_token;
        (token as any).provider = account.provider;
        (token as any).userId = user.id;

        // 记录登录信息（简化版）
        console.log(`用户 ${user.email} 通过 ${account.provider} 登录`);
      }

      return token;
    },

    // Session 回调 - 处理会话
    async session({ session, token: _token }: { session: any; token: JWT }) {
      // 简化的session回调
      if (session?.user) {
        console.log(`会话活跃: ${session.user.email}`);
      }

      return session;
    },

    // 登录回调 - 控制登录权限
    async signIn({
      user,
      account,
      profile: _profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
    }) {
      try {
        // 允许所有配置的提供商登录
        const allowedProviders = [
          "google",
          "github",
          "discord",
          "twitter",
          "facebook",
          "credentials",
        ];

        if (!account?.provider) {
          console.error("登录失败: 缺少账户提供商信息");
          return false;
        }

        if (!allowedProviders.includes(account.provider)) {
          console.error(`登录失败: 不支持的提供商 ${account.provider}`);
          return false;
        }

        if (!user?.email) {
          console.error("登录失败: 缺少用户邮箱信息");
          return false;
        }

        console.log(`登录验证成功: ${user.email} via ${account.provider}`);
        return true;
      } catch (error) {
        console.error("登录回调错误:", error);
        return false;
      }
    },

    // 重定向回调 - 控制登录后重定向
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // 简化的重定向逻辑
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // 页面配置
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    // signOut: "/auth/signout", // 可选：自定义登出页面
    // verifyRequest: "/auth/verify-request", // 可选：邮箱验证页面
  },

  // 事件处理
  events: {
    async signIn(message: { user: User; account: Account | null }) {
      console.log(
        `用户 ${message.user.email} 通过 ${message.account?.provider} 登录成功`
      );
    },
    async signOut(message: { session?: any; token?: JWT }) {
      console.log(`用户登出: ${message.session?.user?.email || "未知用户"}`);
    },
    async createUser(message: { user: User }) {
      console.log(`新用户创建: ${message.user.email}`);
    },
  },

  // 错误处理配置
  logger: {
    error(error: any) {
      console.error(`Auth错误:`, error);
    },
    warn(code: string) {
      console.warn(`Auth警告 [${code}]`);
    },
    debug(code: string, metadata?: any) {
      if (process.env.NODE_ENV === "development") {
        console.debug(`Auth调试 [${code}]:`, metadata);
      }
    },
  },

  // 调试模式（仅在开发环境启用）
  debug: process.env.NODE_ENV === "development",
};

export default NuxtAuthHandler(authConfig as any);

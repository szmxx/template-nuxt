/**
 * 认证恢复和状态管理的组合式函数
 */
export const useAuthRecovery = () => {
  const { signOut, data: session } = useAuth();
  const router = useRouter();

  /**
   * 完全清除认证状态
   */
  const clearAuthState = async () => {
    try {
      // 1. 如果有活跃会话，先正式登出
      if (session.value) {
        await signOut({ redirect: false });
      }

      // 2. 清除客户端存储
      if (import.meta.client) {
        // 清除 localStorage
        const authKeys = Object.keys(localStorage).filter(
          (key) => key.includes("auth") || key.includes("next-auth")
        );
        authKeys.forEach((key) => localStorage.removeItem(key));

        // 清除 sessionStorage
        sessionStorage.clear();

        // 清除所有认证相关的 cookies
        const cookies = document.cookie.split(";");
        cookies.forEach((cookie) => {
          const eqPos = cookie.indexOf("=");
          const name =
            eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          if (name.includes("auth") || name.includes("next-auth")) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
          }
        });
      }

      console.log("认证状态清除完成");
      return true;
    } catch (error) {
      console.error("清除认证状态失败:", error);
      return false;
    }
  };

  /**
   * 重置认证状态并重新开始登录流程
   */
  const resetAndRetry = async (provider?: string) => {
    try {
      // 清除状态
      await clearAuthState();

      // 等待状态清除完成
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 重定向到登录页面
      const loginUrl = provider
        ? `/auth/signin?provider=${provider}`
        : "/auth/signin";
      await router.push(loginUrl);

      return true;
    } catch (error) {
      console.error("重置认证流程失败:", error);
      return false;
    }
  };

  /**
   * 检查并修复认证状态不一致问题
   */
  const checkAndFixAuthState = async () => {
    if (!import.meta.client) return;

    try {
      // 检查是否存在孤立的认证数据
      const hasLocalAuthData = Object.keys(localStorage).some(
        (key) => key.includes("auth") || key.includes("next-auth")
      );

      const hasSessionData = !!session.value;

      // 如果本地有认证数据但没有有效会话，清除本地数据
      if (hasLocalAuthData && !hasSessionData) {
        console.log("检测到孤立的认证数据，正在清除...");
        await clearAuthState();
      }

      return true;
    } catch (error) {
      console.error("检查认证状态失败:", error);
      return false;
    }
  };

  /**
   * 获取详细的错误信息
   */
  const getDetailedErrorInfo = (errorCode: string) => {
    const errorInfo: Record<
      string,
      { message: string; suggestion: string; canRetry: boolean }
    > = {
      OAuthSignin: {
        message: "OAuth登录初始化失败",
        suggestion: "请检查网络连接，或尝试其他登录方式",
        canRetry: true,
      },
      OAuthCallback: {
        message: "OAuth回调处理失败",
        suggestion: "登录过程被中断，请重新尝试",
        canRetry: true,
      },
      OAuthCreateAccount: {
        message: "创建OAuth账户失败",
        suggestion: "可能是账户已存在或配置问题，请联系管理员",
        canRetry: false,
      },
      AccessDenied: {
        message: "访问被拒绝",
        suggestion: "您可能没有访问权限，请联系管理员",
        canRetry: false,
      },
      Verification: {
        message: "验证失败",
        suggestion: "请检查验证链接是否有效",
        canRetry: true,
      },
      Configuration: {
        message: "配置错误",
        suggestion: "系统配置有误，请联系技术支持",
        canRetry: false,
      },
    };

    return (
      errorInfo[errorCode] || {
        message: "未知错误",
        suggestion: "请尝试刷新页面或联系技术支持",
        canRetry: true,
      }
    );
  };

  return {
    clearAuthState,
    resetAndRetry,
    checkAndFixAuthState,
    getDetailedErrorInfo,
  };
};

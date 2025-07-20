interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user" | "guest";
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  preferences: {
    theme: "light" | "dark" | "auto";
    language: string;
    notifications: boolean;
  };
}

export const useUserStore = defineStore("user", () => {
  // 状态
  const state = reactive<UserState>({
    user: null,
    isLoggedIn: false,
    loading: false,
    preferences: {
      theme: "auto",
      language: "zh-CN",
      notifications: true,
    },
  });

  // 计算属性
  const userName = computed(() => state.user?.name || "游客");
  const userRole = computed(() => state.user?.role || "guest");
  const isAdmin = computed(() => state.user?.role === "admin");
  const userInitials = computed(() => {
    if (!state.user?.name) return "G";
    return state.user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  });

  // 动作
  async function login(email: string) {
    state.loading = true;
    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟登录成功
      state.user = {
        id: 1,
        name: "张三",
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${  email}`,
        role: email.includes("admin") ? "admin" : "user",
      };
      state.isLoggedIn = true;

      // 保存到会话存储（不持久化敏感信息）
      if (import.meta.client) {
        // 使用sessionStorage而不是localStorage，确保浏览器关闭后数据被清理
        sessionStorage.setItem("user", JSON.stringify(state.user));
        sessionStorage.setItem("isLoggedIn", "true");
        
        // 设置自动清理定时器（30分钟无活动后清理）
        const autoCleanupTime = 30 * 60 * 1000; // 30分钟
        setTimeout(() => {
          if (sessionStorage.getItem("user")) {
            console.log("自动清理用户会话数据");
            logout();
          }
        }, autoCleanupTime);
      }
    } catch (error) {
      console.error("登录失败:", error);
      throw error;
    } finally {
      state.loading = false;
    }
  }

  function logout() {
    state.user = null;
    state.isLoggedIn = false;

    // 清除会话存储和所有敏感数据
    if (import.meta.client) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isLoggedIn");
      
      // 清理可能的敏感数据
      const sensitiveKeys = [
        'access_token',
        'refresh_token', 
        'id_token',
        'auth-token',
        'session-token'
      ];
      
      sensitiveKeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
    }
  }

  function updateProfile(updates: Partial<User>) {
    if (state.user) {
      Object.assign(state.user, updates);

      // 更新会话存储
      if (import.meta.client) {
        sessionStorage.setItem("user", JSON.stringify(state.user));
      }
    }
  }

  function updatePreferences(updates: Partial<UserState["preferences"]>) {
    Object.assign(state.preferences, updates);

    // 保存偏好设置到本地存储
    if (import.meta.client) {
      localStorage.setItem(
        "userPreferences",
        JSON.stringify(state.preferences)
      );
    }
  }

  function initializeFromStorage() {
    if (import.meta.client) {
      // 从sessionStorage读取用户数据（不持久化敏感信息）
      const savedUser = sessionStorage.getItem("user");
      const savedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
      // 用户偏好设置可以使用localStorage（非敏感信息）
      const savedPreferences = localStorage.getItem("userPreferences");

      if (savedUser && savedIsLoggedIn === "true") {
        try {
          state.user = JSON.parse(savedUser);
          state.isLoggedIn = true;
        } catch (error) {
          console.warn("解析用户数据失败，清理无效数据:", error);
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("isLoggedIn");
        }
      }

      if (savedPreferences) {
        try {
          Object.assign(state.preferences, JSON.parse(savedPreferences));
        } catch (error) {
          console.warn("解析用户偏好失败:", error);
          localStorage.removeItem("userPreferences");
        }
      }
    }
  }

  return {
    // 状态
    ...toRefs(state),
    // 计算属性
    userName,
    userRole,
    isAdmin,
    userInitials,
    // 动作
    login,
    logout,
    updateProfile,
    updatePreferences,
    initializeFromStorage,
  };
});

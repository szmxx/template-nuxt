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

      // 保存到本地存储
      if (import.meta.client) {
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isLoggedIn", "true");
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

    // 清除本地存储
    if (import.meta.client) {
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    }
  }

  function updateProfile(updates: Partial<User>) {
    if (state.user) {
      Object.assign(state.user, updates);

      // 更新本地存储
      if (import.meta.client) {
        localStorage.setItem("user", JSON.stringify(state.user));
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
      const savedUser = localStorage.getItem("user");
      const savedIsLoggedIn = localStorage.getItem("isLoggedIn");
      const savedPreferences = localStorage.getItem("userPreferences");

      if (savedUser && savedIsLoggedIn === "true") {
        state.user = JSON.parse(savedUser);
        state.isLoggedIn = true;
      }

      if (savedPreferences) {
        Object.assign(state.preferences, JSON.parse(savedPreferences));
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

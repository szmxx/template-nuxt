<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t("demo.authDemo") }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          {{ $t("demo.authDemoDescription") }}
        </p>
      </div>

      <!-- 认证状态卡片 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ $t("auth.status") }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 认证状态 -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span
                class="text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {{ $t("auth.authStatus") }}:
              </span>
              <span
                :class="{
                  'text-green-600 dark:text-green-400': isAuthenticated,
                  'text-red-600 dark:text-red-400':
                    !isAuthenticated && !isLoading,
                  'text-yellow-600 dark:text-yellow-400': isLoading,
                }"
                class="text-sm font-medium"
              >
                {{ getStatusText() }}
              </span>
            </div>

            <div
              v-if="session?.user"
              class="flex items-center justify-between"
            >
              <span
                class="text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {{ $t("auth.provider") }}:
              </span>
              <span
                class="text-sm font-medium text-gray-900 dark:text-white capitalize"
              >
                OAuth
              </span>
            </div>
          </div>

          <!-- 用户信息 -->
          <div v-if="user" class="space-y-3">
            <div class="flex items-center space-x-3">
              <img
                v-if="user.image"
                :src="user.image"
                :alt="user.name || 'User'"
                class="w-12 h-12 rounded-full"
              />
              <div
                v-else
                class="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center"
              >
                <Icon
                  name="heroicons:user"
                  class="w-6 h-6 text-gray-600 dark:text-gray-300"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ user.name || "Unknown User" }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ user.email }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能演示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 登录/登出操作 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("demo.authActions") }}
          </h3>

          <div v-if="!isAuthenticated" class="space-y-2">
            <!-- Google 登录 -->
            <button
              @click="handleSignIn('google')"
              :disabled="isLoading"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="logos:google-icon" class="w-5 h-5 mr-2" />
              {{ $t("auth.signInWithGoogle") }}
            </button>

            <!-- GitHub 登录 -->
            <button
              @click="handleSignIn('github')"
              :disabled="isLoading"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="logos:github-icon" class="w-5 h-5 mr-2" />
              {{ $t("auth.signInWithGitHub") }}
            </button>

            <!-- Discord 登录 -->
            <button
              @click="handleSignIn('discord')"
              :disabled="isLoading"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="logos:discord-icon" class="w-5 h-5 mr-2" />
              {{ $t("auth.signInWithDiscord") }}
            </button>

            <!-- Twitter 登录 -->
            <button
              @click="handleSignIn('twitter')"
              :disabled="isLoading"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="logos:twitter" class="w-5 h-5 mr-2" />
              {{ $t("auth.signInWithTwitter") }}
            </button>

            <!-- Microsoft 登录暂时禁用 -->
             <!-- <button
               @click="handleSignIn('microsoft')"
               :disabled="isLoading"
               class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
               <Icon name="logos:microsoft-icon" class="w-5 h-5 mr-2" />
               {{ $t("auth.signInWithMicrosoft") }}
             </button> -->

            <!-- Facebook 登录 -->
            <button
              @click="handleSignIn('facebook')"
              :disabled="isLoading"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="logos:facebook" class="w-5 h-5 mr-2" />
              {{ $t("auth.signInWithFacebook") }}
            </button>
          </div>

          <div v-else class="space-y-3">
            <button
              @click="handleSignOut"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <Icon
                name="heroicons:arrow-right-on-rectangle"
                class="w-5 h-5 mr-2"
              />
              {{ $t("auth.signOut") }}
            </button>

            <button
              @click="refreshSession"
              class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
              {{ $t("auth.refreshSession") }}
            </button>
          </div>
        </div>

        <!-- 会话信息 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("demo.sessionInfo") }}
          </h3>

          <div v-if="session" class="space-y-2">
            <pre
              class="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded-md overflow-auto max-h-64"
              >{{ JSON.stringify(session, null, 2) }}</pre
            >
          </div>

          <div v-else class="text-center py-8">
            <Icon
              name="heroicons:information-circle"
              class="w-12 h-12 text-gray-400 mx-auto mb-2"
            />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("demo.noSessionData") }}
            </p>
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          {{ $t("demo.usageInstructions") }}
        </h3>
        <div class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <p>{{ $t("demo.instruction1") }}</p>
          <p>{{ $t("demo.instruction2") }}</p>
          <p>{{ $t("demo.instruction3") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: session, status, signIn, signOut, refresh } = useAuth();
const { t } = useI18n();

// 计算属性
const isLoading = computed(() => status.value === "loading");
const isAuthenticated = computed(() => status.value === "authenticated");
const user = computed(() => session.value?.user || null);

// 页面元数据
useHead({
  title: t("demo.authDemo"),
  meta: [{ name: "description", content: t("demo.authDemoDescription") }],
});

// 获取状态文本
const getStatusText = () => {
  if (isLoading.value) return t("auth.loading");
  if (isAuthenticated.value) return t("auth.authenticated");
  return t("auth.unauthenticated");
};

// 登录处理
const handleSignIn = async (provider: string) => {
  try {
    await signIn(provider);
  } catch (error) {
    console.error("Sign in error:", error);
  }
};

// 登出处理
const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

// 刷新会话
const refreshSession = async () => {
  try {
    await refresh();
  } catch (error) {
    console.error("Refresh session error:", error);
  }
};
</script>

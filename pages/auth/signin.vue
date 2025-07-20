<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          {{ $t("auth.signIn") }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {{ $t("auth.signInDescription") }}
        </p>
      </div>

      <div class="mt-8 space-y-3">
        <!-- Google 登录按钮 -->
        <button
          @click="handleSignIn('google')"
          :disabled="loading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="logos:google-icon" class="w-5 h-5 mr-2" />
          <span v-if="!loading">{{ $t("auth.signInWithGoogle") }}</span>
          <span v-else>{{ $t("auth.signingIn") }}</span>
        </button>

        <!-- GitHub 登录按钮 -->
        <button
          @click="handleSignIn('github')"
          :disabled="loading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="logos:github-icon" class="w-5 h-5 mr-2" />
          <span v-if="!loading">{{ $t("auth.signInWithGitHub") }}</span>
          <span v-else>{{ $t("auth.signingIn") }}</span>
        </button>

        <!-- Discord 登录按钮 -->
        <button
          @click="handleSignIn('discord')"
          :disabled="loading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="logos:discord-icon" class="w-5 h-5 mr-2" />
          <span v-if="!loading">{{ $t("auth.signInWithDiscord") }}</span>
          <span v-else>{{ $t("auth.signingIn") }}</span>
        </button>

        <!-- Twitter 登录按钮 -->
        <button
          @click="handleSignIn('twitter')"
          :disabled="loading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="logos:twitter" class="w-5 h-5 mr-2" />
          <span v-if="!loading">{{ $t("auth.signInWithTwitter") }}</span>
          <span v-else>{{ $t("auth.signingIn") }}</span>
        </button>

        <!-- Microsoft 登录暂时禁用 -->
        <!-- <button
          @click="handleSignIn('microsoft')"
          :disabled="loading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="logos:microsoft-icon" class="w-5 h-5 mr-2" />
          <span v-if="!loading">{{ $t("auth.signInWithMicrosoft") }}</span>
          <span v-else>{{ $t("auth.signingIn") }}</span>
        </button> -->

        <!-- Facebook 登录按钮 -->
        <button
          @click="handleSignIn('facebook')"
          :disabled="loading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="logos:facebook" class="w-5 h-5 mr-2" />
          <span v-if="!loading">{{ $t("auth.signInWithFacebook") }}</span>
          <span v-else>{{ $t("auth.signingIn") }}</span>
        </button>
      </div>

      <!-- 分隔线 -->
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            {{ $t("auth.orContinueWith") }}
          </span>
        </div>
      </div>

      <!-- 凭证登录表单 -->
      <div class="mt-6">
        <form @submit.prevent="handleCredentialsSignIn" class="space-y-4">
          <div>
            <label for="username" class="sr-only">
              {{ $t("auth.username") }}
            </label>
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              autocomplete="username"
              required
              :disabled="loading"
              class="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              :placeholder="$t('auth.usernamePlaceholder')"
            />
          </div>
          
          <div>
            <label for="password" class="sr-only">
              {{ $t("auth.password") }}
            </label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :disabled="loading"
              class="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              :placeholder="$t('auth.passwordPlaceholder')"
            />
          </div>
          
          <button
            type="submit"
            :disabled="loading || !username || !password"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon name="heroicons:key" class="w-5 h-5 mr-2" />
            <span v-if="!loading">{{ $t("auth.signInWithCredentials") }}</span>
            <span v-else>{{ $t("auth.signingIn") }}</span>
          </button>
        </form>
      </div>

      <!-- 错误信息显示 -->
      <div
        v-if="error"
        class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
      >
        <div class="flex">
          <Icon
            name="heroicons:exclamation-triangle"
            class="h-5 w-5 text-red-400"
          />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
              {{ $t("auth.signInError") }}
            </h3>
            <div class="mt-2 text-sm text-red-700 dark:text-red-300">
              {{ error }}
            </div>
            <!-- 重试次数提示 -->
            <div v-if="retryCount > 0" class="mt-2 text-xs text-red-600 dark:text-red-400">
              重试次数: {{ retryCount }}/{{ maxRetries }}
            </div>
            <!-- 完全重置按钮 -->
            <div v-if="retryCount >= maxRetries" class="mt-3">
              <button
                @click="handleFullReset"
                :disabled="loading"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-1" />
                完全重置并重试
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 返回首页链接 -->
      <div class="text-center">
        <NuxtLink
          to="/"
          class="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {{ $t("auth.backToHome") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signIn, data: session } = useAuth();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { clearAuthState, resetAndRetry, checkAndFixAuthState, getDetailedErrorInfo } = useAuthRecovery();

// 页面元数据
useHead({
  title: t("auth.signIn"),
  meta: [{ name: "description", content: t("auth.signInDescription") }],
});

// 响应式状态
const loading = ref(false);
const error = ref("");
const retryCount = ref(0);
const maxRetries = 3;

// 凭证登录状态
const username = ref("");
const password = ref("");

// 登录处理函数
const handleSignIn = async (provider: string) => {
  try {
    loading.value = true;
    error.value = "";

    // 如果之前有登录失败，先清理状态
    if (retryCount.value > 0) {
      console.log('检测到重试登录，先清理认证状态...');
      await clearAuthState();
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    await signIn(provider, {
      callbackUrl: (route.query.callbackUrl as string) || "/",
      redirect: true
    });
    
    // 登录成功，重置重试计数
    retryCount.value = 0;
  } catch (err: any) {
    retryCount.value++;
    console.error(`登录失败 (第${retryCount.value}次):`, err);
    
    const errorMessage = err.message || t("auth.unknownError");
    error.value = errorMessage;
    
    // 如果达到最大重试次数，提供完全重置选项
    if (retryCount.value >= maxRetries) {
      error.value = `登录失败次数过多，请点击下方按钮完全重置后重试`;
    }
  } finally {
    loading.value = false;
  }
};

// 完全重置认证状态
const handleFullReset = async () => {
  try {
    loading.value = true;
    error.value = "";
    
    console.log('执行完全重置...');
    await resetAndRetry();
    
    retryCount.value = 0;
  } catch (err) {
    console.error('完全重置失败:', err);
    error.value = '重置失败，请刷新页面重试';
  } finally {
    loading.value = false;
  }
};

// 凭证登录处理函数
const handleCredentialsSignIn = async () => {
  try {
    loading.value = true;
    error.value = "";
    
    console.log('尝试凭证登录:', username.value);
    
    const result = await signIn('credentials', {
      username: username.value,
      password: password.value,
      callbackUrl: (route.query.callbackUrl as string) || "/",
      redirect: false
    });
    
    if (result?.error) {
      throw new Error(result.error);
    }
    
    // 登录成功，重定向
    const callbackUrl = (route.query.callbackUrl as string) || "/";
    await router.push(callbackUrl);
    
    console.log('凭证登录成功');
  } catch (err: any) {
    console.error('凭证登录失败:', err);
    error.value = err.message || t("auth.credentialsError");
    retryCount.value++;
  } finally {
    loading.value = false;
  }
};

// 重置凭证表单（暂时保留，可能在未来使用）
// const resetCredentialsForm = () => {
//   username.value = "";
//   password.value = "";
//   error.value = "";
// };

// 检查 URL 中的错误参数并处理
onMounted(async () => {
  // 检查并修复认证状态
  await checkAndFixAuthState();
  
  if (route.query.error) {
    const errorCode = route.query.error as string;
    const errorInfo = getDetailedErrorInfo(errorCode);
    error.value = `${errorInfo.message}: ${errorInfo.suggestion}`;
    
    // 如果是可重试的错误，增加重试计数
    if (errorInfo.canRetry) {
      retryCount.value++;
    }
    
    // 清理URL中的错误参数
    const cleanQuery = { ...route.query };
    delete cleanQuery.error;
    
    if (Object.keys(cleanQuery).length === 0) {
      await router.replace('/auth/signin');
    } else {
      await router.replace({ path: '/auth/signin', query: cleanQuery });
    }
  }
  
  // 如果用户已经登录，重定向到回调URL或首页
  if (session.value) {
    const callbackUrl = (route.query.callbackUrl as string) || '/';
    await router.push(callbackUrl);
  }
});
</script>

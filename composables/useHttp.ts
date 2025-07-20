import type { UseFetchOptions, AsyncDataOptions } from "#app";
import { $fetch } from "ofetch";

// Type guard to check if the error is an AbortError
function isAbortError(error: any): error is DOMException {
  return error instanceof DOMException && error.name === "AbortError";
}

function useHttpConfig() {
  const runtimeConfig = useRuntimeConfig();

  // 在服务器端，需要使用完整的URL
  if (import.meta.server) {
    const apiBase = runtimeConfig?.public?.apiBase;
    return {
      apiBase: `${process.env.NUXT_PUBLIC_SITE_URL}${apiBase}`,
    };
  }

  // 在客户端，使用相对路径
  return {
    apiBase: runtimeConfig?.public?.apiBase,
  };
}

export function useHttp<T>(
  url: string,
  options: Omit<UseFetchOptions<T>, "baseURL"> & AsyncDataOptions<T> = {}
) {
  // 组合式 API 必须放在顶层
  const config = useHttpConfig();
  const app = useNuxtApp();
  // 使用 ref 来跟踪当前的 AbortController
  const currentController = shallowRef<AbortController | null>(null);
  const defaults: UseFetchOptions<T> = {
    headers: {},
    onResponse({ response }) {
      return response._data;
    },
    onRequestError({ error }) {
      // Log other errors
      if (isAbortError(error)) {
        // Prevent AbortError from being thrown, swallow it
        return Promise.reject(app.$i18n.t("request.cancel"));
      }
      console.error("HTTP request error:", error);
    },
    onResponseError({ response, error }) {
      if (isAbortError(error)) {
        // Prevent AbortError from being thrown, swallow it
        return new Promise(() => {});
      }
      // Log response errors
      console.error("HTTP response error:", response);
    },
  };

  // Merge default options with user-provided options
  const mergedOptions: UseFetchOptions<T> = {
    ...defaults,
    ...options,
    headers: {
      ...defaults.headers,
      ...options.headers,
    },
  };

  const abort = (message?: string) => {
    if (currentController.value && !currentController.value.signal.aborted) {
      currentController.value.abort(message);
    }
  };

  // The handler for useAsyncData, which will call $fetch
  const handler = () => {
    abort(); // Abort any previous ongoing request
    currentController.value = new AbortController();
    return $fetch<T>(url, {
      ...mergedOptions,
      baseURL: config.apiBase,
      signal: currentController.value.signal,
    } as any);
  };

  // 生成唯一的 key
  const key = computed(() => `http-${url}-${JSON.stringify(options)}`);

  // Separate options for useAsyncData
  const asyncDataOptions: AsyncDataOptions<T> = {
    lazy: options.lazy,
    immediate: options.immediate,
    watch: options.watch,
  };

  // 正确的 useAsyncData 调用方式
  const asyncData = useAsyncData<T>(key.value, handler, asyncDataOptions);

  const refresh = () => {
    return asyncData.refresh();
  };

  const execute = () => {
    return asyncData.execute();
  };

  return {
    ...asyncData,
    refresh,
    execute,
    abort,
  };
}

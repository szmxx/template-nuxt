import { RateLimiterMemory } from "rate-limiter-flexible";
import type { RateLimiterRes } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 100, // 每分钟10次请求
  duration: 60,
});

export default defineEventHandler(async (event) => {
  try {
    // 仅对API路由限流
    if (!event.path.startsWith("/api/")) return;

    // 排除预渲染请求
    const userAgent = getHeader(event, "user-agent") || "";
    if (userAgent.includes("Prerender")) return;

    const headers = getRequestHeaders(event);
    const ip =
      headers["x-forwarded-for"]?.split(",")[0].trim() ||
      (event.node.req.socket.remoteAddress as string);
    await rateLimiter.consume(ip);
    return;
  } catch (err) {
    const res = err as RateLimiterRes;
    setResponseStatus(event, 429);
    return {
      code: 429,
      message: "请求过于频繁",
      remaining: res.remainingPoints,
      reset: Math.ceil(res.msBeforeNext / 1000),
    };
  }
});

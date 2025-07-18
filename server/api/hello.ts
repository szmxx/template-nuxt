// server/api/hello.ts
export default defineEventHandler((_event) => {
  return {
    message: 'Hello from the Nuxt server API!'
  }
})

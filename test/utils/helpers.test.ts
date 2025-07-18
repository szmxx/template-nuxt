import { describe, it, expect } from 'vitest'

// 创建一些工具函数用于测试
export const formatDate = (date: Date | string, locale: string = 'zh-CN'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale)
}

export const formatCurrency = (amount: number, currency: string = 'CNY'): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency
  }).format(amount)
}

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

describe('工具函数测试', () => {
  describe('formatDate', () => {
    it('应该正确格式化日期', () => {
      const date = new Date('2024-01-01')
      const formatted = formatDate(date)
      expect(formatted).toBe('2024/1/1')
    })

    it('应该正确处理字符串日期', () => {
      const formatted = formatDate('2024-12-25')
      expect(formatted).toBe('2024/12/25')
    })

    it('应该支持不同的语言环境', () => {
      const date = new Date('2024-01-01')
      const formatted = formatDate(date, 'en-US')
      expect(formatted).toBe('1/1/2024')
    })
  })

  describe('formatCurrency', () => {
    it('应该正确格式化人民币', () => {
      const formatted = formatCurrency(1234.56)
      expect(formatted).toBe('¥1,234.56')
    })

    it('应该支持不同货币', () => {
      const formatted = formatCurrency(1234.56, 'USD')
      expect(formatted).toContain('1,234.56')
    })

    it('应该正确处理整数', () => {
      const formatted = formatCurrency(1000)
      expect(formatted).toBe('¥1,000.00')
    })
  })

  describe('validateEmail', () => {
    it('应该验证有效的邮箱地址', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('user+tag@example.org')).toBe(true)
    })

    it('应该拒绝无效的邮箱地址', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('test.example.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('generateId', () => {
    it('应该生成指定长度的 ID', () => {
      const id = generateId(10)
      expect(id).toHaveLength(10)
    })

    it('应该生成默认长度的 ID', () => {
      const id = generateId()
      expect(id).toHaveLength(8)
    })

    it('应该生成不同的 ID', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('应该只包含字母和数字', () => {
      const id = generateId(100)
      expect(id).toMatch(/^[A-Za-z0-9]+$/)
    })
  })

  describe('clamp', () => {
    it('应该限制值在范围内', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('应该处理边界值', () => {
      expect(clamp(0, 0, 10)).toBe(0)
      expect(clamp(10, 0, 10)).toBe(10)
    })

    it('应该处理负数范围', () => {
      expect(clamp(-5, -10, -1)).toBe(-5)
      expect(clamp(-15, -10, -1)).toBe(-10)
      expect(clamp(0, -10, -1)).toBe(-1)
    })
  })

  describe('debounce', () => {
    it('应该延迟函数执行', async () => {
      let callCount = 0
      const fn = () => callCount++
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      expect(callCount).toBe(0)

      await new Promise(resolve => setTimeout(resolve, 150))
      expect(callCount).toBe(1)
    })

    it('应该传递正确的参数', async () => {
      let lastArgs: unknown[] = []
      const fn = (...args: unknown[]) => {
        lastArgs = args
      }
      const debouncedFn = debounce(fn, 50)

      debouncedFn('test', 123)
      
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(lastArgs).toEqual(['test', 123])
    })
  })
})
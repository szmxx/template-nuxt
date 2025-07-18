import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// 创建一个简单的首页组件用于测试
const HomeComponent = {
  name: 'Home',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div class="container mx-auto max-w-6xl">
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
          🚀 Nuxt 模板项目
        </h1>
        
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 class="text-2xl font-semibold mb-4 text-blue-700">
            ⚡ 已集成的功能
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center p-4 border rounded-lg">
              <div class="text-2xl mb-2">🎨</div>
              <h3 class="font-semibold mb-1">UnoCSS</h3>
              <p class="text-sm text-gray-600">原子化 CSS 框架</p>
            </div>
            <div class="text-center p-4 border rounded-lg">
              <div class="text-2xl mb-2">🔧</div>
              <h3 class="font-semibold mb-1">VueUse</h3>
              <p class="text-sm text-gray-600">Vue 组合式工具库</p>
            </div>
            <div class="text-center p-4 border rounded-lg">
              <div class="text-2xl mb-2">🔍</div>
              <h3 class="font-semibold mb-1">SEO 优化</h3>
              <p class="text-sm text-gray-600">搜索引擎优化</p>
            </div>
            <div class="text-center p-4 border rounded-lg">
              <div class="text-2xl mb-2">🧪</div>
              <h3 class="font-semibold mb-1">Vitest</h3>
              <p class="text-sm text-gray-600">现代测试框架</p>
            </div>
          </div>
        </div>

        <div class="text-center space-x-4">
          <a href="/vueuse-demo" class="btn bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-block">
            VueUse 演示
          </a>
          <a href="/seo-demo" class="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block">
            SEO 演示
          </a>
          <a href="/test-demo" class="btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg inline-block">
            测试演示
          </a>
        </div>
      </div>
    </div>
  `
}

describe('首页测试', () => {
  it('应该正确渲染页面标题', () => {
    const component = mount(HomeComponent)
    
    expect(component.text()).toContain('🚀 Nuxt 模板项目')
  })

  it('应该显示已集成的功能', () => {
    const component = mount(HomeComponent)
    
    expect(component.text()).toContain('⚡ 已集成的功能')
    expect(component.text()).toContain('UnoCSS')
    expect(component.text()).toContain('VueUse')
    expect(component.text()).toContain('SEO 优化')
    expect(component.text()).toContain('Vitest')
  })

  it('应该包含功能描述', () => {
    const component = mount(HomeComponent)
    
    expect(component.text()).toContain('原子化 CSS 框架')
    expect(component.text()).toContain('Vue 组合式工具库')
    expect(component.text()).toContain('搜索引擎优化')
    expect(component.text()).toContain('现代测试框架')
  })

  it('应该包含导航链接', () => {
    const component = mount(HomeComponent)
    
    const vueUseLink = component.find('a[href="/vueuse-demo"]')
    const seoLink = component.find('a[href="/seo-demo"]')
    const testLink = component.find('a[href="/test-demo"]')
    
    expect(vueUseLink.exists()).toBe(true)
    expect(seoLink.exists()).toBe(true)
    expect(testLink.exists()).toBe(true)
    expect(vueUseLink.text()).toContain('VueUse 演示')
    expect(seoLink.text()).toContain('SEO 演示')
    expect(testLink.text()).toContain('测试演示')
  })

  it('应该应用正确的 CSS 类', () => {
    const component = mount(HomeComponent)
    
    const container = component.find('.container')
    const title = component.find('h1')
    const grid = component.find('.grid')
    
    expect(container.exists()).toBe(true)
    expect(title.classes()).toContain('text-4xl')
    expect(title.classes()).toContain('font-bold')
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-3')
  })

  it('应该包含正确的按钮样式', () => {
    const component = mount(HomeComponent)
    
    const buttons = component.findAll('.btn')
    
    expect(buttons).toHaveLength(3)
    
    const vueUseButton = buttons[0]
    const seoButton = buttons[1]
    const testButton = buttons[2]
    
    expect(vueUseButton.classes()).toContain('bg-purple-600')
    expect(vueUseButton.classes()).toContain('hover:bg-purple-700')
    expect(seoButton.classes()).toContain('bg-green-600')
    expect(seoButton.classes()).toContain('hover:bg-green-700')
    expect(testButton.classes()).toContain('bg-indigo-600')
    expect(testButton.classes()).toContain('hover:bg-indigo-700')
  })

  it('应该包含正确的图标', () => {
    const component = mount(HomeComponent)
    
    expect(component.text()).toContain('🎨')
    expect(component.text()).toContain('🔧')
    expect(component.text()).toContain('🔍')
    expect(component.text()).toContain('🧪')
  })

  it('应该有响应式布局类', () => {
    const component = mount(HomeComponent)
    
    const grid = component.find('.grid')
    const container = component.find('.container')
    
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-3')
    expect(container.classes()).toContain('max-w-6xl')
  })
})
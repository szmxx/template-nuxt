import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// 创建一个简单的按钮组件用于测试
const Button = defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  template: `
    <button 
      :class="[
        'btn',
        'btn-' + type,
        { 'btn-disabled': disabled }
      ]"
      :disabled="disabled"
      @click="$emit('click', $event)"
    >
      <slot />
    </button>
  `
})

describe('Button 组件', () => {
  it('应该正确渲染默认按钮', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '点击我'
      }
    })

    expect(wrapper.text()).toBe('点击我')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-primary')
    expect(wrapper.attributes('disabled')).toBeUndefined()
  })

  it('应该正确应用 type 属性', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'secondary'
      },
      slots: {
        default: '次要按钮'
      }
    })

    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).not.toContain('btn-primary')
  })

  it('应该正确处理 disabled 状态', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: '禁用按钮'
      }
    })

    expect(wrapper.classes()).toContain('btn-disabled')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('应该正确触发点击事件', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: '点击我'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('禁用状态下不应该触发点击事件', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: '禁用按钮'
      }
    })

    await wrapper.trigger('click')
    // 由于按钮被禁用，点击事件不应该被触发
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('应该正确渲染插槽内容', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '<span class="icon">🚀</span> 启动'
      }
    })

    expect(wrapper.html()).toContain('<span class="icon">🚀</span> 启动')
  })
})
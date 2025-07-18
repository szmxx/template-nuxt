export const useCounterStore = defineStore("counter", () => {
  // 状态
  const count = ref(0);
  const name = ref("Counter Store");

  // 计算属性
  const doubleCount = computed(() => count.value * 2);
  const isEven = computed(() => count.value % 2 === 0);

  // 动作
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = 0;
  }

  function setCount(value: number) {
    count.value = value;
  }

  function setName(newName: string) {
    name.value = newName;
  }

  return {
    // 状态
    count,
    name,
    // 计算属性
    doubleCount,
    isEven,
    // 动作
    increment,
    decrement,
    reset,
    setCount,
    setName,
  };
});

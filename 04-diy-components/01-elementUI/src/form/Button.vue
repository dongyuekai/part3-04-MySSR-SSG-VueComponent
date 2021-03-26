<template>
  <div>
    <button @click="handleClick">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "lgButton",
  methods: {
    handleClick(evt) {
      debugger
      this.$emit("click", evt);
      evt.preventDefault(); // 阻止默认提交表单行为
    },
  },
};
</script>

<style>
</style>
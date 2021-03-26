<template>
  <div>
    <steps :count="count" :active="active"></steps>
    <button @click="nextStep">下一步</button>
  </div>
</template>

<script>
import steps from "./Steps.vue";
export default {
  name: "",
  components: {
    steps,
  },
  data() {
    return {
      count: 4,
      active: 1,
    };
  },
  methods: {
    nextStep() {
      this.active++;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
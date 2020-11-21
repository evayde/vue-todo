<template>
  <div class="app-bar">
    <slot />
  </div>
</template>

<style scoped>
.app-bar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: #fff;
  background: #46d;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppBar"
});
</script>

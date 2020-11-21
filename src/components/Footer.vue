<template>
  <div class="footer">
    <slot />
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  padding: 1rem 0;
  align-items: center;
  justify-content: center;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer"
});
</script>

<template>
  <div class="month-year-container">
    <slot />
  </div>
</template>

<style scoped>
.month-year-container {
  padding: 1rem 1rem 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MonthYearContainer"
});
</script>

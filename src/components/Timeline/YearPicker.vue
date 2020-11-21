<template>
  <div class="year-container">
    <i class="pi pi-chevron-left" @click="prevYear" />
    <strong>{{ day.getFullYear() }}</strong>
    <i class="pi pi-chevron-right" @click="nextYear" />
  </div>
</template>

<style scoped>
.year-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}

.year-container > strong {
  text-align: center;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "YearPicker",
  computed: mapState(["day"]),
  methods: mapActions(["prevYear", "nextYear"])
});
</script>

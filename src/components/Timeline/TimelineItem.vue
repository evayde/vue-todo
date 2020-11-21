<template>
  <div class="timeline-item" :class="{ today: this.isToday }">
    <strong>{{ weekday }}</strong>
    <strong>{{ date }}</strong>
  </div>
</template>

<style scoped>
.timeline-item {
  padding: 1rem 1.5rem;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #000;
  opacity: 0.15;
  border-radius: 1rem;
  margin: 0 0.25rem;
}

.timeline-item.active {
  color: #46d;
  background: #fff;
  opacity: 1;
}

.timeline-item.today:not(.active) {
  background: #f44;
  opacity: 1;
}

.timeline-item.active > *:first-child {
  color: #000;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "TimelineItem",
  props: ["day"],
  computed: {
    ...mapState(["language"]),
    isToday() {
      const formatDate = (date: Date) => {
        return date.toLocaleDateString((this.language as unknown) as string, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
      };
      const dayString = formatDate(this.day);
      const todayString = formatDate(new Date());

      return dayString === todayString;
    },
    weekday() {
      const today = (this as any).day as Date;
      const lang = (this.language as unknown) as string;
      return today.toLocaleDateString(lang, { weekday: "short" });
    },
    date() {
      const today = (this as any).day as Date;
      return today.getDate();
    }
  }
});
</script>

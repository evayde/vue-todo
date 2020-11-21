<template>
  <div class="timeline-container">
    <slot />
  </div>
</template>

<style scoped>
.timeline-container {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 1rem;
  scroll-padding: 0 1rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.timeline-container::after {
  content: " ";
  min-width: 1rem;
}

.timeline-container::-webkit-scrollbar {
  display: none;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "TimelineContainer",
  methods: {
    scrollToActive() {
      const activeItem = document.querySelector(
        ".timeline-container > .timeline-item.active"
      );
      const container = document.querySelector(".timeline-container");

      const width = activeItem?.getBoundingClientRect().width || 0;
      const start = activeItem?.getBoundingClientRect().left || 0;
      const left = container?.scrollLeft || 0;

      if (container) {
        container.scrollTo({
          left: start + left - width / 2,
          behavior: "smooth"
        });
      }
    }
  },
  computed: mapState(["day", "language"]),
  mounted() {
    this.scrollToActive();
  },
  updated() {
    this.scrollToActive();
  }
});
</script>

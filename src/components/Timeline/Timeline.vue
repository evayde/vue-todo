<template>
  <div class="timeline">
    <MonthYearContainer>
      <Dropdown
        v-model="selectedMonth"
        :options="months"
        placeholder="Select a month"
        @change="changeMonth"
      />
      <YearPicker />
    </MonthYearContainer>
    <TimelineContainer>
      <TimelineItem
        v-for="d in days"
        :key="d"
        :day="new Date(day.getFullYear(), day.getMonth(), d)"
        :class="{ active: day.getDate() === d }"
        @click="setDay({ day: d })"
      />
    </TimelineContainer>
  </div>
</template>

<style scoped>
.timeline {
  width: 100%;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import TimelineItem from "./TimelineItem.vue";
import MonthYearContainer from "./MonthYearContainer.vue";
import TimelineContainer from "./TimelineContainer.vue";
import YearPicker from "./YearPicker.vue";
import { State } from "@/store";

export default defineComponent({
  name: "Timeline",
  components: {
    TimelineItem,
    YearPicker,
    MonthYearContainer,
    TimelineContainer
  },
  computed: {
    ...mapState(["day", "language"]),
    days() {
      const day = this.day as Date;
      return [
        ...new Array(
          new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate()
        )
      ].map((_d, i) => i + 1);
    }
  },
  data() {
    const months: string[] = [];
    const state = (this as any).$store.state as typeof State;

    for (let i = 1; i <= 12; i++) {
      months.push(
        new Date(2020, i, 0).toLocaleDateString(state.language, {
          month: "long"
        })
      );
    }

    return {
      months,
      selectedMonth: ""
    };
  },
  methods: {
    ...mapMutations(["setDay", "setMonth"]),
    changeMonth(e: { originalEvent: Event; value: string }) {
      const monthIndex = this.months.findIndex(m => m === e.value);

      this.setMonth({ month: monthIndex });
    }
  },
  mounted() {
    this.selectedMonth = (this.day as Date).toLocaleDateString(this.language, {
      month: "long"
    });
  },
  updated() {
    this.selectedMonth = (this.day as Date).toLocaleDateString(this.language, {
      month: "long"
    });
  }
});
</script>

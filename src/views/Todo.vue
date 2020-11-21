<template>
  <AppBar>
    <Button
      icon="pi pi-arrow-left"
      class="p-button-text button"
      v-ripple
      @click="$router.push('/')"
    />
  </AppBar>
  <div class="page">
    <div v-if="todo">
      <h2>{{ todo.title }}</h2>
      <div class="todo-card content">
        <div class="icon p-ripple" v-ripple>
          <i class="pi pi-calendar" />
        </div>
        <div class="date-time">
          {{ date }}<br />{{ time }}
        </div>
      </div>

      <h3>Agenda</h3>
      <div class="todo-agenda">
        <SubtaskItem
          v-for="subtask in todo.subtasks"
          :key="subtask.id"
          :todo="todo"
          :subtask="subtask"
        />
      </div>
    </div>
    <div v-if="!todo">
      <h2>Ooopsie!</h2>
      <p>No Todo found!</p>
    </div>
  </div>
</template>

<style scoped>
.content {
  background-color: rgba(0, 0, 255, 0.025);
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  padding: 1rem;
}

.content > .date-time {
  align-items: center;
  display: flex;
}

.icon {
  align-items: center;
  background-color: rgba(166, 0, 0, 0.15);
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  max-height: 3rem;
  padding: 0.75rem;
  width: 3rem;
}

.icon > i {
  color: rgb(255, 100, 100);
  font-size: 1.5rem;
}

.app-bar {
  padding: 0 0.33rem;
}

.button,
.button:focus,
.button:hover,
.button:enabled:hover {
  box-shadow: none;
  color: #fff;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import AppBar from "@/components/AppBar.vue";
import SubtaskItem from "@/components/SubtaskItem.vue";
import { State, Todo } from "@/store/index";

export default defineComponent({
  name: "Todo",
  components: {
    AppBar,
    SubtaskItem
  },
  computed: {
    ...mapState({
      todo(state: typeof State) {
        return state.todos.find(
          t => t.id === Number.parseInt(this.$route.params.id + "")
        );
      },
      language(state: typeof State) {
        return state.language;
      },
    }),
    date() {
      if (!this.todo) {
        return "";
      }

      return (this.todo as unknown as Todo).date.toLocaleDateString(this.language as unknown as string, {
        weekday: "long",
        day: "2-digit",
        month: "short"
      });
    },
    time() {
      if (!this.todo) {
        return "";
      }

      const todo = this.todo as unknown as Todo;

      return ("0" + todo.date.getHours()).substr(-2) + ":" + ("0" + todo.date.getMinutes()).substr(-2);
    },
  },
  methods: mapActions(["setDate", "toggleTodo"]),
  mounted() {
    // ensure that we have the right date when we go back
    if (this.todo) {
      this.setDate({ date: this.todo.date });
    }
  }
});
</script>

<template>
  <div class="todo-item">
    <div @click="toggle" class="time">
      <strong>{{ time }}</strong>
      <i :class="{ done: todo.done }" class="pi pi-check" />
    </div>

    <router-link class="content" :to="`/todo/${todo.id}`">
      {{ todo.title }}
    </router-link>
  </div>
</template>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

.pi-check {
  font-weight: bold;
}

.todo-item,
.time {
  display: flex;
}

.todo-item {
  flex-direction: row;
  margin: 1rem 0;
}

.time {
  align-items: center;
  flex-direction: column;
  padding: 1rem;
}

.time > * {
  margin: 0;
}

.time > *:first-child {
  font-size: 0.85rem;
}

.time > .done {
  color: #4e2;
}

.content {
  background-color: rgba(0, 0, 255, 0.025);
  border-radius: 1rem;
  flex: 1;
  padding: 1rem;
}
</style>

<script lang="ts">
import { Todo } from "@/store";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "TodoItem",
  props: ["todo"],
  methods: {
    ...mapActions(["toggleTodo"]),
    toggle() {
      this.toggleTodo({ id: this.todo.id });
    }
  },
  computed: {
    ...mapState(["language"]),
    time() {
      const todo = this.todo as Todo;
      const lang = (this.language as unknown) as string;

      return todo.date.toLocaleString(lang, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    }
  }
});
</script>

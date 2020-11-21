<template>
  <div class="subtask-item" @click="toggle">
    <div class="status">
      <i :class="{ done: subtask.done }" class="pi pi-check" />
    </div>

    <div class="content">
      {{ subtask.title }}
    </div>
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

.subtask-item,
.status {
  display: flex;
}

.subtask-item {
  flex-direction: row;
  margin: 1rem 0;
}

.status {
  align-items: center;
  flex-direction: column;
  padding: 1rem;
}

.status > * {
  margin: 0;
}

.status > *:first-child {
  font-size: 0.85rem;
}

.status > .done {
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
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "SubtaskItem",
  props: ["todo", "subtask"],
  methods: {
    ...mapActions(["toggleTodoSubtask"]),
    toggle() {
      this.toggleTodoSubtask({
        todoId: this.todo.id,
        subtaskId: this.subtask.id
      });
    }
  }
});
</script>

<template>
  <div class="todo-list">
    <h3>Todos</h3>
    <div v-if="filteredTodos.length === 0">
      No Todos found. Add something to do using the button below.
    </div>
    <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoItem from "@/components/TodoItem.vue";
import { mapState } from "vuex";
import { State } from "@/store";

export default defineComponent({
  name: "TodoList",
  components: {
    TodoItem
  },
  computed: {
    ...mapState(["todos", "day"]),
    filteredTodos(): typeof State.todos {
      return (this.todos as typeof State.todos).filter(
        t => t.date.toLocaleDateString() === this.day.toLocaleDateString()
      );
    }
  }
});
</script>

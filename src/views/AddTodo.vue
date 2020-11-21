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
    <h2>Add a new Todo</h2>
    <div class="form-items">
      <div class="p-inputgroup">
        <Button label="Title" />
        <InputText
          v-model="newTodo.title"
          placeholder="What needs to be done today?"
        />
      </div>
      <div class="p-inputgroup">
        <Button label="Subtasks" />
        <InputText
          v-model="subtasks"
          placeholder="Comma separated list of tasks"
        />
      </div>
      <Calendar v-model="newTodo.date" :showTime="true" :touchUI="true" />
    </div>
  </div>
  <Footer>
    <Button label="Add" @click="handleAddTodo" />
  </Footer>
</template>

<style scoped>
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

.form-items > * {
  margin-bottom: 1rem;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "AddTodo",
  components: {
    AppBar,
    Footer
  },
  data() {
    return {
      subtasks: "",
      newTodo: {
        title: "",
        date: new Date()
      }
    };
  },
  computed: mapState(["day", "todos"]),
  methods: {
    ...mapActions(["setDate", "addTodo"]),
    handleAddTodo() {
      const subtasks = this.subtasks
        .split(",")
        .filter(e => e?.trim() !== "")
        .map((e, i) => ({
          id: i,
          title: e.trim(),
          done: false,
          date: this.newTodo.date
        }));
      this.addTodo({
        ...this.newTodo,
        id: this.todos.length,
        done: false,
        subtasks
      });

      (this.subtasks = ""),
        (this.newTodo = {
          title: "",
          date: this.day
        });
    }
  },
  mounted() {
    this.newTodo.date = this.day;
  }
});
</script>

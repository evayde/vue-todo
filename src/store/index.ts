import { createStore } from "vuex";
import { Plugins } from "@capacitor/core";

export interface Doable {
  title: string;
  done: boolean;
}

export interface SubTask extends Doable {
  id: number;
}

export interface Todo extends Doable {
  id: number;
  date: Date;
  subtasks?: SubTask[];
}

export const State = {
  todos: [] as Todo[],
  day: new Date(),
  language: "en-US"
};

const store = createStore({
  state: State,
  mutations: {
    prevYear(state) {
      state.day = new Date(state.day.setFullYear(state.day.getFullYear() - 1));
    },
    nextYear(state) {
      state.day = new Date(state.day.setFullYear(state.day.getFullYear() + 1));
    },
    async toggleTodo(state, { id }) {
      state.todos = state.todos.map(t => {
        if (t.id === id) {
          t.done = !t.done;
        }

        return t;
      });

      await Plugins.Storage.set({
        key: "todos",
        value: JSON.stringify(state.todos)
      });
    },
    async toggleTodoSubtask(state, { todoId, subtaskId }) {
      state.todos = state.todos.map(t => {
        if (t.id === todoId && t.subtasks) {
          t.subtasks.map(sub => {
            if (sub.id === subtaskId) {
              sub.done = !sub.done;
            }

            return sub;
          });
        }
        return t;
      });

      await Plugins.Storage.set({
        key: "todos",
        value: JSON.stringify(state.todos)
      });
    },
    setDay(state, { day }) {
      state.day = new Date(state.day.setDate(day));
    },
    setMonth(state, { month }) {
      state.day = new Date(state.day.setMonth(month));
    },
    setDate(state, { date }) {
      state.day = new Date(date);
    },
    async addTodo(state, todo) {
      state.todos = [...state.todos, todo];
      await Plugins.Storage.set({
        key: "todos",
        value: JSON.stringify(state.todos)
      });
    },
    addTodos(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    prevYear({ commit }) {
      commit("prevYear");
    },
    nextYear({ commit }) {
      commit("nextYear");
    },
    toggleTodo({ commit }, payload) {
      commit("toggleTodo", payload);
    },
    toggleTodoSubtask({ commit }, payload) {
      commit("toggleTodoSubtask", payload);
    },
    setDay({ commit }, payload) {
      commit("setDay", payload);
    },
    setMonth({ commit }, payload) {
      commit("setMonth", payload);
    },
    setDate({ commit }, payload) {
      commit("setDate", payload);
    },
    addTodo({ commit }, payload) {
      commit("addTodo", payload);
    },
    addTodos({ commit }, payload) {
      commit("addTodos", payload);
    }
  },
  modules: {}
});

(() => {
  Plugins.Storage.get({ key: "todos" }).then(res => {
    if (res.value) {
      const todos = JSON.parse(res.value, (key, value) => {
        if ("date" === key) {
          return new Date(value);
        }
        return value;
      });
      store.dispatch("addTodos", todos);
    }
  });
})();

export default store;

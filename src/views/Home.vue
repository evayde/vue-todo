<template>
  <AppBar>
    <Timeline />
  </AppBar>
  <div class="page">
    <TodoList />
  </div>
  <Footer>
    <Button
      class="p-button-rounded"
      icon="pi pi-plus"
      v-ripple
      @click="$router.push('/todo/add')"
    />
  </Footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
import TodoList from "@/components/TodoList.vue";
import Timeline from "@/components/Timeline/Timeline.vue";

export default defineComponent({
  name: "Home",
  components: {
    TodoList,
    AppBar,
    Timeline,
    Footer
  }
});
</script>

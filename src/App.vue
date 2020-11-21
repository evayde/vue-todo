<template>
  <router-view />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  user-select: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page {
  padding: 1rem;
  flex: 1;
}
</style>

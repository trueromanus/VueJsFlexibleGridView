<template>
  <div id="app">
    <SimpleGridView></SimpleGridView>
  </div>
</template>

<script>
import SimpleGridView from './components/SimpleGridView.vue'

export default {
  components: {
    SimpleGridView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  width: 500px;  
}
</style>

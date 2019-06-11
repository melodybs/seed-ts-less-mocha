<template>
  <ErrorBoundary id="app">
    <router-view />
  </ErrorBoundary>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'App' })
export default class App extends Vue {}
</script>
<!--
<script>
export default {
  name: 'App'
}
</script>
-->

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

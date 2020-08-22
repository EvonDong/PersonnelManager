<template>
  <div id="app">
    <div id="nav">
      <Header />
      <ProfileComponent />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import ProfileComponent from './components/ProfileComponent.vue'

export default {
  name: 'App',
  components: {
    Header,
    ProfileComponent
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>



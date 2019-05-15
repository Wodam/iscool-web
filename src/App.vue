<template>
  <div id="app" class="d-flex">
		<SideBar></SideBar>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import { routes } from './routes';
import SideBar from './components/SideBar.vue';

export default {
  name: "App",
  components: { SideBar },
  data(){
    return {
      routes
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700');

#app {
  background-color: whitesmoke;
	font-family: 'Roboto Slab', serif;
}

.container {
	margin-left: 250px !important;
}
</style>

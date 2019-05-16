<template>
  <div id="app" class="d-flex">
		<SideBar></SideBar>
    <router-view class="main"></router-view>
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
/* --- FONTS --- */
/* TODO: change to local files */
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');

/* --- GLOBALS --- */
/* ~ Rounded ~ */
.__rounded-100 {
  border-radius: 100% !important
}
.__rounded {
  border-radius: 5px !important
}
.__rounded-tl {
  border-top-left-radius: 5px !important
}
.__rounded-tr {
  border-top-right-radius: 5px !important
}
.__rounded-bl {
  border-bottom-left-radius: 5px !important
}
.__rounded-br {
  border-bottom-right-radius: 5px !important
}

/* --- RESETS --- */
a:not([aria-disabled="true"]) {
	color: inherit !important;
}

/* --- OTHERS --- */
#app {
  background-color: whitesmoke;
	font-family: 'Roboto', sans-serif;
}

.main {
	/* margin-left: 250px !important; */
}

.btn {
	border-radius: 5px !important
}

/* Page Header */
.page-header {
	height: 15vh;
	width: 100%;
	background-color: white;
	position: relative;
}

.page-title {
	font-weight: 500;
	color: #4C5454;
	font-size: 3rem
}

/* Add button */
.page-header .add {
	position: absolute;
	color: #1EA896;
	border: 2px solid #1EA896;
	font-weight: 500;
	font-size: 1.1rem;

	display: flex;
	justify-content: center;
	align-items: center;
}

.page-header .add svg {
	fill: #1EA896;
	margin-right: 6px
}

.page-header .add:hover {
	background-color: #1EA896;
	color: white;
}

.page-header .add:hover svg{
	fill: white;
}
</style>

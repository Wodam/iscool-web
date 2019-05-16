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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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

/* ~ Card ~ */
.__card {
	background-color: #fff;
	border-radius: 5px
}

/* --- RESETS --- */
a:not([aria-disabled="true"]) {
	color: inherit !important;
}

/* --- OTHERS --- */
#app {
	min-height: 100vh;
  background-color: whitesmoke;
	font-family: 'Roboto', sans-serif;
}

.main {
	margin-left: 200px !important;
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
	border-color: #1EA896;
	font-size: 1.1rem;
}

.page-header .add svg {
	fill: #1EA896;
}

.page-header .add:hover {
	background-color: #1EA896;
}


/* Search button */
.__action.search {
	background-color: #1EA0A8;
	color: white
}
.__action.search svg {
	fill: #fff;
}

/* __actions buttons */
.action {
	cursor: pointer;
}

.__action {
	font-weight: 500 !important;

	display: flex;
	justify-content: center;
	align-items: center;
}
.__action svg {
	margin-right: 6px
}
.__action:hover {
	color: white !important;
}
.__action:hover svg{
	fill: white;
}

/* __action outline */
.__action-outline {
	border-width: 2px !important;
	border-style: solid;
}
</style>

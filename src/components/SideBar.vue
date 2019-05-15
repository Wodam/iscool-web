<template lang="html">
	<div class="parent" ref="parent" >
		<vs-sidebar reduce-not-rebound class="sidebar-content" :reduce="reduce" static-position :parent="parentSidebar" :hidden-background="true" default-index="" color="success" spacer>
			<!-- <div class="wrapper" @mouseover="reduce=false" @mouseleave="reduce=true"> -->
				<div class="header-sidebar" slot="header">
					<vs-avatar size="70px"/>
					<h4 class="py-1" v-show="!reduce">
	          {{ 'Bruno Marini' }}
	          <!-- <vs-button color="primary" icon="more_horiz" type="flat"></vs-button> -->
	        </h4>
				</div>
				<vs-divider icon="attach_file" position="left">
					Principal
				</vs-divider>

				<vs-sidebar-item index="1" icon="list_alt" href="questions">
				 Questões
				</vs-sidebar-item>

				<vs-sidebar-item index="6" icon="pages" href="exams">
					Avaliações
				</vs-sidebar-item>

				<div class="footer-sidebar" slot="footer">
					<!-- <vs-button icon="settings" color="primary" type="border"></vs-button> -->
					<vs-button icon="menu" @click="reduce=!reduce" title="Toggle menu" color="dark" :type="reduce ? 'border' : 'filled'"></vs-button>
				</div>
			<!-- </div> -->
		</vs-sidebar>
  </div>
</template>

<script>
export default {
	name: "SideBar",
  data(){
    return {
			active:true,
	    reduce: false,
			parentSidebar: this.$refs.parent
    }
  },
	mounted () {
	}
}
</script>

<style lang="css">
.parent {
  overflow: hidden;
	width: 100%;
	max-width: 250px;
  height: 100vh;
  position: fixed;
}
.wrapper {
	height: 100%;
	width: 100%
}
.vs-content-sidebar, .vs-sidebar {
	height: 100%;
}
.vs-sidebar {
	transition: all .4s !important;
}
.vs-sidebar.vs-sidebar-reduce:hover:not(.vs-sidebar-reduceNotHoverExpand) {
  max-width: 100% !important;
}
.vs-sidebar.vs-sidebar-reduce {
	border-radius: 0 !important
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.header-sidebar h4 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.header-sidebar h4 > button {
  margin-left: 10px;
}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.footer-sidebar > button {
  border: 0px solid rgba(0,0,0,0) !important;
  border-left: 1px solid rgba(0,0,0,0.07) !important;
  border-radius: 0px !important;
}
</style>

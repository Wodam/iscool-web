<template lang="html">
	<div class="side-bar">
		<header class="p-3 d-flex justify-content-center align-items-center">
			<img class="h-100" src="../assets/img/logo.svg" alt="">
		</header>
		<div class="wrapper">
			<nav role="navigation">
				<ul class="nav flex-column">
				  <li class="nav-item">
				    <router-link class="nav-link" to="exams">Avaliações</router-link>
				  </li>
				  <li class="nav-item">
				    <router-link class="nav-link" to="questions">Questões</router-link>
				  </li>
				  <li class="nav-item">
				    <router-link class="nav-link disabled" tabindex="-1" aria-disabled="true" to="answers_sheets">Gabaritos</router-link>
				  </li>
				  <li class="nav-item">
				    <router-link class="nav-link disabled" tabindex="-1" aria-disabled="true" to="notes">Notas</router-link>
				  </li>
				</ul>
			</nav>
			<footer class="user w-100">
				<div class="container-fluid h-100 w-100">
					<div class="row h-100">
						<div class="col-sm-4 p-0 h-100">
							<div class="avatar __rounded-tr p-2 h-100 d-flex justify-content-center align-items-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
									<path d="M0 0h24v24H0z" fill="none"/></svg>
							</div>
						</div>
						<div class="col-sm-8 p-0">
							<div class="name w-100 h-100 d-flex justify-content-center align-items-center">
								{{ user.name }}
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
export default {
	name: "SideBar",
  data(){
    return {
			user: {
				name: 'Bruno Marini'
			}
    }
  }
}
</script>

<style lang="css" scoped>
.side-bar {
	max-width: 200px;
	position: fixed;
	background-color: #4C5454;
	/* box-shadow: 5px 0 0 rgba(0,0,0,0.07) */
}
header {
	height: 15vh;
	background-color: #fff;
	/* background-image: url('../assets/img/paper.jpg'); */
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center
}
.wrapper {
	position: relative;
	height: 85vh;
	border-left: 5px solid white
}
nav {
	color: white;
	font-size: 1.2rem;
	font-weight: 400;
}
.nav-item {
	transition: .3s
}
.nav-item:hover {
	background-color: rgba(0,0,0,0.3);
}
.active {
	font-weight: bold;
	color: #4C5454 !important;
	background-color: white;
}
.user	{
	height: 50px;
	position: absolute;
	bottom: 0;
	left: 0;
	color: white
}
.avatar {
	background-color: white;
}
.avatar svg {
	height: 100%;
	fill: #4C5454;
}
.name {
	font-weight: 300;
	font-size: 1.2rem
}
</style>

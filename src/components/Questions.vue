<template lang="html">
	<div class="questions">
		<header class="page-header px-5 d-flex justify-content-end align-items-center">
			<h1 class="page-title text-center">Questões</h1>
			<button class="__action __action-outline add btn" type="button">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
				Adicionar
			</button>
		</header>
		<article class="container">
			<createQuestion class="mb-3" @question-saved='refresh'></createQuestion>
			<form class="__card p-3">
			  <div class="form-row">
			    <div class="col-10">
			      <input type="text" class="__rounded form-control h-100" placeholder="Digite algum texto...">
			    </div>
			    <div class="col-2 d-flex align-items-end">
						<button class="__action search btn" type="button">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
								<path d="M0 0h24v24H0z" fill="none"/>
							</svg>
							Pesquisar
						</button>
			    </div>
			  </div>
			</form>
			<div class="wrapper mt-4">
				<div class="question __card mt-3" v-for="(question, index) in questions" :key="question.id_question">
					<div class="question-header d-flex justify-content-between align-items-center">
						<div class="d-flex">
							<div class="action link __rounded-tl">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="M0 0h24v24H0z" fill="none"/>
									<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
								</svg>
							</div>
							<div class="action copy">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path fill="none" d="M0 0h24v24H0z"/>
									<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"/>
								</svg>
							</div>
							<div class="action edit __rounded-br" @click="editQuestion(index)">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
									<path d="M0 0h24v24H0z" fill="none"/>
								</svg>
							</div>
						</div>
						<div class="action delete __rounded-tr" @click="deleteQuestion(question.id_question)">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/>
								<path fill="none" d="M0 0h24v24H0V0z"/>
							</svg>
						</div>
					</div>
					<div class="question-body p-4">
						<div class="question-text">
							{{question.text_question}}
							<!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Massa tempor nec feugiat nisl pretium fusce. Accumsan sit amet nulla facilisi. Magna etiam tempor orci eu lobortis elementum. -->
						</div>
						<hr class="question-divider">
						<div class="question-choices">
							<div class="row justify-content-center">
								<div class="col-sm-12 col-md-6 col-lg-2 text-center" v-for="(choice, index) in question.choices" :key="choice.id_choice">
									<span :class="choice.trueness_choice == 'v' ? 'active' : ''">{{letters[index]}})</span>
									{{choice.description_choice}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	</div>
</template>
<script>
import axios from 'axios';
import createQuestion from './Questions/create.vue';

export default {
  name: "Questions",
	components: { createQuestion },
  data() {
    return {
			questions: [],
			letters: ['A', 'B', 'C', 'D', 'E']
		}
  },
	created: function() {
		axios.defaults.baseURL = 'http://localhost:3000';
		this.refresh();
	},
	methods: {
		async refresh () {
			// Reset
			this.questions = [];

			// New
			let questions;
      await axios.get('/api/question').then(async response => {
				questions = response.data;

				for (let question of questions) {
					await axios.get('/api/choice', {params: {where: {id_question: question.id_question}}}).then(response => {
						question.choices = response.data;
					})
				}
      }).catch((error) => {
        console.log(error)
      })

			this.questions = questions.sort((a,b) => (a.id_question < b.id_question) ? 1 : ((b.id_question < a.id_question) ? -1 : 0));
			console.log("Questions: ", this.questions)
		},
		deleteQuestion (id_question) {
			axios.delete('/api/question/'+id_question).then(_ => {
				this.refresh()
			})
		},
		editQuestion (index) {
			this.copyToForm(index);
		},
		copyToForm (index) {
			console.log(this.questions[index]);
			
		}
	}
}
</script>
<style scoped>
.question {
	color: #4C5454;
}
.question-header {

}
/* Disable "flex: 1 1" wich bootstrap do */
.question-header>* {
	flex: inherit !important
}
.action {
	height: 37px;
	width: 37px;
	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
}

.action svg:not(.delete) {
	fill: white
}

.action.link {
	background-color: #1EA896;
}
.action.copy {
	background-color: #4C5454;
}
.action.edit {
	background-color: #FF715B;
}
.action.delete svg {
	fill: #4C5454;
}

.question-text {
	text-align: justify;
	font-size: 1.1rem;
	font-weight: 400;
}
.question-divider {
	border-top: 1px dashed #4C5454;
}
.question-choices span.active{
	font-weight: 700
}
</style>

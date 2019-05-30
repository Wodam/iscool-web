<template lang="html">
	<div class="exams">
		<header class="page-header px-5 d-flex justify-content-end align-items-center">
			<h1 class="page-title text-center">Avaliações</h1>
			<button class="__action __action-outline add btn" type="button" v-if="!showBaloon" @click="showBaloon = true">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
				Adicionar
			</button>
		</header>
		<article class="container">
			<createExam class="mb-3" v-if="showBaloon"  @cancel="showBaloon = false" @saved='refresh'></createExam>
			<form class="__card p-3">
			  <div class="form-row">
			    <div class="col-12">
			      <input type="text" v-model="searchQuery" class="__rounded form-control form-control-lg h-100" placeholder="Pesquisar uma avaliação...">
			    </div>
			    <!-- <div class="col-2 d-flex align-items-end">
						<button class="__action search btn" type="button">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
								<path d="M0 0h24v24H0z" fill="none"/>
							</svg>
							Pesquisar
						</button>
			    </div> -->
			  </div>
			</form>
			<div class="wrapper mt-4">
				<div class="exam __card mt-3" v-for="(exam, index) in filterItems(exams)" :key="exam.id_test">
					<div class="exam-header d-flex justify-content-between align-items-center">
						<div class="d-flex">
							<!-- <div class="action link __rounded-tl" v-b-modal.linkModal @click="selected = exam.id_test">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="M0 0h24v24H0z" fill="none"/>
									<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
								</svg>
							</div> -->
							<!-- <div class="action copy __rounded-tl">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path fill="none" d="M0 0h24v24H0z"/>
									<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"/>
								</svg>
							</div> -->
							<div class="action edit __rounded-tl __rounded-br" @click="editExam(index)">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
									<path d="M0 0h24v24H0z" fill="none"/>
								</svg>
							</div>
						</div>
						<div class="action delete __rounded-tr" @click="deleteExam(exam.id_test)">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/>
								<path fill="none" d="M0 0h24v24H0V0z"/>
							</svg>
						</div>
					</div>
					<div class="exam-body p-4">
						<h3 class="exam-name">[A{{exam.id_test}}] {{exam.name_test}}</h3>
						<hr class="exam-divider">
						<div class="exam-text">
							{{exam.description_test}}
							<!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Massa tempor nec feugiat nisl pretium fusce. Accumsan sit amet nulla facilisi. Magna etiam tempor orci eu lobortis elementum. -->
						</div>
						<div class="exam-questions" v-if="exam.questions">
							<div class="question __card shadow mt-3" v-for="(question, index) in exam.questions" :key="question.id_question">
								<div class="question-body p-4">
									<div class="question-title mb-4 d-inline-flx p-2 __rounded">
										<h4 class="mb-0">Questão {{index + 1}}</h4>
									</div>
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
					</div>
				</div>
			</div>

			 <b-modal id="linkModal" size="lg" scrollable centered title="Questões Associadas">
				 <!-- <multiselect v-model="linkedSections" placeholder="Fav No Man’s Sky path" label="title" track-by="title" :options="options" :option-height="104" :custom-label="customLabel" :show-labels="false">
			     <template slot="singleLabel" slot-scope="props"><img class="option__image" :src="props.option.img" alt="No Man’s Sky"><span class="option__desc"><span class="option__title">{{ props.option.title }}</span></span></template>
			     <template slot="option" slot-scope="props"><img class="option__image" :src="props.option.img" alt="No Man’s Sky">
			       <div class="option__desc"><span class="option__title">{{ props.option.title }}</span><span class="option__small">{{ props.option.desc }}</span></div>
			     </template>
			   </multiselect>
			   <pre class="language-json"><code>{{ linkedSections  }}</code></pre> -->
			 </b-modal>
		</article>
	</div>
</template>
<script>
import axios from 'axios';
import createExam from './Exams/create.vue';

export default {
  name: "Exams",
	components: { createExam },
  data() {
    return {
			exams: [],
			selected: null,
			showBaloon: false,
			letters: ['A', 'B', 'C', 'D', 'E'],
			questions: [],
			searchQuery: ''
		}
  },
	created: function() {
		axios.defaults.baseURL = 'http://localhost:3000';
		this.refresh();
	},
	methods: {
		filterItems (presets) {
			var app = this;
			return this.exams.filter(function(exam) {
				let regex = new RegExp('(' + app.searchQuery + ')', 'i');
				return exam.name_test.match(regex) || exam.description_test.match(regex) ;
			})
		},
		async refresh () {
      await axios.get('/api/test').then(async response => {
				this.exams = response.data.sort((a,b) => (a.id_test < b.id_test) ? 1 : ((b.id_test < a.id_test) ? -1 : 0));;
      }).catch((error) => {
        console.log(error)
      })

			console.log("Exams: ", this.exams)

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


			for (let exam of this.exams) {
				exam.questions = await axios.get('/api/answer', {params: {where: {id_test: exam.id_test}}}).then(response => {
					response.data = response.data.sort((a,b) => (a.id_question < b.id_question) ? 1 : ((b.id_question < a.id_question) ? -1 : 0));

					let questions_id = [];

					// Push if not exists
					for (let question of response.data) {
						var index = questions_id.findIndex(id => id == question.id_question)
					  if (index === -1)
					  	questions_id.push(question.id_question);
					}

					console.log('Answers: ', response.data)
					console.log('Questions IDs: ', questions_id)

					let questionsFiltered = [];
					for (let id of questions_id) {
						questionsFiltered.push(this.questions.find(question => {
							return question.id_question === id
						}))
					}
					console.log("Questions filtered: ", questionsFiltered)
					return questionsFiltered;
				}).catch((error) => {
					console.log(error)
				})
			}

			console.log("Final Exams: ", this.exams)
			this.$forceUpdate()
		},
		deleteExam (id_exam) {
			axios.delete('/api/test/'+id_exam).then(_ => {
				this.refresh()
			})
		},
		editExam (index) {
			this.copyToForm(index);
		},
		copyToForm (index) {
			console.log(this.exams[index]);
		}
	}
}
</script>
<style scoped>
.exam {
	color: #4C5454;
}
.question {
	border: 2px solid #4C5454
}
.question-title {
	background-color: #4C5454;
	color: white;
	display: inline-flex
}
/* Disable "flex: 1 1" wich bootstrap do */
.exam-header>* {
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

.exam-text {
	text-align: justify;
	font-size: 1.1rem;
	font-weight: 400;
}
.exam-divider {
	border-top: 1px dashed #4C5454;
}
.exam-choices span.active{
	font-weight: 700
}
.question-choices span.active{
	font-weight: 900
}
</style>

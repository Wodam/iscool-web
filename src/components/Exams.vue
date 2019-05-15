<template>
	<div>
		<vs-row vs-justify="center">
		  <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
		    <vs-card>
					<vs-row vs-justify="center">
						<vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
							<vs-button class="px-5 create" color="success" icon="add" @click="popupActivo=true">
								<h3>Nova Avaliação</h3>
							</vs-button>
						</vs-col>
					</vs-row>
		    </vs-card>
		  </vs-col>
		</vs-row>
		<vs-row vs-justify="center">
		  <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
		    <vs-card>
		      <div slot="header">
		        <h2 icon="search">
		          Pesquisar
		        </h2>
		      </div>
		      <div class="centerx default-input">
		        <vs-input class="inputx" placeholder="Digite alguma busca..." v-model="searchText"/>
		      </div>
		      <div slot="footer">
		        <vs-row vs-justify="flex-end">
		          <vs-button class="px-5" color="primary" icon="search"></vs-button>
		        </vs-row>
		      </div>
		    </vs-card>
		  </vs-col>
		</vs-row>
		<vs-row>
			<vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3">
			</vs-col>
			<vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
				<vs-divider />
			</vs-col>
		</vs-row>
		{{questions[0].id}}
		<vs-row vs-justify="center" v-for="(question, index) in getListedQuestions()" :key="question.id_question" class="question-card">
			<vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
		    <vs-card>
		      <div slot="header">
		        <h2 icon="search">
		          {{ question.text_question }}
		        </h2>
		      </div>
					{{ question.description_question }}
		      <div slot="footer">
		        <vs-row vs-justify="space-between">
		          <vs-button color="dark" icon="delete" @click="handleDelete(question.id_question)"></vs-button>
							<vs-button color="warning" icon="edit"></vs-button>
		        </vs-row>
		      </div>
		    </vs-card>
		  </vs-col>
		</vs-row>

		<createQuestion :popupActivo='popupActivo'></createQuestion>
	</div>
</template>
<script>
import axios from 'axios';
import createQuestion from './Questions/create.vue';

export default {
  name: "Exams",
  components: { createQuestion },
  data() {
    return {
			searchText: "",
			popupActivo: false,
			questions: []
		}
  },
	created: function() {
		axios.defaults.baseURL = 'http://localhost:3000';
		this.reload();
	},
	methods: {
		getListedQuestions() {
			return this.questions;
		},
    reload() {
      axios.get('/api/question').then((response) => {
				this.questions = response.data;
				console.log(this.questions)
      }).catch((error) => {
        console.log(error)
      })
    },
		handleDelete(questionToDelete) {
			console.log(questionToDelete)
			axios.delete('/api/question/'+questionToDelete).then(_ => {
				this.reload()
			})
		}
	}
}
</script>
<style scoped>
.inputx {
	padding: 10px 10px 0 10px;
	width: 100%
}
.create {
	width: 100% !important
}
</style>

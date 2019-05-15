<template lang="html">
  <vs-popup classContent="popup-example" color="success" :title="func == 'edit'? 'Editar' : 'Cadastrar' | Questão" :active.sync="popupActivo">
		<div class="wrapper">

			<vs-row vs-justify="center">
				<vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
					<vs-input size="large" class="inputx question-title" placeholder="Titulo da questão" v-model="questionTitle"/>
					<v-textarea placeholder="Enunciado da questão" v-model="questionDesc" auto-grow rows="1"></v-textarea>
					<div class="choices">
						<template v-for="(option, index) in choices">
							<vs-row vs-justify="center">
								<v-flex :key="index">
									<v-checkbox v-model="correctAnswer" :value="option.value"></v-checkbox>
								</v-flex>
								<v-flex lg11 sm11 :key="index + option">
									<v-textarea v-model="option.body" :label="option.label" auto-grow rows="1"></v-textarea>
								</v-flex>
							</vs-row>
						</template>
					</div>
				</vs-col>
			</vs-row>
			<vs-row vs-justify="center">
				<vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
					<vs-button class="create" color="success" icon="add" @click="handleSave">
						<div></div>
					</vs-button>
				</vs-col>
			</vs-row>
		</div>
  </vs-popup>
</template>

<script>
import axios from 'axios';

export default {
	name: "createQuestion",
	props: {
		popupActivo: Boolean,
		func: String,
		title: String
	},
  data(){
    return {
			questionTitle: '',
			questionDesc: '',
			answer: '',
			choices: [
				{ value: '1', label: 'a)', body: '' },
				{ value: '2', label: 'b)', body: '' },
				{ value: '3', label: 'c)', body: '' },
				{ value: '4', label: 'd)', body: '' },
				{ value: '5', label: 'e)', body: '' }
			]
    }
  },
	computed: {
		correctAnswer: {
			get: function() {
				return this.answer
			},
			set: function(value) {
				console.log(value);
				this.answer = value
			}
		}
	},
	methods: {
    handleClose() {
      this.popupActivo = false;
			this.fetchData()
    },
    handleSave() {
			let question = {
	      text_question: this.questionTitle,
	      description_question: this.questionDesc
			}
			console.log(question)
      axios.post('/api/question', question).then(response => {
				let choices = [];

				for (var i = 0; i < this.choices.length; i++) {
					let choice = {};

					choice.id_question = response.data.id_question;
					choice.description_choice = this.choices[i].body;
					choice.trueness_choice = this.choices[i].value == this.answer ? 'v' : 'f';

					choices.push(choice);
				}

				console.log("Escolhas: ", choices)
				axios.post('/api/choice', choices).then(_ => {
					this.handleClose()
				});
			});


    },
    getListedQuestions() {
      return (this.searchStr) ? this.listedQuestions : this.questions;
    },
    handleEdit(questionToEdit) {
      this.answer = [questionToEdit.answer]
      this.text = questionToEdit.text
      this.choices.forEach((option) => {
        option.body = questionToEdit[option.value]
      })
      this.questions = this.questions.filter((question) => {
        return JSON.stringify(question) !== JSON.stringify(questionToEdit)
      })
      this.dialog = true
    },
    handleDelete(questionToDelete) {
			console.log(questionToDelete)
      axios.delete('/api/question/'+questionToDelete.id_questao).then(_ => {
				this.reload()
			})
    }
	}
}
</script>

<style lang="css" scoped>
.popup-example .con-select {
  margin-left: 10px;
  width: 50%;
  margin-bottom: 10px;
}

.inputx {
	width: 100% !important;
	margin-top: 5px;
}
.wrapper {
	padding: 0px 10px
}
.create {
	width: 100%
}
</style>

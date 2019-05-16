<template lang="html">
	<div class="question-create __rounded p-3">
		<form class="__card p-3 mb-3">
			<div class="form-group">
				<label for="textarea">Enunciado</label>
				<b-form-textarea
				id="textarea"
				v-model="text"
				placeholder="Digite algo..."
				rows="3"
				max-rows="6"
				></b-form-textarea>
			</div>
		</form>
		<form class="__card p-3">
			<label for="choices">Alternativas</label>
			<b-form-radio-group id="choices" v-model="selected" name="letter" buttons button-variant="outline-success">
				<div class="form-row mb-2" v-for="index in 5" :key="index">
					<div class="col-1 d-flex justify-content-center">
						<b-form-radio :value="index-1" class="h-100"></b-form-radio>
					</div>
					<div class="col-11">
						<input v-model="choices[index-1].text" type="text" class="form-control h-100" :placeholder="`${index}ª alternativa`">
					</div>
				</div>
			</b-form-radio-group>
			<div v-if="selected !== ''" class="trueness-choice p-2 __rounded d-inline-flex"><b class="mr-2">Verdadeira: </b>{{ selected+1 }}ª alternativa</div>
		</form>
		<div class="question-create-footer mt-3">
			<div class="row">
				<div class="col-sm-12 col-md-7 d-flex justify-content-center align-items-center">
					<div class="bad row">
						<div class="col-sm-12 col-md-2 pr-0">
							<p class="action text-center mb-0 py-2 __rounded">
								Cancelar
							</p>
						</div>
						<div class="col-sm-12 col-md-2 pl-0">
							<p class="action text-center mb-0 py-2 __rounded">
								Limpar
							</p>
						</div>
					</div>
				</div>
				<div class="col-sm-12 col-md-5">
					<button class="__action add btn px-5 py-2 w-100" type="button" @click="save">
						Adicionar
					</button>
				</div>
			</div>
		</div>
		<!-- {{selected}}
		{{text}}
		{{choices}} -->
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "createQuestion",
  data(){
    return {
			selected: '',
			text: '',
			choices: [
				{ text: '' },
				{ text: '' },
				{ text: '' },
				{ text: '' },
				{ text: '' }
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
		async save () {
			let status = await axios.post('/api/question', { text_question: this.text }).then(response => {
				let choices = [];

				for (var i = 0; i < this.choices.length; i++) {
					let choice = {};

					choice.id_question = response.data.id_question;
					choice.description_choice = this.choices[i].text;
					choice.trueness_choice = this.selected == i ? 'v' : 'f';

					choices.push(choice);
				}

				console.log("Escolhas: ", choices)

				axios.post('/api/choice', choices);

				return true;
			}).catch(error => { alert(error); return false });

			if (status === true)
				this.$emit('question-saved')
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
	},
	mounted() {
		// Remove "btn-group" and "btn-group-toggle" classes that "b-form-radio-group" component adds when has the prop "button"
		let choices = document.getElementById('choices');
		choices.classList.remove('btn-group');
		choices.classList.remove('btn-group-toggle');

		// Hide the default input[type="radio"]
		let radio = document.querySelectorAll('#choices input[type="radio"]');
		radio.forEach(element => element.style.opacity = '0')
		// radio.classList.add('hide');
	}
}
</script>

<style lang="css" scoped>
.question-create {
	border: 2px dashed #4C5454;
}
label {
	font-size: 1.1rem;
	font-weight: 500;
	color: #4C5454
}
.trueness-choice {
	color: white;
	background-color: #4C5454
}
.action {
	font-weight: bold
}
.__action.add {
	background-color: #1EA896;
	color: white;
	font-weight: 700 !important
}
.__action.add svg {
	fill: #fff;
}
.bad .action {
	transition: .3s
}
.bad .action:hover {
	background-color: #4C5454;
	color: white
}
</style>

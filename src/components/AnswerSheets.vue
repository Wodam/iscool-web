<template lang="html">
	<div class="answer-sheets">
		<header class="page-header px-5 d-flex justify-content-end align-items-center">
			<h1 class="page-title text-center">Correção</h1>
		</header>
		<div class="container">
			<button type="button" class="save btn btn-lg w-100 mb-3" v-show="ready && !response" @click="send">Corrigir</button>
			<form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input type="file" multiple @change="filesChange"
            accept="image/jpg, image/jpeg, image/png" class="input-file">
            <p class="mb-0 m-auto">
            	Arraste seu(s) arquivo(s) aqui<br> ou clique para anexar
            </p>
        </div>
      </form>
			<h5 class="not-ready text-center text-white p-4 my-3" v-show="sheets.length > 0 && !ready && !response">Defina a avaliação de cada folha resposta</h5>
			<article v-if="sheets.length > 0">
				<div class="row mt-4">
					<div class="col-md-12 mb-4" :class="`col-lg-${sheets.length < 4 ? (sheets.length == 1 ? '12' : (sheets.length == 2 ? '6' : '4')) : '3'}`" v-for="(sheet, index) of sheets" :key="index">
						<div class="sheet _rounded" v-if="!response">
							<div class="remove" @click="remove(index)">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
									<path d="M0 0h24v24H0z" fill="none"/>
								</svg>
							</div>
							<img @click="viewSheet(index)" class="_rounded" :src="sheet.url" :alt="sheet.name">
							<b-form-select class="exams" @change="verify" v-model="sheet.exam" :options="getOptions(index)"></b-form-select>
						</div>
						<div class="correction _rounded" v-else>
							<p class="title text-center text-white mb-0 p-3 _rounded-tl _rounded-tr">Correção</p>
							<div class="row">
								<div class="col-sm-12 col-md-6 py-1 text-center"><b>Acertos</b></div>
								<div class="col-sm-12 col-md-6 py-1 text-center">{{corrections[0].ok}}</div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-6 py-1 text-center"><b>Erros</b></div>
								<div class="col-sm-12 col-md-6 py-1 text-center">{{corrections[0].nok}}</div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-6 py-1 text-center"><b>Taxa</b></div>
								<div class="col-sm-12 col-md-6 py-1 text-center">{{corrections[0].tax}}</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>
		<b-modal id="view-sheet" size="xl" centered title="">
			<img class="h-100 w-100" v-if="selectedSheet !== false" :src="sheets[selectedSheet].url" :alt="sheets[selectedSheet].name">
			<div slot="modal-footer" class="w-100"></div>
		</b-modal>
	</div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
	name: "AnswerSheets",
  data() {
    return {
			exams: [],
			questions: [],
			letters: ['A', 'B', 'C', 'D', 'E'],
			sheets: [],
			ready: false,
			response: false,
			corrections: [{
				ok: 10,
				nok: 10,
				tax: 50
			}],
			selectedSheet: false
    }
  },
  methods: {
    filesChange(e) {
			this.ready = false;
			this.response = false;

			let files = [];

			for (let file of e.target.files) {
				file.url = URL.createObjectURL(file)
				file.exam = null;
				files.push(file);
			}

			this.sheets = files;

			console.log(files);
    },
		remove (index) {
			this.sheets.splice(index, 1);
			this.selectedSheet = false;

			this.verify();
		},
		viewSheet (index) {
			this.selectedSheet = index;
			this.$forceUpdate();
			this.$bvModal.show('view-sheet');
		},
		// async getExams () {
    //   await axios.get('/api/test').then(async response => {
		// 		this.exams = response.data.sort((a,b) => (a.id_test < b.id_test) ? 1 : ((b.id_test < a.id_test) ? -1 : 0));;
    //   }).catch((error) => {
    //     console.log(error)
    //   })
		//
		// 	// console.log("Exams: ", this.exams)
		// },
		async getExams () {
			await axios.get('/api/test').then(async response => {
				this.exams = response.data.sort((a,b) => (a.id_test < b.id_test) ? 1 : ((b.id_test < a.id_test) ? -1 : 0));;
			}).catch((error) => {
				console.log(error)
			})

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
			// console.log("Questions: ", this.questions)

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

					// console.log('Answers: ', response.data)
					// console.log('Questions IDs: ', questions_id)

					let questionsFiltered = [];
					for (let id of questions_id) {
						questionsFiltered.push(this.questions.find(question => {
							return question.id_question === id
						}))
					}
					// console.log("Questions filtered: ", questionsFiltered)
					return questionsFiltered;
				}).catch((error) => {
					console.log(error)
				})
			}

			console.log("Exams: ", this.exams)
			this.$forceUpdate()
		},
		getOptions () {
			let options = [{ value: null, text: 'Selecione uma avaliação', disabled: true}];
			for (let exam of this.exams) {
				options.push({
					value: exam.id_test,
					text: `[A${exam.id_test}] ${exam.name_test}`
				})
			}
			return options;
		},
		verify () {
			for (let sheet of this.sheets)
				if (sheet.exam == null)
					return;

			this.ready = true;
		},
		async send () {
			const formData = new FormData();

			for (var i = 0; i < this.sheets.length; i++)
				formData.append('files[' + i + ']', this.sheets[i]);

			// console.log(this.sheets)
			// for (var pair of formData.entries()) {
			//   console.log(pair[0]+ ', ' + pair[1]);
			// }

			// Filtra os exames selecionados
			let exams = [];
			for (let sheet of this.sheets)
				for (let exam of this.exams)
					if (exam.id_test == sheet.exam)
						exams.push(exam);

			this.corrections = [];

			axios.defaults.baseURL = 'http://192.168.43.169:8080';
			await axios.post('/Correcao/api', formData, { headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
			// await axios.post('/api/answer_sheet', formData, { headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
				console.log("Reponse: ", response)
				this.response = true;

				let correction = response.data;

				// let correction = [
				//   {
				//     "id": 1,
				//     "choice": "A"
				//   },
				//   {
				//     "id": 2,
				//     "choice": "D"
				//   },
				//   {
				//     "id": 3,
				//     "choice": "B"
				//   },
				//   {
				//     "id": 4,
				//     "choice": "invalid"
				//   },
				//   {
				//     "id": 5,
				//     "choice": "D"
				//   },
				//   {
				//     "id": 6,
				//     "choice": "A"
				//   },
				//   {
				//     "id": 7,
				//     "choice": "D"
				//   },
				//   {
				//     "id": 8,
				//     "choice": "C"
				//   },
				//   {
				//     "id": 9,
				//     "choice": "A"
				//   },
				//   {
				//     "id": 10,
				//     "choice": "invalid"
				//   },
				//   {
				//     "id": 11,
				//     "choice": "B"
				//   },
				//   {
				//     "id": 12,
				//     "choice": "A"
				//   },
				//   {
				//     "id": 13,
				//     "choice": "D"
				//   },
				//   {
				//     "id": 14,
				//     "choice": "invalid"
				//   },
				//   {
				//     "id": 15,
				//     "choice": "B"
				//   },
				//   {
				//     "id": 16,
				//     "choice": "invalid"
				//   },
				//   {
				//     "id": 17,
				//     "choice": "invalid"
				//   },
				//   {
				//     "id": 18,
				//     "choice": "C"
				//   },
				//   {
				//     "id": 19,
				//     "choice": "invalid"
				//   },
				//   {
				//     "id": 20,
				//     "choice": "D"
				//   }
				// ]

				//Iterar sobre todas as alternativas
				for (let exam of exams) {
					for (var i = 0; i < exam.questions.length; i++) {
						console.log(`Correção ${i}: `, correction[i])
						console.log(`Questão ${i}: `, exam.questions[i])

						// New correction
						this.corrections.push({
							ok: 0,
							nok: 0,
							tax: 0
						})

						// Se a alternativa[Index da letra (que o cara marcou)] existe && alternativa[Index da letra (que o cara marcou)] é a certa
						if (exam.questions[i].choices[this.letters.indexOf(correction[i].choice)]) {
							if (exam.questions[i].choices[this.letters.indexOf(correction[i].choice)].trueness_choice == "v") {
								this.corrections[i].ok++;
							} else {
								this.corrections[i].nok++;
							}
						}

						console.log(`Correção ${i}: `, this.corrections[i])

						// console.log(exam.questions[i].choices[this.letters.indexOf(correction[i].choice)])
					}
					// for (let question of exam.questions) {
					// 	for (let choice of question.choices) {
					// 		this.letters.indexOf()
					// 		console.log(choice.trueness_choice)
					// 	}
					// }
				}
			}).catch((error) => {
				console.log(error)
			})

			axios.defaults.baseURL = 'http://localhost:3000';
		}
  },
	mounted () {
		this.getExams();
	}
}
</script>

<style lang="css" scoped>
.dropbox {
    outline: 2px dashed #4C5454; /* the dash box */
    /* outline-offset: -10px; */
    /* background: lightcyan; */
    color: #4C5454;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
		transition: .3s
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: white; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

	/* ~ Rounded ~ */
	._rounded-100 {
	  border-radius: 100% !important
	}
	._rounded {
	  border-radius: 10px !important
	}
	._rounded-tl {
	  border-top-left-radius: 10px !important
	}
	._rounded-tr {
	  border-top-right-radius: 10px !important
	}
	._rounded-bl {
	  border-bottom-left-radius: 10px !important
	}
	._rounded-br {
	  border-bottom-right-radius: 10px !important
	}

/* --- SHEET --- */
.sheet {
	position: relative;
	height: 200px;
	width: 100%;
	background-color: #ECF0F1;
	transition: .3s;
	cursor: pointer;
}

.sheet:hover {
	transform: scale(1.03, 1.03);
}

.sheet:hover .remove {
	display: block;
}

.sheet .remove {
	position: absolute;
	display: none;
	right: 5px;
	top: 5px;
	padding: 3px;
	border-radius: 100px;
	cursor: pointer;
	background-color: #fff;
	transition: .3s;
}
.sheet .remove:hover {
	background-color: #CD5C5C;
}

.sheet .remove svg {
	fill: #CD5C5C
}
.sheet .remove:hover svg {
	fill: #FFF
}

.sheet img {
	height: 100%;
	width: 100%;
	object-fit: cover;
}

.sheet .exams {
	position: absolute;
	bottom: -3px;
	left: 0;
	border-radius: 0 0 10px 10px !important;
	border: 0 !important
}

.save {
	color: white;
	font-weight: 700;
	background-color: #1EA896;
	height: 70px;
	transition: .3s
}

.save:hover {
	color: white !important
}

.not-ready {
	background-color: #4C5454
}

.correction {
	background-color: #ECF0F1;
}

.correction .title {
	background-color: #1EA896;
}
</style>

<template lang="html">
	<div class="question-create __rounded p-3">
		<form class="__card p-3 mb-3">
			<div class="form-group">
				<label for="textarea">Nome</label>
				<input v-model="name" type="text" class="__rounded form-control form-control-lg h-100" placeholder="Nome da avaliação">
			</div>
			<div class="form-group">
				<label for="textarea">Orientações</label>
				<b-form-textarea
				id="textarea"
				v-model="text"
				placeholder="Orientações da avaliação"
				size="lg"
				rows="3"
				max-rows="6"
				></b-form-textarea>
			</div>
		</form>
		<div class="question-create-footer mt-3">
			<div class="row">
				<div class="col-sm-12 col-md-7 d-flex justify-content-center align-items-center">
					<div class="bad row">
						<div class="col-sm-12 col-md-2 pr-0">
							<p class="action text-center mb-0 py-2 __rounded" @click="cancel">
								Cancelar
							</p>
						</div>
						<div class="col-sm-12 col-md-2 pl-0">
							<p class="action text-center mb-0 py-2 __rounded" @click="clear">
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
	name: "createExam",
  data(){
    return {
			name: '',
			text: ''
    }
  },
	methods: {
		async save () {
			let status = await axios.post('/api/test', {name_test: this.name, description_test: this.text }).then(response => {
				console.log(response)

				return true;
			}).catch(error => { alert(error); return false });

			if (status === true)
				this.$emit('saved')
		},
    handleDelete(questionToDelete) {
			console.log(questionToDelete)
      axios.delete('/api/question/'+questionToDelete.id_questao).then(_ => {
				this.reload()
			})
    },
		cancel () {
			this.$emit('cancel')
		},
		clear () {
			this.name = '';
			this.text = '';
		}
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
	font-size: 1.2rem;
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

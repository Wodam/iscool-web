<template lang="html">
	<div class="answer-sheets">
		<header class="page-header px-5 d-flex justify-content-end align-items-center">
			<h1 class="page-title text-center">Correção</h1>
		</header>
		<div class="container">
			<button type="button" class="save btn btn-lg w-100 mb-3" v-if="sheets.length > 0">Corrigir</button>
			<form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input type="file" multiple @change="filesChange"
            accept="image/jpg, image/jpeg, image/png" class="input-file">
            <p class="mb-0 m-auto">
            	Arraste seu(s) arquivo(s) aqui<br> ou clique para anexar
            </p>
        </div>
      </form>
			<article v-if="sheets.length > 0">
				<div class="row mt-4">
					<div class="col-md-12 mb-4" :class="`col-lg-${sheets.length < 4 ? (sheets.length == 1 ? '12' : (sheets.length == 2 ? '6' : '4')) : '3'}`" v-for="(sheet, index) of sheets" :key="index">
						<div class="sheet _rounded">
							<div class="remove" @click="remove(index)">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
									<path d="M0 0h24v24H0z" fill="none"/>
								</svg>
							</div>
							<img @click="viewSheet(index)" class="_rounded" :src="sheet.url" :alt="sheet.name">
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
const BASE_URL = 'http://localhost:3000'

export default {
	name: "AnswerSheets",
  data() {
    return {
			sheets: [],
			selectedSheet: false
    }
  },
  methods: {
    filesChange(e) {
			let files = [];

			for (let file of e.target.files) {
				file.url = URL.createObjectURL(file)
				files.push(file);
			}

			this.sheets = files;

			console.log(files);
    },
		remove (index) {
			this.sheets.splice(index, 1);
			this.selectedSheet = false;
		},
		viewSheet (index) {
			this.selectedSheet = index;
			this.$forceUpdate();
			this.$bvModal.show('view-sheet');
		}
  }
}
</script>

<style lang="css" scoped>
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

._rounded {
	border-radius: 10px
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
</style>

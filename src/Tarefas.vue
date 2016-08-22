<style>
	h2 {
		text-align: center;
	}

	.fixo {
		float: right;
		margin-right: 10px;
		margin-top: 0px;
		z-index: 1000;
	}

	.m-top-20 {
		margin-top: 20px;
	}
</style>

<template>
	<div class="text-center" id="tasks">
		<a href="" class="fixo" v-if="isLoading">Carregando</a>
		<h2>{{ title }}</h2>
		<textarea id="txtDescription" class="form-control" v-model="txtDescription" placeholder="Descrição da tarefa...">
		</textarea>
		<button class="btn btn-primary m-top-20" @click="addTarefa">Nova tarefa</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Lista de Tarefas',
	        	isLoading: false,
		        search: '',
		        txtDescription: '',
		        tasks: [],
		        page: 1,
		        total: 0,
		        selected: {},
		        itensPerPage: 10
			}
		},
		methods: {
			showLoading() {
				this.isLoading = true;
			},
			hideLoading() {
				this.isLoading = false;
			},
			addTask() {
				swal('Funciona!', 'Sweet alert está funcionanado');
			},
			loadtasks() {
				let vm = this;

				vm.showLoading();

				let start = (vm.page * vm.itensPerPage) - vm.itensPerPage;

				let end = vm.page * vm.itensPerPage;

				vm.$http.get(`/tasks?_start=${start}&_end=${end}`)
				.then(
					response => {
						vm.tasks = response.json();
						vm.total = response.headers['X-Total-Count'];
					},
					error => {
						console.log(error);
				})
				.finally(
					() => {
						vm.hideLoading();
					}
				)
			}
		}
	}
</script> 
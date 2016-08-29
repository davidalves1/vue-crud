<template>
	<div id="tasks">
		<a href="" class="fixo" v-if="isLoading">Carregando...</a>
		<h2>{{ title }}</h2>
		<input type="date" class="form-control" placeholder="dd/mm/aaaa" v-model="date" maxlength="8">
		<textarea id="description" class="form-control m-top-20" v-model="description" placeholder="Descrição da tarefa...">
		</textarea>
		<button class="btn btn-primary m-top-20" @click="addTask">Nova tarefa</button><br>
		<table class="table custom-table m-top-20">
			<thead>
				<th>ID</th>
				<th>Data</th>
				<th>Descrição</th>
				<th></th>
			</thead>
			<tr v-for="task in tasks">
				<td>{{ task.id }}</td>
				<td>{{ task.date }}</td>
				<td>{{ task.description }}</td>
				<td><Options></Options></td>
			</tr>
		</table>
	</div>
</template>

<script>
	import Options from './Options.vue'

	export default {
		components: {
			Options
		},
		data() {
			return {
				title: 'Lista de Tarefas',
	        	isLoading: false,
		        search: '',
		        date: '',
		        description: '',
		        tasks: [],
		        page: 1,
		        total: 0,
		        selected: {},
		        itensPerPage: 10
			}
		},
		mounted() { this.loadTasks() },
		filters: {
			formatDate(date) {
			  return date.replace(/(\d{2})(\d{2})(\d{4})/g, '\$1/\$2/\$3');
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

				let vm = this;

				if (vm.description != '') {

					// Create
					
				} else {
					swal('Ops...', 'Preencha a descrição para adicionar uma tarefa', 'error');
				}
			},
			loadTasks() {
				let vm = this;

				vm.showLoading();
				console.log('Testando');
				let start = (vm.page * vm.itensPerPage) - vm.itensPerPage;

				let end = vm.page * vm.itensPerPage;

				vm.$http.get(`http://localhost:3333/api/tasks?_start=${start}&_end=${end}`)
				.then(
					response => {
						vm.id = start;
						vm.tasks = response.json();
						console.log(response.json());
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

<style>
	a {
		text-decoration: none !important;
	}

	h2 {
		text-align: center;
	}

	button {
		position: relative;
		left: 50%;
		margin-left: -70px;
	}

	.m-right-5 {
		margin-right: 5px;
	}

	.fixo {
		float: right;
		margin-right: 10px;
		margin-top: 0px;
		z-index: 1000;
	}

	.m-top-20 {
		margin-top: 2em;
	}

	.custom-table {
		margin: 0 auto;
		margin-top: 2em;
		border: 2px solid rgba(220, 220, 220, .3);
	}

	.custom-table th {
		text-align: center;
		background-color: #FEFEFE;
		height: 2em;
	}

	.custom-table tr {
		height: 2em;
		text-align: center;
	}

</style>
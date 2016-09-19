<template>
	<div id="tasks">
		<a href="" class="fixo" v-if="isLoading">Carregando...</a>
		<h2>{{ title }}</h2>
		<input type="date" class="form-control" id="date" placeholder="dd/mm/aaaa" maxlength="10" v-model="date" @keypress="newDate">
		<textarea id="description" class="form-control m-top-20" placeholder="Descrição da tarefa..." v-model="description">
		</textarea>
		<button class="btn btn-primary m-top-20" @click="addTask">Nova tarefa</button><br>
		<table class="table custom-table m-top-20">
			<thead>
				<th>Data</th>
				<th>Descrição</th>
				<th></th>
			</thead>
			<tr v-for="task in tasks">
				<td>{{ task.date | formatDate }}</td>
				<td>{{ task.description }}</td>
				<td>
					<a href="" class="glyphicon glyphicon-pencil m-right-5" @click.prevent="editTask(task)"></a>
					<a href="" class="glyphicon glyphicon-trash" @click.prevent="deleteTask(task)"></a>
				</td>
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
		mounted() { 
			this.loadTasks();
		},
		filters: {
			formatDate(date) {
			  return date.split('T')[0].split('-').reverse().join('/');
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

				if (vm.description !== '' && vm.date.length == 10) {

					let date = vm.date.split('/');

					let data = {
						date: new Date(date[2], date[1] - 1, date[0], 0, 0, 0),
						description: vm.description
					};

					vm.$http.post(`http://localhost:3333/api/tasks`, data)
						.then( 
							response => {
								swal('Sucesso', 'Sua tarefa foi inserida!', 'success');
								vm.tarefa = vm.description = '';
							}, error => {
								console.log(error)
							}
						).finally(
							() => {
								vm.loadTasks()
							}		
						);
					
				} else {
					swal('Ops...', 'Todos os campos devem ser preenchidos corretamente para adicionar uma tarefa.', 'error');
				}
			},
		  	editTask(task) {
				let vm = this;

				console.log(task.id);
			},
			deleteTask(task) {
				let vm = this;

				vm.$http.delete(`http://localhost:3333/api/tasks/${task._id}`)
					.then(
						response => {
							swal('Sucesso', 'Sua tarefa foi excluída.', 'success');
					}, error => {
						console.log(error);
					}).finally(
						() => {
							vm.loadTasks()
						}		
					);
			},
			loadTasks() {
				let vm = this;

				vm.showLoading();

				let start = (vm.page * vm.itensPerPage) - vm.itensPerPage;

				let end = vm.page * vm.itensPerPage;

				vm.$http.get(`http://localhost:3333/api/tasks?_start=${start}&_end=${end}`)
				.then(
					response => {
						vm.id = start;
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
			},
			newDate() {
				let vm = this;

				if (vm.date.length == 8)
					vm.date = vm.date.replace(/^(\d{2})(\d{2})(\d{4})$/g, '$1/$2/$3');
			}
		}
	}
</script>

<style scoped>
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
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

	.custom-table {
		margin: 0 auto;
		margin-top: 20px;
		border: 2px solid rgba(220, 220, 220, 0.3);
	}

	.custom-table th {
		text-align: center;
		background-color: #FEFEFE;
	}
</style>

<template>
	<div class="text-center" id="tasks">
		<a href="" class="fixo" v-if="isLoading">Carregando...</a>
		<h2>{{ title }}</h2>
		<textarea id="txtDescription" class="form-control" v-model="description" placeholder="Descrição da tarefa...">
		</textarea>
		<button class="btn btn-primary m-top-20" @click="addTask">Nova tarefa</button><br>
		<table v-if="!isLoading" class="table custom-table m-top-20">
			<thead>
				<th width="5%">ID</th>
				<th width="10%">Data</th>
				<th width="70%">Descrição</th>
				<th width="15%">Opções</th>
			</thead>
			<tr v-for="task in tasks">
				<td>{{ task.id }}</td>
				<td>{{ task.date }}</td>
				<td>{{ task.description }}</td>
				<td><a href="#">Edit</a> - <a href="#">Remove</a></td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Lista de Tarefas',
	        	isLoading: false,
		        search: '',
		        description: '',
		        tasks: [],
		        page: 1,
		        total: 0,
		        selected: {},
		        itensPerPage: 10
			}
		},
		ready: () =>this.loadTasks(),
		methods: {
			showLoading() {
				this.isLoading = true;
			},
			hideLoading() {
				this.isLoading = false;
			},
			addTask() {
				// swal('Funciona!', 'Sweet alert está funcionanado');
				// let vm = this;

				// vm.total++;

				// vm.tasks.push({
				// 	id: vm.total,
				// 	date: '23/08/2016',
				// 	description: vm.description
				// });
				this.loadTasks();
				
			},
			loadTasks() {
				let vm = this;

				vm.showLoading();
				console.log('Testando');
				let start = (vm.page * vm.itensPerPage) - vm.itensPerPage;

				let end = vm.page * vm.itensPerPage;

				vm.$http.get(`http://localhost:3333/tasks?_start=${start}&_end=${end}`)
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
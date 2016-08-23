<style>
	a {
		text-decoration: none !important;
	}

	h2 {
		text-align: center;
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
	}

</style>

<template>
	<div class="text-center" id="tasks">
		<a href="" class="fixo" v-if="isLoading">Carregando</a>
		<h2>{{ title }}</h2>
		<textarea id="txtDescription" class="form-control" v-model="txtDescription" placeholder="Descrição da tarefa...">
		</textarea>
		<button class="btn btn-primary m-top-20" @click="addTask">Nova tarefa</button><br>
		<table class="table custom-table m-top-20">
			<thead>
				<th>ID</th>
				<th>Data</th>
				<th>Descrição</th>
				<th></th>
			</thead>
			<tr v-for="tasks as task">
				<td width="5%">{{ task.id }}</td>
				<td width="10%">{{ task.date }}</td>
				<td width="70%">{{ task.description }}</td>
				<td width="15%">
					<a href="" class="glyphicon glyphicon-pencil m-right-5"></a>
					<a href="" class="glyphicon glyphicon-trash"></a>
				</td>
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
<template>
	<div id="options">
		<a href="" class="glyphicon glyphicon-pencil m-right-5" @click="editTask"></a>
		<a href="" class="glyphicon glyphicon-trash"></a>
	</div>
</template>
	</div>
<script>
export default {

  name: 'Options',

  data () {
    return {

    };
  },
  methods: {
  	editTask() {
		let vm = this;

		console.log('Olá!');
	},
  }
};
</script>

<style lang="css" scoped>
</style>
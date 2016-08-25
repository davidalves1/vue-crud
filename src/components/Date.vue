<template>
	<div id="date">
		<input type="text" class="form-control" placeholder="dd/mm/aaaa" v-model="date" maxlength="8">
		{{ date | formatDate }}
	</div>
</template>

<script>
export default {

  name: 'Date',

  data () {
    return {
    	date: ''
    }
  },
  filters: {
	formatDate(date) {
      return date.replace(/(\d{2})(\d{2})(\d{4})/g, '\$1/\$2/\$3');
    }
  }
};
</script>

<style lang="css" scoped>
</style>
<style>

</style>

<template>
  <div class="jumbotron">
      
      <Tarefas></Tarefas>

  </div>
</template>

<script>
import Tarefas from './Tarefas.vue'

export default {
  components: {
    Tarefas
  },
  data () {
    return {
      msg: 'Hello Vue!'
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>


<template>
  <div>

  </div>
</template>

<script>
import {get} from '@/plugins/sailsIo'
export default {
  created() {
    get('/user').then(res=>{
      console.log(res, '<----<<<About.vue-13')
    })
  }
}
</script>

<style scoped>

</style>

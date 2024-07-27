<template>
    <svg-icon type="mdi" :path="path"></svg-icon>
  </template>
  
  <script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiArrowLeft } from '@mdi/js';
  
  export default {
    components: {
      SvgIcon
    },
    data() {
      return {
         path: mdiArrowLeft,
      }
    }
  }
</script>
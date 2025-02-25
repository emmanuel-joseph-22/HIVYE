<template>
    <svg-icon type="mdi" :path="path"></svg-icon>
  </template>
  
  <script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiDelete } from '@mdi/js';
  
  export default {
    name: "my-component",
    components: {
      SvgIcon
    },
    data() {
      return {
         path: mdiDelete,
      }
    }
  }
  </script>
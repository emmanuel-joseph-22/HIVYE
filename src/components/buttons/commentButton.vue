<template>
    <div class="flex flex-row gap-1">
        <svg-icon type="mdi" 
                :path="path" 
                class="cursor-pointer hover:text-matcha"
        ></svg-icon>
    </div>
</template>
  
  <script>

  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiChatOutline } from '@mdi/js';
  export default {
    components: {
      SvgIcon
    },
    data() {
      return {
        path: mdiChatOutline,
      }
    },
    methods: {
    }
  }
  </script>
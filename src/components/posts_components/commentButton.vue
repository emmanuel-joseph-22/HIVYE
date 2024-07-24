<template>
    <div class="flex flex-row gap-1">
        <svg-icon type="mdi" 
                :path="path" 
                class="cursor-pointer hover:text-matcha"
        ></svg-icon>
        <span>{{ commentCount }}</span>
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
        commentCount: '3'
      }
    },
    methods: {
    }
  }
  </script>
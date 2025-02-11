<template>
    <svg-icon type="mdi" :path="path" size=""></svg-icon>
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
  }
}
</script>
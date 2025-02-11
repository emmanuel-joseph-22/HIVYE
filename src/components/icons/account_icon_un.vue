<template>
    <svg-icon type="mdi" :path="path" size="36"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountCircleOutline } from '@mdi/js';

export default {
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiAccountCircleOutline,
    }
  }
}
</script>
<template>
    <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHomeVariant, mdiHomeVariantOutline } from '@mdi/js';

export default {
    components: {
        SvgIcon
    },
    data() {
        return {
            path: mdiHomeVariant,
            path1: mdiHomeVariantOutline,
        }
    }
}
</script>
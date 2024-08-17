<template>
    <div class="fixed z-50 w-full left-0 top-0 right-0 bottom-0 h-full bg-[rgba(255,255,255,0.2)] flex flex-col items-center justify-center"
        @click="closeComponent">
        <div class="modal bg-darkBlue rounded-xl overflow-y-auto shadow-lg w-1/4 min-w-[300px] min-h-[100px] text-white text-xl flex flex-col"
            @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default{
    methods: {
        closeComponent(){
            this.$emit('close'); // Emit the close event to the parent
        }
    }
}

</script>
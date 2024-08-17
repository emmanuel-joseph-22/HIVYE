<template>
    <!-- risk estimator quiz -->
    <router-link :to="{ name: 'riskEstimator' }">
        <div 
        title="Take a Quiz"
        class="fixed rounded-full bottom-10 sm:bottom-0 right-0 text-darkBlue p-3 m-8 bg-white cursor-pointer hover:scale-125 hover:bg-matcha hover:text-white transition duration-300 z-10">
            <QuizIcon />      
        </div>
    </router-link>

</template>

<script>
import QuizIcon from '../icons/quiz_icon.vue';

export default{
    components: {
        QuizIcon
    },

}
</script>
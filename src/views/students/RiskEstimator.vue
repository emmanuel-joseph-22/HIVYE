<template>
    <div class="flex flex-col text-white">
        <router-link :to="{ name: 'forum' }" class="fixed rounded-full p-2 m-2 hover:bg-gray-700">
            <BackButton />
        </router-link>
        <section class="w-8/12 h-screen mx-auto flex flex-col justify-center gap-4">
            <h1 class="text-3xl">Risk Estimator</h1>
            <p>Disclaimer: The risk estimator provided here is not a substitute for professional medical advice, 
                diagnosis, or treatment. It is intended to serve as a tool to help identify potential risks. 
                Always consult with a qualified healthcare professional for medical advice and assistance.</p>
            <a 
                href="#set1" 
                class="bg-white mx-auto text-darkBlue w-auto text-center text-lg rounded-xl px-5 py-1 hover:bg-matcha hover:text-white">
                Start the quiz
            </a>
        </section>
        <!-- question 1 -->
        <section id="set1" class="w-8/12 text-2xl mx-auto h-screen flex flex-col justify-center">
            <div class="flex flex-row w-full">
                <h1 class="">How old are you?</h1>    
                <span class="ml-auto text-lg text-gray-500">Question 1 of 4</span>            
            </div>

            <a 
                href="#set2" 
                class="bg-white ml-auto my-12 text-darkBlue w-auto text-center text-lg rounded-xl px-5 py-1 hover:bg-matcha hover:text-white">
                Next
            </a>
        </section>
        <!-- quesiton 2 -->
        <section id="set2" class="w-8/12 text-2xl mx-auto h-screen flex flex-col justify-center">
            <div class="flex flex-row w-full">
                <h1 class="">Gender</h1>    
                <span class="ml-auto text-lg text-gray-500">Question 2 of 4</span>            
            </div>
            
            <a 
                href="#set3" 
                class="bg-white ml-auto my-12 text-darkBlue w-auto text-center text-lg rounded-xl px-5 py-1 hover:bg-matcha hover:text-white">
                Next
            </a>
        </section>
        <!-- quesiton 3 -->
        <section id="set3" class="w-8/12 text-2xl mx-auto h-screen flex flex-col justify-center">
            <div class="flex flex-row w-full">
                <h1 class="">Sexual practices</h1>    
                <span class="ml-auto text-lg text-gray-500">Question 3 of 4</span>            
            </div>
            <a 
                href="#set4"
                class="bg-white ml-auto my-12 text-darkBlue w-auto text-center text-lg rounded-xl px-5 py-1 hover:bg-matcha hover:text-white">
                Next
            </a>
        </section>
        <!-- quesiton 4 -->
        <section id="set4" class="w-8/12 text-2xl mx-auto h-screen flex flex-col justify-center">
            <div class="flex flex-row w-full">
                <h1 class="">Other risk factors</h1>    
                <span class="ml-auto text-lg text-gray-500">Question 4 of 4</span>            
            </div>
            <button
                @click="recordRiskQuiz"
                class="bg-white ml-auto my-12 text-darkBlue w-auto text-center text-lg rounded-xl px-5 py-1 hover:bg-matcha hover:text-white">
                Submit
            </button>
        </section>
    </div>
</template>
<script>
import BackButton from '@/components/buttons/backButton.vue';

export default{
    components: {
        BackButton
    },
    data(){
        return {
            risk_answers: {
                q1: '',
                q2: '',
                q3: '',
                q4: ''
            }
        }
    },
    methods: {
        recordRiskQuiz(){
            // register results
        }
    }
}
</script>
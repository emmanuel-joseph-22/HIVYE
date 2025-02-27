<template>
    <div class="w-full text-white">
        <div class="select-none text-white w-full py-4 text-lg flex flex-row items-center">
            <div class="w-1/2 text-center cursor-pointer"
                :class="{ 'sideHeadBorder' : helplineActive }"
                @click="openHelpineCenter">Helplines</div>
            <div class="w-1/2 text-center cursor-pointer"
                :class="{ 'sideHeadBorder' : testingActive }"
                @click="openTestingCenter">Testing Centers</div>
        </div>
        <Helplines v-if="helplineActive"/>
        <TestingCenters v-if="testingActive"/>
    </div>

    <QuizButton />
</template>

<script>
import Helplines from './Helplines.vue';
import TestingCenters from './TestingCenters.vue';
import QuizButton from '@/components/buttons/QuizButton.vue';
export default{
    components: {
        Helplines,
        TestingCenters,
        QuizButton
    },
    data(){
        return {
            helplineActive: true,
            testingActive: false,
        }
    },
    methods: {
        openHelpineCenter(){
            if(this.helplineActive == false){
                this.helplineActive = true;
                this.testingActive = false;
            }
        },
        openTestingCenter(){
            if(this.testingActive == false){
                this.helplineActive = false;
                this.testingActive = true;
            }
        },
    }
}
</script>

<style scoped>
.sideHeadBorder{
    border-bottom: 3px solid white;
    font-weight: bold;
    padding-bottom: 5px;
}
</style>
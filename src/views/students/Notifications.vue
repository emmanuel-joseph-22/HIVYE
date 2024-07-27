<template>
    <QuizButton />
    <div class="flex flex-row">
        <section class="notif_section flex flex-col">
            <div class="text-white w-full py-3 px-4 text-lg font-bold">
                Notifications
            </div>
            <div class="flex flex-col w-full py-4">
                <div v-for="notif in fetched_data"
                    class="flex flex-col mx-auto px-4 py-2 my-2 w-8/12 text-white border border-1 border-gray-700 rounded-lg hover:scale-105 transition duration-500 cursor-pointer">
                    <div>{{ notif.user }} recently shared a post.</div>
                    <div>{{ notif.date }}</div>
                </div>
            </div>
        </section>
        <section class="side_content border-l border-1 border-gray-700 fixed right-0 h-screen text-white transition-linear duration-1000">
            <div class="text-white w-full py-4 text-lg flex flex-row items-center">
                <div class="w-1/2 text-center cursor-pointer"
                    :class="{ 'sideHeadBorder' : helplineActive }"
                    @click="openHelpineCenter">Helplines</div>
                <div class="w-1/2 text-center cursor-pointer"
                    :class="{ 'sideHeadBorder' : testingActive }"
                    @click="openTestingCenter">Testing Centers</div>
            </div>
            <Helplines v-if="helplineActive"/>
            <TestingCenters v-if="testingActive"/>
        </section>
    </div>
</template>

<script>
import QuizButton from '@/components/buttons/QuizButton.vue';
import Helplines from './Helplines.vue';
import TestingCenters from './TestingCenters.vue';
export default{
    components: {
        QuizButton,
        Helplines,
        TestingCenters
    },
    data(){
        return{
            fetched_data: [
                {
                    user: 'sushi',
                    date: '06-30-24'
                },
                {
                    user: 'hito',
                    date: '06-30-24'
                },
                {
                    user: 'si_ano',
                    date: '06-30-24'
                }
            ],
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
        }
    }
}
</script>
<style scoped>
.notif_section{
    width: calc(100% - 402px);
    z-index: 1;
}
.side_content{
    width: 400px;
}
.sideHeadBorder{
    border-bottom: 3px solid white;
    font-weight: bold;
    padding-bottom: 5px;
}
/* container ng displayed posts */

@media (max-width: 1024px) {
    .side_content{
        display: none;
    }
    .notif_section{
        width: 100%;
    }
}
</style>
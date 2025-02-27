<template>
    <QuizButton />
    <div class="flex flex-row">
        <section class="notif_section flex flex-col">
            <div class="text-white w-full py-3 px-4 text-lg font-bold">
                Notification (currently in development)
            </div>
            <div class="flex flex-col w-full py-4">
                <div v-for="notif in fetched_data"
                    class="flex flex-col mx-auto px-4 py-2 my-2 w-10/12 text-white border border-1 border-gray-700 rounded-lg hover:bg-gray-900 transition duration-200 cursor-pointer">
                    <div>{{ notif.user }} recently shared a post.</div>
                    <div>{{ notif.date }}</div>
                </div>
            </div>
        </section>
        <section class="side_content border-l border-1 border-gray-700 fixed right-0 h-screen text-white transition-linear duration-1000">
            <Helpline_mobile />
        </section>
    </div>
</template>

<script>
import QuizButton from '@/components/buttons/QuizButton.vue';
import Helpline_mobile from './Helpline_mobile.vue';
export default{
    components: {
        QuizButton,
        Helpline_mobile
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
       
    }
}
</script>
<style scoped>
.notif_section{
    width: calc(100% - 402px);
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
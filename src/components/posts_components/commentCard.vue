<template>
    <div class="w-full flex flex-col text-white gap-2 mb-4">
        <!-- comment prompt -->
        
        <!-- comment section -->
        <div class="my-2 flex flex-col w-11/12 mx-auto">
            <!-- loop the comment section here -->
            <div 
                class="min-w-40 max-w-80 flex flex-col" 
                v-for="comment in comment_data"
                >
                <div class="px-4 py-2 rounded-lg border border-1 border-white">
                    <div class="font-bold my-1">{{ comment.userName  }}</div>
                    <div>{{ comment.content  }}</div>
                </div>
                <div class="ml-auto mr-2 mt-2 mb-4 text-sm">{{ comment.date }}</div>
            </div>
        </div>
    </div>
</template>


<script>
export default{
    components: {

    },
    data(){
        return {
            comment_data: [
                {
                    userName: 'slurpee',
                    date: '10-20-2023',
                    content: 'bark bark',
                },
                {
                    userName: 'qqq',
                    date: '10-12-2023',
                    content: 'omg',
                },
                {
                    userName: 'ttt',
                    date: '02-12-2023',
                    content: 'huy',
                },
                {
                    userName: 'uuu',
                    date: '10-20-2022',
                    content: 'Ngayong nandyan ka na, di magmamadali Ikaw lang ang katabi hanggang sa ang buhok ay pumuti',
                },
                {
                    userName: 'fure',
                    date: '06-23-2023',
                    content: 'Di na maghahanap ng kung anong sagot sa mga tanong Dahil ikaw ang katiyakan ko',
                },
            ]
        }
    },
    methods: {

    }
}
</script>
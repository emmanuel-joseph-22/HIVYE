<template>
    <div
        v-for="helpine in helplines" 
        class="flex flex-row border border-1 w-11/12 mx-auto my-4 border-gray-700 shadow-lg rounded-xl text-white py-4 px-4 gap-4 hover:bg-gray-900 hover:cursor-pointer">
        <div class="w-2/12 flex items-center justify-center">
            <img :src="helpine.logo" />
        </div>
        <div class="flex flex-col w-10/12 text-left">
            <h1 class="font-bold text-xl">{{ helpine.organization }}</h1>
            <div class="">{{ helpine.address }}</div>
            <div class="">{{ helpine.number }}</div>
            <div class="">{{ helpine.email }}</div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            helplines: [
                {
                    organization: 'University Health Office',
                    address: 'University Address, Batangas City',
                    number: '043-723-0108',
                    email: 'universityho@gmail.com',
                    logo: '/logo/helpline/bsu.png'
                },
                {
                    organization: 'GOLDEN GATE HOSPITAL',
                    address: 'P.Prieto Poblacion Batangas',
                    number: '043-723-2508',
                    email: 'it_gggh@yahoo.com',
                    logo: '/logo/helpline/ggh.png'
                },
                {
                    organization: 'PLHIV',
                    address: 'Sta Cruz, Manila',
                    number: '+63285795365',
                    email: 'plhiv.response@gmail.com',
                    logo: '/logo/helpline/plhiv.png'
                },
            ]
        }
    }
}
</script>
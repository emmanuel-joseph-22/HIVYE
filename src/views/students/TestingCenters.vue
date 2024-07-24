<template>
    <div
        v-for="center in testingCenters" 
        class="flex flex-row border border-1 w-11/12 mx-auto my-4 border-green-900 rounded-xl text-white py-4 px-4 gap-4">
        <div class="w-2/12 flex items-center justify-center">
            <img :src="center.logo" alt="logo" />
        </div>
        <div class="flex flex-col w-10/12 text-left">
            <h1 class="font-bold text-xl">{{ center.organization }}</h1>
            <div class="">{{ center.address }}</div>
            <div class="">{{ center.number }}</div>
            <div class="">{{ center.email }}</div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            testingCenters: [
                {
                    organization: 'PIONEER CLINICAL LABORATORY & MEDICAL CLINIC INC.',
                    address: '',
                    number: '(043) 723 0089 / (043) 723 1706',
                    email: '',
                    logo: '/logo/testingCenter/pcl.png'
                },
                {
                    organization: 'BATANGAS CLINICAL LABORATORY',
                    address: '',
                    number: '(043) 980-5076 / 722-2473',
                    email: '',
                    logo:'/logo/testingCenter/bcl.png'
                },
                {
                    organization: 'MARY MEDIATRIX MEDICAL CENTER',
                    address: '',
                    number: '(043) 773 6800',
                    email: '',
                    logo: '/logo/testingCenter/mmmc.png'
                },
            ]
        }
    }
}
</script>
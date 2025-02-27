<template>
    <div v-for="helpline in helplines" >
        <div class="select-none flex flex-row border border-1 w-11/12 mx-auto my-4 border-gray-700 shadow-lg rounded-xl text-white py-4 px-4 gap-4 hover:bg-gray-900 hover:cursor-pointer hover:border-matcha transition duration-500"
            @click="helpline.action">
            <div class="w-2/12 flex items-center justify-center">
                <img :src="helpline.logo" />
            </div>
            <div class="flex flex-col w-10/12 text-left">
                <h1 class="font-bold text-xl">{{ helpline.organization }}</h1>
                <div class="">{{ helpline.address }}</div>
                <div class="">{{ helpline.number }}</div>
                <div class="">{{ helpline.email }}</div>
            </div>
        </div>
    </div>
    <div class="map-container"  v-if="GGHMapVisible || PLHIVMapVisible || BSUMapVisible">
        <div class="close-button" @click="hideMap">❌</div>
        <div v-if="!GGHMapVisible && !PLHIVMapVisible && !BSUMapVisible" class="map-placeholder-box">
            <img class="map-placeholder" src="/logo/mapph.png" alt="Map Placeholder" />
        </div>
        <iframe v-if="BSUMapVisible" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.9134684289!2d121.07180561094934!3d13.78408969648871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0ff100000001%3A0x6e553c2c569f211f!2sBatangas%20State%20University-Alangilan%20Campus!5e0!3m2!1sen!2sph!4v1701102629858!5m2!1sen!2sph" width="1000" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <iframe v-if="GGHMapVisible" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.351328926575!2d121.05915451094897!3d13.757674397101185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0541490bdff1%3A0x7c2edbe35e450106!2sGolden%20Gate%20Batangas%20Hospital%20Inc.!5e0!3m2!1sen!2sph!4v1701104767761!5m2!1sen!2sph" width="1000" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <iframe v-if="PLHIVMapVisible" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.6819350691376!2d120.98000551096047!3d14.617186176610895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b50b23296bfb%3A0x953fe6128ff6022f!2sPLHIV%20Responce%20Center!5e0!3m2!1sen!2sph!4v1701105159422!5m2!1sen!2sph" width="1000" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
                    logo: '/logo/helpline/bsu.png',
                    action: this.toggleBSUMap
                },
                {
                    organization: 'GOLDEN GATE HOSPITAL',
                    address: 'P.Prieto Poblacion Batangas',
                    number: '043-723-2508',
                    email: 'it_gggh@yahoo.com',
                    logo: '/logo/helpline/ggh.png',
                    action: this.toggleGGHMap
                },
                {
                    organization: 'PLHIV',
                    address: 'Sta Cruz, Manila',
                    number: '+63285795365',
                    email: 'plhiv.response@gmail.com',
                    logo: '/logo/helpline/plhiv.png',
                    action: this.togglePLHIVMap
                },
            ],
            GGHMapVisible: false,
            PLHIVMapVisible: false,
            BSUMapVisible: false,
        }
    },
    methods: {
        toggleBSUMap(){
            this.BSUMapVisible = !this.BSUMapVisible;
            this.GGHMapVisible = false;
            this.PLHIVMapVisible = false;
        },
        togglePLHIVMap(){
            this.PLHIVMapVisible = !this.PLHIVMapVisible;
            this.GGHMapVisible = false;
            this.BSUMapVisible = false;
        },
        toggleGGHMap(){
            this.GGHMapVisible = !this.GGHMapVisible;
            this.PLHIVMapVisible = false;
            this.BSUMapVisible = false;
        },
        hideMap() {
            this.GGHMapVisible = false;
            this.PLHIVMapVisible = false;
            this.BSUMapVisible = false;
        },
    }
}
</script>

<style scoped>
.map-container {
    position: fixed;
    top: 25px;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    background-color: rgba(37, 34, 34, 0.679);
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
}
.close-button {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    z-index: 1001;
    border: 1px solid #ccc;
}
</style>
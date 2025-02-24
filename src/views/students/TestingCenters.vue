<template>
    <div v-for="center in testingCenters" >
        <div class="flex flex-row border border-1 w-11/12 mx-auto my-4 border-gray-700 shadow-lg rounded-xl text-white py-4 px-4 gap-4 hover:bg-gray-900 hover:cursor-pointer"
            @click="center.action">
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
    </div>
    <div class="map-container"  v-if="PCLMapVisible || BCLMapVisible || MMMCMapVisible">
        <div class="close-button" @click="hideMap">❌</div>
        <div v-if="!PCLMapVisible && !BCLMapVisible && !MMMCMapVisible" class="map-placeholder-box">
            <img class="map-placeholder" src="/logo/mapph.png" alt="Map Placeholder" />
        </div>
        <iframe v-if="PCLMapVisible" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3098396959836!2d121.05529191094898!3d13.760179497043147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd05439289434f%3A0xc0c4ea08023cabf!2sPioneer%20Clinical%20Laboratory%20%26%20Medical%20Clinic%2C%20Incorporated!5e0!3m2!1sen!2sph!4v1701107589713!5m2!1sen!2sph" width="1000" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <iframe v-if="BCLMapVisible" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.4204981553426!2d121.0531676109489!3d13.753496997198042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0515447b08db%3A0x54511f8f41ab20de!2sBatangas%20Clinical%20Laboratory!5e0!3m2!1sen!2sph!4v1701107850435!5m2!1sen!2sph" width="1000" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <iframe v-if="MMMCMapVisible" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123961.76158439406!2d121.027532981446!3d13.850737698274564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0541b76f7f3f%3A0x6d32fab01a673df5!2sMary%20Mediatrix%20Medical%20Center!5e0!3m2!1sen!2sph!4v1701107933421!5m2!1sen!2sph" width="1000" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
                    logo: '/logo/testingCenter/pcl.png',
                    action: this.togglePCLMap
                },
                {
                    organization: 'BATANGAS CLINICAL LABORATORY',
                    address: '',
                    number: '(043) 980-5076 / 722-2473',
                    email: '',
                    logo:'/logo/testingCenter/bcl.png',
                    action: this.toggleBCLMap
                },
                {
                    organization: 'MARY MEDIATRIX MEDICAL CENTER',
                    address: '',
                    number: '(043) 773 6800',
                    email: '',
                    logo: '/logo/testingCenter/mmmc.png',
                    action: this.toggleMMMCMap
                },
            ],
            PCLMapVisible: false,
            BCLMapVisible: false,
            MMMCMapVisible: false,
        }
    },
    methods: {
        togglePCLMap(){
            this.PCLMapVisible = !this.PCLMapVisible;
            this.BCLMapVisible = false;
            this.MMMCMapVisible = false;
        },
        toggleBCLMap(){
            this.BCLMapVisible = !this.BCLMapVisible;
            this.PCLMapVisible = false;
            this.MMMCMapVisible = false;
        },
        toggleMMMCMap(){
            this.MMMCMapVisible = !this.MMMCMapVisible;
            this.PCLMapVisible = false;
            this.BCLMapVisible = false;
        },
        hideMap() {
            this.PCLMapVisible = false;
            this.BCLMapVisible = false;
            this.MMMCMapVisible = false;
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
}</style>
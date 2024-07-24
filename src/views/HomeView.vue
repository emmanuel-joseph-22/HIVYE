<template>
  <!-- sidebar -->
  <nav class="fixed side_bar h-screen bg-darkBlue flex flex-col justify-center gap-4 transition-linear duration-1000">
    <!-- logo -->
     <div class="w-full mt-8 absolute top-0">
        <img src="./../assets/HIVYE_logo.png" class="w-1/3 mx-auto" />    
     </div>
    <div class="w-11/12 mx-auto rounded-lg text-white text-xl hover:bg-matcha transition duration-300 cursor-pointer">
      <router-link to="/forum" class="flex flex-row py-3 w-full px-5 md:px-10 items-center gap-3">
        <HomeIcon class="" />
        <div class="hidden sm:hidden md:block">Home</div>    
      </router-link>
    </div>
    <!-- <div class=" w-11/12 mx-auto rounded-lg text-white text-xl hover:bg-matcha transition duration-300 cursor-pointer">
      <router-link to="/helplines" class="flex flex-row py-3 px-5 md:px-10 items-center w-full gap-3">
        <QuizIcon />
        <div class="hidden sm:hidden md:block">Helplines</div>    
      </router-link>
    </div> -->
    <div class=" w-11/12 mx-auto rounded-lg text-white text-xl hover:bg-matcha transition duration-300 cursor-pointer">
      <router-link to="/chats" class="flex flex-row py-3 px-5 md:px-10 items-center w-full gap-3">
        <ChatIcon />
        <div class="hidden sm:hidden md:block">Chats</div>    
      </router-link>
    </div>
    <div class="w-11/12 mx-auto rounded-lg text-white text-xl hover:bg-matcha transition duration-300 cursor-pointer">
      <router-link to="/notifications" class="flex flex-row py-3 px-5 md:px-10 items-center w-full gap-3">
        <NotifIcon />
        <div class="hidden sm:hidden md:block">Notifications</div>    
      </router-link>
    </div>
    <div class="absolute bottom-0 w-11/12 text-white text-xl mx-1 md:mx-3 mb-8 rounded-lg hover:bg-matcha transition duration-300 cursor-pointer">
      <router-link to="/profile" class="flex flex-row py-3 px-1 md:px-8 items-center w-full gap-3 ">
        <AccountIcon class=""/>
        <div class="hidden sm:hidden md:block">{{ userName }}</div>    
      </router-link>
    </div>
  </nav>
  <!-- risk estimator quiz -->
  <div 
    title="Take a Quiz"
    class="fixed rounded-full bottom-0 right-0 text-darkBlue p-3 m-8 bg-white cursor-pointer hover:scale-125 hover:bg-matcha hover:text-white transition duration-300 z-10">
      <QuizIcon />      
  </div>
  <main class="main_content bg-darkBlue transition-linear duration-1000">
      <router-view></router-view>  
  </main>

</template>
<script>
import HomeIcon from '@/components/icons/home_icon.vue';
import ChatIcon from '@/components/icons/chat_icon.vue';
import AccountIcon from '@/components/icons/account_icon.vue';
import QuizIcon from '@/components/icons/quiz_icon.vue';
import NotifIcon from '@/components/icons/notif_icon.vue';

export default{
  components: {
    HomeIcon,
    NotifIcon,
    ChatIcon,
    AccountIcon,
    QuizIcon
  },
  data(){
    return {
      userName: 'EJ',
      // nav bar
      side_bar_tabs: [
        {
          name: 'home', active: false, route: '/home', displayName: 'Home'
        },
        {
          name: 'helplines', active: false, route: '/helpines', displayName: 'Helplines'
        },
        {
          name: 'chats', active: false, route: '/chats', displayName: 'Chats'
        },
        {
          name: 'notifications', active: false, route: '/notifications', displayName: 'Notifications'
        },
        {
          name: 'profile', active: false, route: '/profile', displayName: this.userName
        },
      ]
    }
  }
}
</script>
<style scoped>
.side_bar{
  width: 250px;
}
.main_content{
  margin-left: 250px;
}
@media screen and ( max-width: 768px ){
  .side_bar{
    width: 70px;
  }
  .main_content{
    margin-left: 70px;
  }
}
@media screen and ( max-width: 640px ){
  .side_bar{
    visibility: hidden;
  }
  .main_content{
    margin-left: 0;
  }
}


</style>
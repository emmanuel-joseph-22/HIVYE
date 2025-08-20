<template>
  <!-- right sidebar for web -->
  <nav :class="{ light: isLightMode }"
    class="fixed select-none side_bar h-full border-r border-1 border-gray-700 flex flex-col justify-center gap-4 transition-linear duration-500">
    <div class="w-full mt-8 absolute top-0">
      <div class="flex text-white w-full mx-auto">
        <div class="mx-auto flex">
          <img src="\logo\LOGO_HIVYE.png" class="w-[45px]" />
          <span class="mt-5 mx-2 text-lg font-bold hidden sm:hidden md:block">HIVYE </span>
        </div>
      </div>
    </div>
    <!-- eto tlga ung side bar -->
    <div v-for="(tab, index) in side_bar_tabs" :key="index" class="">
      <div class="pl-10 pr-5">
        <div class="px-auto mx-auto rounded-xl text-xl text-white hover:bg-matcha hover:text-hoverText dark:hover:text-hoverText transition duration-300 cursor-pointer" @click="toggleTab(index)">
          <router-link :to="tab.route" class="flex flex-row py-3 w-full px-5 md:px-10 items-center gap-4">
            <component :is="tab.active ? tab.icon : tab.inactiveIcon" class="w-7 h-7 shrink-0" />
            <div class="hidden sm:hidden md:block" :class="{ 'font-bold': tab.active }">{{ tab.displayName }}</div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- dark mode (theme itself) -->
    <div class="absolute bottom-0 w-full">
      <div
        class="text-white hover:text-hoverText flex flex-row mx-4 sm:mx-auto my-4 w-11/12 rounded-lg py-3 text-xl px-5 md:px-10 items-center gap-3 hover:bg-matcha  transition duration-300 cursor-pointer"
        @click="toggleLightMode">
        <light_mode v-if="isLightMode" />
        <dark_mode v-if="!isLightMode" />
        <span class="hidden sm:hidden md:block">Theme</span>
      </div>
    </div>

  </nav>
  <!-- nav bar for mobile-->
  <div
    class="mobile_nav_bar h-[50px] bg-darkBlue border-t border-1 border-gray-600 fixed z-10 flex justify-between items-center bottom-0 w-full p-1 transition-ease-in-out duration-300">
    <div class="flex w-full justify-around">
      <div class="no-underline flex justify-center items-center text-white" v-for="(tab, index) in mobile_nav_tabs"
        :key="index">
        <div class="flex justify-center items-center p-1 cursor-pointer" @click="toggleButton(index)">
          <router-link :to="tab.route" class="flex flex-row py-3 w-full px-5 md:px-10 items-center gap-3">
            <component :is="tab.active ? tab.icon : tab.inactiveIcon" class="mobile_icon" />
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <main class="main_content transition-linear duration-500 h-full">
    <router-view></router-view>
  </main>
</template>
<script>
import { useRoute } from "vue-router";
import HomeIcon from '@/components/icons/home_icon.vue';
import ChatIcon from '@/components/icons/chat_icon.vue';
import AccountIcon from '@/components/icons/account_icon.vue';
import NotifIcon from '@/components/icons/notif_icon.vue';
import Helpline_icon from '@/components/icons/helpline_icon.vue';
import HomeOutline from '@/components/icons/home_icon_un.vue';
import ChatOutline from '@/components/icons/chat_icon_un.vue';
import AccountOutline from '@/components/icons/account_icon_un.vue';
import NotifOutline from '@/components/icons/notif_icon_un.vue';
import HelplineOutline from '@/components/icons/helpline_icon_un.vue';
import light_mode from "@/components/icons/light_mode.vue";
import dark_mode from "@/components/icons/dark_mode.vue";

export default{
  components: {
    HomeIcon,
    Helpline_icon,
    NotifIcon,
    ChatIcon,
    AccountIcon,
    light_mode,
    dark_mode
  },
  data(){
    return {
      userName: 'EJ',

      // nav bar
      side_bar_tabs: [
        {
          name: 'home',  route: '/forum', active: true, displayName: 'Home', icon: HomeIcon, inactiveIcon: HomeOutline,
        },
        {
          name: 'chats', route: '/chats', active: false, displayName: 'Chats', icon: ChatIcon, inactiveIcon: ChatOutline,
        },
        // {
        //   name: 'helplines', route: '/helplines',  active: false, displayName: 'Helplines', icon: Helpline_icon, inactiveIcon: HelplineOutline,
        // },
        {
          name: 'notifications', route: '/notifications', active: false, displayName: 'Notifications', icon: NotifIcon, inactiveIcon: NotifOutline,
        },
        {
          name: 'profile', route: '/profile', active: false, displayName: 'Profile', icon: AccountIcon, inactiveIcon: AccountOutline,
        },
      ],
      // mobile nav
      mobile_nav_tabs: [
        {
          name: 'home',  route: '/forum', active: true, displayName: 'Home', icon: HomeIcon, inactiveIcon: HomeOutline,
        },
        {
          name: 'chats', route: '/chats', active: false, displayName: 'Chats', icon: ChatIcon, inactiveIcon: ChatOutline,
        },
        {
          name: 'helplines', route: '/helplines',  active: false, displayName: 'Helplines', icon: Helpline_icon, inactiveIcon: HelplineOutline,
        },
        {
          name: 'notifications', route: '/notifications', active: false, displayName: 'Notifications', icon: NotifIcon, inactiveIcon: NotifOutline,
        },
        {
          name: 'profile', route: '/profile', active: false, displayName: 'Profile', icon: AccountIcon, inactiveIcon: AccountOutline,
        },
      ],
      isLightMode: false,
    }
  },
  methods: {
    toggleTab(index){
      this.side_bar_tabs.forEach((tab, i) => {
        tab.active = (i === index);
      });
    },
    toggleButton(index){
      this.mobile_nav_tabs.forEach((tab, i) => {
        tab.active = (i === index);
      });
    },
    syncActiveTab(){
      const currentRoute = this.$route.path;
      this.mobile_nav_tabs.forEach((tab) => {
        tab.active = tab.route === currentRoute;
      });
    },
    toggleLightMode(){
      this.isLightMode = !this.isLightMode;
      document.documentElement.classList.toggle("light", this.isLightMode);
      localStorage.setItem("theme", this.isLightMode ? "light" : "dark");
    }
  },
  watch: {
    $route: "syncActiveTab"
  },
  mounted() {
    this.syncActiveTab(); // Ensures correct active tab when the page loads
    this.isLightMode = localStorage.getItem("theme") === "light";
    document.documentElement.classList.toggle("light", this.isLightMode);
  }
}
</script>
<style scoped>
.side_bar{
  width: 300px;
}
.main_content{
  margin-left: 300px;
}
.mobile_nav_bar{
  visibility: hidden;
}
.mobile_icon{
  width: 30px;
  height: 30px;
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
  .mobile_nav_bar{
    visibility: visible;
  }
}


</style>
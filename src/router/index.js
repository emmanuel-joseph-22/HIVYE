import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

import CatchPage from '../views/NoRouteCatch.vue';
import Login from '../views/authentication/Login.vue';
import Signup from '../views/authentication/Signup.vue';

import Forum from '../views/students/Forum.vue';
import Helplines_mobile from '../views/students/Helpline_mobile.vue';
import ChatView from '../views/chats/ChatView.vue';
import NotifView from '../views/students/Notifications.vue';
import RiskEstimator from '../views/students/RiskEstimator.vue';
import ProfileView from '../views/students/ProfileView.vue';
import AboutMe from '../views/misc/aboutMe.vue';

import postView from '@/views/students/postView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/forum'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView, 
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum
    },
    {
      path: '/post/:id',
      name: 'postView',
      component: postView,
      props: true
    },
    {
      path: '/helplines',
      name: 'helplines',
      component: Helplines_mobile
    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatView
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: NotifView
    },
    {
      path: '/risk-estimator',
      name: 'riskEstimator',
      component: RiskEstimator
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    // auth
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/about',
      name: 'about',
      component: AboutMe
    },
    /* for unrecognized paths not working */
    {
      path: '/:catchAll(.*)',
      name: 'CatchPage',
      component: CatchPage
    },
    // 
  ]
})

export default router

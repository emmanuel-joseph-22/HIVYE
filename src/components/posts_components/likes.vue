<template>
    <div class="flex flex-row gap-1">
        <button 
            @click="toggleLike" 
            :class="buttonClass" 
            class="flex items-center justify-center items-center">
        <svg
            :class="svgClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6 text-white hover:text-matcha"
        >
            <path
            d="M19.8 12.3l-7.9 7.9c-.3.3-.8.3-1.1 0l-7.9-7.9c-1.7-1.7-1.7-4.6 0-6.4 1.7-1.7 4.6-1.7 6.4 0L12 7.4l1.1-1.1c1.7-1.7 4.6-1.7 6.4 0 1.7 1.7 1.7 4.6 0 6.4z"
            />
        </svg>
        </button>
        <span>{{ likeCount }}</span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLiked: false,
        likeCount: 2
      };
    },
    computed: {
      buttonClass() {
        return this.isLiked ? 'text-red-500' : 'text-gray-400';
      },
      svgClass() {
        return this.isLiked ? 'fill-current' : 'stroke-current';
      },
    },
    methods: {
      toggleLike() {
        if(this.isLiked==false){
            this.isLiked = !this.isLiked;
            this.likeCount++;
            //update db here
        } else {
            this.isLiked = !this.isLiked;
            this.likeCount--;
            //update db here
        }
        
      },
    },
  };
  </script>

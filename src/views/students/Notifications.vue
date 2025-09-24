<template>
    <QuizButton />
    <div class="flex flex-row">
        <section class="notif_section flex flex-col">
            <div class="text-white w-full py-3 px-4 text-lg font-bold">
                Notifications
            </div>

            <div class="flex flex-col w-full py-4">
                <div v-for="notification in sortedNotifications" :key="notification.timestamp"
                    class="flex flex-col mx-auto px-4 py-2 my-2 w-10/12 text-white border border-1 border-gray-700 rounded-lg hover:bg-gray-900 hover:border-matcha transition duration-500 cursor-pointer">
                    <p v-html="formattedNotification(notification)"></p>
                </div>
            </div>
        </section>
        <section class="side_content border-l border-1 border-gray-700 fixed right-0 h-screen text-white transition-linear duration-1000">
            <Helpline_mobile />
        </section>
    </div>
</template>

<script setup>
import QuizButton from '@/components/buttons/QuizButton.vue';
import Helpline_mobile from './Helpline_mobile.vue';


import { onMounted, ref } from 'vue';
import { HIVYE_database as db } from "@/main";
import { onChildAdded, ref as db_ref } from 'firebase/database';
import { useUserStore } from '@/stores/user';
import { timeAgo } from '@/scripts/dateAndTime';

const notifications = ref([]);
const sortedNotifications = ref([]);

const userStore = useUserStore();
// const sender = userStore.username;
const userID = userStore.user_id;

onChildAdded(db_ref(db, "posts/"), (data) => {
    const postTimestamp = data.key;
    const postData = data.val();
    const postdate = postData.date;
    const posttime = timeAgo(postData.time);
    let post_name = postData.display_name;

    // if (postData.post_status == true) {
    //     post_name = "someone";
    // }
    const postNotification = {
        timestamp: postTimestamp,
        text: `${post_name} shared a post: <i><b>${postData.post_content}</b></i>. ${posttime}`,
        date: postdate,
        time: posttime
    };
    if (postData.user_id != userID) {
        notifications.value.push(postNotification);
    }

    // onChildAdded(db_ref(db, `posts/${postTimestamp}/comments/`), (commentData) => {
    //     const commentTimestamp = commentData.key;
    //     const comment = commentData.val();
    //     const commentdate = comment.date;
    //     const commenttime = timeAgo(comment.time);
    //     let comment_name = comment.display_name;
    //     // if (comment.post_status == true) {
    //     // comment_name = "someone";
    //     // }

    //     const commentNotification = {
    //     timestamp: commentTimestamp,
    //     text: `<b>${comment_name}</b> commented on your post: ${comment.comment}. ${commenttime}`,
    //     date: commentdate,
    //     time: commenttime
    // };
    //     if (postData.user_id == userID && comment.user_id != userID) {
    //     notifications.value.push(commentNotification);
    //     }
    // });

    // onChildAdded(db_ref(db, `posts/${postTimestamp}/likes/`), (likedData) => {
    //     const likeTimestamp = likedData.key;
    //     const like = likedData.val();
    //     const likeNotification = {
    //     timestamp: likeTimestamp,
    //     text: `<b>${like.display_name}</b> liked your post.`,
    //     };
    //     if (postData.user_id == userID && like.user_id != userID) {
    //     notifications.value.push(likeNotification);
    //     }
    // });
});

  
onMounted(() => {
    setTimeout(() =>{
        const sortNotifications = () => {
            sortedNotifications.value = [...notifications.value].sort((a, b) => b.timestamp - a.timestamp);
        };
        sortNotifications();
    }, 500)
})

const formattedNotification = (notification) => {
  const maxLength = 200; // or whatever length you want before ellipsis

  // Truncate the full text if too long
  let text = notification.text;
  if (text.length > maxLength) {
    text = text.slice(0, maxLength - 3) + '...';
  }

  // Replace the post_name with bolded version
  let formattedText = text.replace(
    notification.post_name,
    `<b>${notification.post_name}</b>`
  );

  return formattedText;
};
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
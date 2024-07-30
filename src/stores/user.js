import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  // states 
  const user_id = ref(null);
  const username = ref(null);
  const user_email = ref(null);
  const displayName = ref(null);

  // actions
  function setUserCred(UID, email, DN){
    user_id.value = UID;
    user_email.value = email;
    displayName.value = DN;
  }

  // getters

  return{
    user_id, 
    username, 
    user_email, 
    displayName, 
    setUserCred,
  }
});
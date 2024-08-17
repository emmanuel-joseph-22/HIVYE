import { ref, computed, toDisplayString } from 'vue'
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
  function eraseUserState(){
    user_id.value = null;
    username.value = null;
    user_email.value = null;
    displayName.value = null;
  }

  // lapa getters
  
  return{
    user_id, 
    username, 
    user_email, 
    displayName, 
    setUserCred,
    eraseUserState
  }
});
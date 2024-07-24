import { firebase_app as db_app, HIVYE_database as db  } from "./../main";
import { getAuth, onAuthStateChanged, updateEmail, updatePassword,  reauthenticateWithCredential, EmailAuthProvider  } from'firebase/auth';
import { ref as db_ref, get, update as up } from 'firebase/database';

// this caches current user's username for easy access 
let user_id = [];

// for current user's uid initiated from firebase authentication
let curr_id = [];

let acc_id = [];

export const admin_name = "Counselor"

function getaccID(data){
    acc_id = []
    acc_id.push(data)
}
// clears the container once the user logs out
function removeUser() {
    user_id = []
}
function addUid(data){
    curr_id = []
    curr_id.push(data)
}
function addUser(data){
    removeUser()
    user_id.push(data)
}
function getUsername(){
    const auth = getAuth(db_app)
    const queri = db_ref(db, "users");
    onAuthStateChanged(auth, (user) => {
        if(user){
            // User is signed in, you can access the user's information
            const uid = user.uid;
            // search for username with matching uid
            get(queri).then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const user_key = childSnapshot.key
                    const username_id = childSnapshot.child('username').val();
                    
                    if(user_key === uid){
                        up(db_ref(db, "users/" + user_key),{ 'status': "active" })
                        addUser(username_id)
                        addUid(user_key)
                        console.log("current user: " + user_id[0])
                    }
                });
            });
        } else {
            // No user is signed in
            console.log('No user is currently signed in.');
        }
    })
}
function changePassword(newPassword) {
    const user = getAuth(db_app).currentUser;
  
    if (!user) {
      // User not logged in
      return Promise.reject("User not logged in.");
    }
  
    const userid = user.uid;
    up(db_ref(db, 'users/' + userid), { 'password': newPassword })

    console.log("updated to firebase")

    return user.updatePassword(newPassword);
  }
  
// Function to change email
function changeEmail(newEmail, email, password) {
    const user = getAuth(db_app).currentUser;
  
    if (!user) {
      // User not logged in
      return Promise.reject("User not logged in.");
    }
    const credential = EmailAuthProvider.credential(email, password);
    reauthenticateWithCredential(user, credential)
        .then(() => {
            updateEmail(user, newEmail)
            .then(() => {
                console.log("email updated in auth successfully")
            })
            .catch((error) => {
                console.log("Error updating email:", error.message)
            })
        })
        .catch((error) => {
            console.log("Error updating email:", error.message)
        })
        up(db_ref(db, 'users/' + user.uid), { 'email': newEmail })
        console.log("updated to firebase")
    
}

function changeUsername(newUsername){
    const user = getAuth(db_app).currentUser;
    up(db_ref(db, 'users/' + user.uid), { 'username': newUsername })
}

function getCurrentTime(){
    // Get current date
    const currentDate = new Date();

    // Options for formatting the time
    const options = {
        timeZone: 'Asia/Shanghai', // Set the timezone to GMT+8 (Shanghai timezone)
        hour12: true, // Use 24-hour format
        hour: 'numeric',
        minute: 'numeric'
    };
        
    // Get the current time in GMT+8
    const timeInGMTPlus8 = currentDate.toLocaleString('en-US', options);
    return timeInGMTPlus8;
}
export { user_id, curr_id, addUser, removeUser, getUsername, changeUsername, changeEmail, changePassword, getCurrentTime, getaccID, acc_id }
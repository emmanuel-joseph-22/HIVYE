import { firebase_app as db_app, HIVYE_database  } from "./../main";
import { getAuth, onAuthStateChanged, updateEmail, updatePassword,  reauthenticateWithCredential, EmailAuthProvider  } from'firebase/auth';
import { ref, onValue} from 'firebase/database';

const fetchUserData = (uid) => {
    return new Promise((resolve, reject) => {
      const user_ref = ref(HIVYE_database, 'users/' + uid);
  
      onValue(user_ref, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          resolve([data.display_name, data.username, data.birthday]); // ✅ Resolve with data
        } else {
          reject("User data not found");
        }
      }, (error) => {
        reject(error);
      });
    });
}

const fetchUserPostsId = (uid) => {
    return new Promise((resolve, reject) => {
      const user_ref = ref(HIVYE_database, 'users/' + uid);
  
      onValue(user_ref, (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.keys(snapshot.val().interactions.user_posts);
          // console.lag('post ids ni user: ', data)
          resolve(data); // Resolve with data
        } else {
          reject("User data not found");
        }
      }, (error) => {
        reject(error);
      });
    });
}



export const admin_name = "Counselor"

function getaccID(data){
    acc_id = []
    acc_id.push(data)
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


export { fetchUserData, fetchUserPostsId}
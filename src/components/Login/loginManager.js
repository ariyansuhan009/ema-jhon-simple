import * as firebase from "firebase/app";
import { apps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    /* if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    } */

    firebase.initializeApp(firebaseConfig);
}


export const handleGoogleSignIn = () => {
      
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  export const handleFbSignIn = () => {
    const auth = getAuth();
    const fbProvider = new FacebookAuthProvider();
    return signInWithPopup(auth,fbProvider)
    .then( result => {
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  export const handleSignOut = () => {
    const auth = getAuth();
    return auth.signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      return signedOutUser;
    }).catch(err => {
        console.log(err);
    });
  }

 export const createUserWithEmailAndPassword = (name, email, password) => {
   const auth = getAuth();
    return auth.createUserWithEmailAndPassword(email, password)
    .then( res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      verifyEmail();
      return newUserInfo;
    })
    .catch( error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
 }

 export const signInWithEmailAndPassword = (email, password) =>{
   const auth = getAuth();
    return auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch(function(error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
 }

 const updateUserName = name =>{
    const auth = getAuth();
    const user = auth.currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('User name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }

  const verifyEmail = () => {

    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
      });
  }

 export const resetPassword = email => {

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
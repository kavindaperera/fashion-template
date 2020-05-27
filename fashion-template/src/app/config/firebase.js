import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDgLsvomzUN0uBvH-QvBjfp_yvBPgeSuR8",
    authDomain: "ecom-cse.firebaseapp.com",
    databaseURL: "https://ecom-cse.firebaseio.com",
    projectId: "ecom-cse",
    storageBucket: "ecom-cse.appspot.com",
    messagingSenderId: "535828749873",
    appId: "1:535828749873:web:9573bbfb53bfdda483bf10",
    measurementId: "G-YJ8SS26M4K"
}


// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore();

firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.')

      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ....
          console.log(' The current browser does not support all of the features required to enable persistence')
      }
  });


// 


export default firebase;
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



firebase.initializeApp(firebaseConfig);
firebase.firestore();


// 


export default firebase;
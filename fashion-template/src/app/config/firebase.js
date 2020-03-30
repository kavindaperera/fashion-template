import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyA9yLVYNOVilDU5rvUzjt14DZ4KVE6p1qo",
    authDomain: "fashion-template-ae428.firebaseapp.com",
    databaseURL: "https://fashion-template-ae428.firebaseio.com",
    projectId: "fashion-template-ae428",
    storageBucket: "fashion-template-ae428.appspot.com",
    messagingSenderId: "243399621503",
    appId: "1:243399621503:web:00a610b7ae8bc38b89384a",
    measurementId: "G-JG0DST79RQ"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
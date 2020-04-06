import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCYnzL0jsdr0eErI74VedANNoseVfYsIkI",
    authDomain: "electronics-template.firebaseapp.com",
    databaseURL: "https://electronics-template.firebaseio.com",
    projectId: "electronics-template",
    storageBucket: "electronics-template.appspot.com",
    messagingSenderId: "807802334387",
    appId: "1:807802334387:web:49c900401304a6063294c6",
    measurementId: "G-FH221XRGNM"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyADl4hOIh5Gqj7i7ehMOhP6SivIJY_ojAU",
    authDomain: "wireframehw4.firebaseapp.com",
    databaseURL: "https://wireframehw4.firebaseio.com",
    projectId: "wireframehw4",
    storageBucket: "wireframehw4.appspot.com",
    messagingSenderId: "403579452724",
    appId: "1:403579452724:web:85d0a1102e145e3d6b3961",
    measurementId: "G-E1JNJ6H449"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;
// Config file
import firebase from 'firebase';

//just free version
const firebaseConfig = {
   apiKey: "AIzaSyB4S1fJ3teRiu6nNnfaDAJfanSq27Yu8ZU",
   authDomain: "permission-editor.firebaseapp.com",
   databaseURL: "https://permission-editor.firebaseio.com",
   projectId: "permission-editor",
   storageBucket: "permission-editor.appspot.com",
   messagingSenderId: "261584327480",
   appId: "1:261584327480:web:266eb7ba52da8a881ae7cd"
 };

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
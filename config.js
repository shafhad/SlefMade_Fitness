import * as firebase from "firebase";
require("@firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyDIlXGqlWB8SjWf_hZeDjuMpr8PJ1wyF74",
  authDomain: "fitness-app-4387a.firebaseapp.com",
  projectId: "fitness-app-4387a",
  storageBucket: "fitness-app-4387a.appspot.com",
  messagingSenderId: "307002751554",
  appId: "1:307002751554:web:bb1aba054474e21e308bdb"
};
if (!firebase.apps.length)

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
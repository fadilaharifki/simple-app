import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBwJNi6_VfBthcH983er3x2IQAEdHkr65c",
    authDomain: "simple-app-8b46c.firebaseapp.com",
    databaseURL: "https://simple-app-8b46c-default-rtdb.firebaseio.com",
    projectId: "simple-app-8b46c",
    storageBucket: "simple-app-8b46c.appspot.com",
    messagingSenderId: "237742490493",
    appId: "1:237742490493:web:606d7fa7bdc4826fddc214",
    measurementId: "G-YC1R33DZ85",
};

firebase.initializeApp(firebaseConfig);

export async function loginUser(email: string, password: string) {
    try {
        const response = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

import firebase from "firebase";
import { toast } from "./toast";

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
        const response: any = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);

        toast("You have logged in!", 2000);
        let arr: object = {
            isLogin: true,
            uid: response.user.uid,
        };
        return arr;
    } catch (error) {
        toast(error.message, 2000);
        return false;
    }
}

export async function registerUser(email: string, password: string) {
    try {
        const response: any = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

        let username: string = "";
        for (let i = 0; i < response.user.email.length; i++) {
            if (response.user.email[i] !== "@") {
                username += response.user.email[i];
            } else {
                break;
            }
        }

        firebase
            .database()
            .ref("users/" + response.user.uid)
            .set({
                fullName: username.toLowerCase(),
                username: username.toLowerCase(),
                email: response.user.email,
                birthdate: new Date().toISOString().split("T")[0],
            });

        return true;
    } catch (error) {
        toast(error.message, 2000);
        return false;
    }
}

export async function updateUser(uid: string, obj: object) {
    try {
        firebase
            .database()
            .ref("users/" + uid)
            .update(obj);
        toast("Update successfully", 2000);
        return true;
    } catch (error) {
        toast(error.message, 2000);
        return false;
    }
}

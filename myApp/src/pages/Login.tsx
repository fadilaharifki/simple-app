import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../firebaseConfig";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const inputEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const inputPassword = (e: any) => {
        setPassword(e.target.value);
    };

    async function login() {
        const res = await loginUser(email, password);
        console.log(`${res} ? "Login Succes" : "Failed"`);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Simple App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div>
                    <div className="text-center text-xl m-5">Please Login</div>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput onIonChange={inputEmail}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput onIonChange={inputPassword}></IonInput>
                    </IonItem>
                    <IonButton onClick={login} color="primary">
                        Login
                    </IonButton>
                    <div className="text-center m-5 text-lg">
                        Do you have account? if not,
                        <Link to="/register">sign up</Link>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;

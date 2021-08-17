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
    useIonViewWillEnter,
} from "@ionic/react";
import "./Login.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../firebaseConfig";

const Login: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useIonViewWillEnter(() => {
        if (localStorage.logged) {
            history.push("/profile");
        } else {
            history.push("/login");
        }
    });

    const inputEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const inputPassword = (e: any) => {
        setPassword(e.target.value);
    };

    async function login() {
        const res: any = await loginUser(email, password);
        if (res) {
            localStorage.setItem("logged", res.isLogin);
            localStorage.setItem("uid", res.uid);
            history.push("/profile");
        }
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
                        <IonInput
                            type="password"
                            onIonChange={inputPassword}
                        ></IonInput>
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

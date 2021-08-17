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
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "../toast";
import { registerUser } from "../firebaseConfig";

const Register: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState();

    const inputEmail = (e: any) => {
        setEmail(e.target.value);
    };
    const inputPassword = (e: any) => {
        setPassword(e.target.value);
    };
    const inputRPassword = (e: any) => {
        if (password === e.target.value) {
            setRepeatPassword(e.target.value);
            toast("Password is match", 2000);
        } else {
            toast("Password do no match", 2000);
        }
    };

    const register = () => {
        if (password === repeatPassword) {
            const res: any = registerUser(email, password);
            if (res) {
                toast("Registration successfully", 2000);
                history.push("/login");
            } else {
                toast("Registration failed", 2000);
            }
        } else {
            toast("Password do no match", 2000);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Simple App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div>
                    <div className="text-center text-xl m-5">Register</div>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput onIonChange={inputEmail}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                            onIonChange={inputPassword}
                            type="password"
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Repeat Password</IonLabel>
                        <IonInput
                            onIonChange={inputRPassword}
                            type="password"
                        ></IonInput>
                    </IonItem>
                    <IonButton onClick={register} color="primary">
                        Register
                    </IonButton>
                </div>
                <div className="text-center m-5 text-lg">
                    Do you have account? <Link to="/login">Login</Link>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;

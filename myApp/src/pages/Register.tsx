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
import { Link } from "react-router-dom";

const Register: React.FC = () => {
    const inputEmail = () => {};
    const inputPassword = () => {};
    const inputRPassword = () => {};

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
                    <IonButton color="primary">Register</IonButton>
                </div>
                <div className="text-center m-5 text-lg">
                    Do you have account? <Link to="/login">Login</Link>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;

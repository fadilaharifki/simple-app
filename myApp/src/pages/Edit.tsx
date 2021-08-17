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
import "./Register.css";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "../toast";
import { updateUser } from "../firebaseConfig";
import firebase from "firebase";

const Edit: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [birthdate, setBirthdate] = useState();
    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        if (localStorage.logged) {
            history.push("/edit");
        } else {
            history.push("/login");
        }
        const userRef = firebase.database().ref(`users/${localStorage.uid}`);
        userRef.on("value", (snapshot) => {
            const dataVal = snapshot.val();
            setFullName(dataVal.fullName);
            setUsername(dataVal.username);
            setEmail(dataVal.email);
            setBirthdate(dataVal.birthdate);
            setLoading(true);
        });
    }, []);

    const inputFullName = (e: any) => {
        setFullName(e.target.value);
    };
    const inputUsername = (e: any) => {
        setUsername(e.target.value);
    };
    const inputBirthdate = (e: any) => {
        setBirthdate(e.target.value);
    };
    const inputEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const update = () => {
        let obj: object = {
            fullName,
            username,
            email,
            birthdate,
        };
        updateUser(localStorage.uid, obj);
        history.push("/profile");
    };

    if (!loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className="flex flex-row justify-between">
                        <IonTitle>Profile Edit</IonTitle>
                        <div>
                            <IonButton routerLink="/profile">Back</IonButton>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div>
                    <div className="text-center text-xl m-5">Update</div>
                    <IonItem>
                        <IonLabel position="floating">Full Name</IonLabel>
                        <IonInput
                            value={fullName}
                            onIonChange={inputFullName}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput
                            value={username}
                            onIonChange={inputUsername}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput
                            value={email}
                            onIonChange={inputEmail}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Birthdate</IonLabel>
                        <IonInput
                            value={birthdate}
                            placeholder=""
                            type="date"
                            onIonChange={inputBirthdate}
                        ></IonInput>
                    </IonItem>
                    <IonButton onClick={update} color="primary">
                        Update
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Edit;

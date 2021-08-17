import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonItem,
    IonCardTitle,
    IonButton,
    IonCardContent,
    useIonViewWillEnter,
} from "@ionic/react";
import "./Profile.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase";
import { toast } from "../toast";

const Profile: React.FC = () => {
    const history = useHistory();
    const [data, setData] = useState([]);

    useIonViewWillEnter(() => {
        if (localStorage.logged || localStorage.uid) {
            history.push("/profile");
            const userRef = firebase
                .database()
                .ref(`users/${localStorage.uid}`);
            let newUserState: any = [];
            userRef.on("value", (snapshot) => {
                const dataVal = snapshot.val();
                newUserState.push({
                    fullName: dataVal.fullName,
                    username: dataVal.username,
                    email: dataVal.email,
                    birthdate: dataVal.birthdate,
                });
                setData(newUserState);
            });
        } else {
            history.push("/login");
            toast("Login first", 2000);
        }
    });

    const logout = () => {
        localStorage.clear();
        history.push("/login");
    };

    const toPageEdit = () => {
        history.push("/edit", data);
    };

    if (!data) {
        return <h1>Loading...</h1>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className="flex flex-row justify-between">
                        <IonTitle>Profile</IonTitle>
                        <div>
                            <IonButton onClick={logout}>Logout</IonButton>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="flex justify-center">
                    {data.map((e: any, i: any) => {
                        return (
                            <IonCard key={i}>
                                <IonItem className="mt-4">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjDs_DDRdzFtUnzGJhwwd4lqwMVEmoQ5vIax9FUt-7qItAflpvwaRv4LEf9GzIpRRuu-U&usqp=CAU"
                                        alt=""
                                    />
                                </IonItem>
                                <IonCardContent>
                                    <IonCardTitle>{e.fullName}</IonCardTitle>
                                    <div>{e.birthdate}</div>
                                    <IonButton
                                        onClick={toPageEdit}
                                        fill="outline"
                                        slot="end"
                                    >
                                        Edit
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>
                        );
                    })}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Profile;

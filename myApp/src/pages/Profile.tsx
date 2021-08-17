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
    IonIcon,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonRouterOutlet,
    IonTabs,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { ellipse, square, triangle } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import "./Profile.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase";

const Profile: React.FC = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    console.log(data, "ini data");

    useEffect(() => {
        if (localStorage.logged) {
            history.push("/profile");
        } else {
            history.push("/login");
        }
        const userRef = firebase.database().ref(`users/${localStorage.uid}`);
        let newUserState: any = [];
        userRef.on("value", (snapshot) => {
            console.log(snapshot.val(), "snapshot");
            const dataVal = snapshot.val();
            newUserState.push({
                fullName: dataVal.fullName,
                username: dataVal.username,
                email: dataVal.email,
                birthdate: dataVal.birthdate.toLocaleString(),
            });
            setData(newUserState);
        });
    }, []);

    const logout = () => {
        localStorage.clear();
        history.push("/login");
    };

    if (!data) {
        return <h1>Loading...</h1>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
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
                                    <IonButton fill="outline" slot="end">
                                        Edit
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>
                        );
                    })}
                </div>
                <div>
                    <IonButton onClick={logout}>Logout</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Profile;

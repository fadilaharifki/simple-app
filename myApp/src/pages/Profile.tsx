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
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Profile.css";
import { pin } from "ionicons/icons";

const Profile: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="flex justify-center">
                    <IonCard>
                        <IonItem className="mt-4">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjDs_DDRdzFtUnzGJhwwd4lqwMVEmoQ5vIax9FUt-7qItAflpvwaRv4LEf9GzIpRRuu-U&usqp=CAU"
                                alt=""
                            />
                        </IonItem>

                        <IonCardContent>
                            <IonCardTitle>
                                {/* <div>Name</div> */}Name
                            </IonCardTitle>
                            <div>Birthdate</div>
                            <IonButton fill="outline" slot="end">
                                Edit
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Profile;

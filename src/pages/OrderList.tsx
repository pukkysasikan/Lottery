import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import http from "../utils/AxiosUtils";
import {
  chevronDown,
  chevronDownCircle,
  chevronForwardCircle,
  colorPalette,
  document,
  globe,
  printOutline,
  trashOutline,
} from "ionicons/icons";

interface ContainerProps {
  data: any;
}

const Tab2 = (props: ContainerProps) => {
  const [present, dismiss] = useIonToast();
  const [data, setData] = useState([]);

  const toast = (position: "top" | "middle" | "bottom", message: string, timeout: number = 2000) => {
    present({
      message: message,
      duration: timeout,
      position: position,
    });
  };

  const deleteOrder = async (id: number) => {
    const res = await http.delete(`/lottory/${id}`);
    if (res && res.status === 200) {
      await getLottoryOrder();
      toast("top", "ลบข้อมูลสำเร็จ");
    }
  };

  const getLottoryOrder = async () => {
    const res = await http.get("/lottories");
    if (res && res.status === 200) {
      console.log(res.data);
      setData(res.data.data);
    }
  };

  const getTextType = (type: string) => {
    const length = type.length;
    if (length === 2) {
      return "2 ตัว";
    } else if (length === 3) {
      return "3 ตัว";
    }
  };

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const renderOrder = () => {
    return data.map((item: any, index: number) => {
      return (
        <IonRow key={item.id} style={{ borderBottom: "1px solid #D9D9D9" }}>
          <IonCol className="col-order ion-no-padding col-center" style={{ textAlign: "center" }}>
            <IonText>{item.number}</IonText>
          </IonCol>
          <IonCol className="ion-no-padding col-center" style={{ textAlign: "center" }}>
            <IonText>{item.straight}</IonText>
          </IonCol>
          <IonCol className="col-order ion-no-padding col-center" style={{ textAlign: "center" }}>
            <IonText>{item.two_digit}</IonText>
          </IonCol>
          <IonCol className="ion-no-padding col-center" style={{ textAlign: "center" }}>
            <IonText>{item.lower}</IonText>
          </IonCol>

          <IonCol size="auto" className="ion-no-padding col-order col-center" style={{ width: 40 }}>
            <IonIcon
              icon={trashOutline}
              onClick={() => {
                deleteOrder(item.id);
              }}
              className="icon-delete"
            />
          </IonCol>
        </IonRow>
      );
    });
  };

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar className="toolbar-section">
          <div>
            <IonText className="title">รายการซื้อ</IonText>
            <div>
              {/* <IonButton
                size="small"
                className="btn-generate-swap"
                style={{
                  borderRadius: 10,
                  marginLeft: "-1.22px",
                }}
                onClick={() => {
                  location.replace("/report?type=2");
                }}
                color="success"
              >
                <IonIcon icon={printOutline} size="lerge"></IonIcon>
                <IonText>2ตัว</IonText>
              </IonButton>
              <IonButton
                size="small"
                className="btn-generate-swap"
                style={{
                  borderRadius: 10,
                  marginLeft: "-1.22px",
                }}
                onClick={() => {
                  location.replace("/report?type=3");
                }}
                color="success"
              >
                <IonIcon icon={printOutline} size="lerge"></IonIcon>
                <IonText>3ตัว</IonText>
              </IonButton> */}
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen overflow-scroll="true">
        <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
          <IonFabButton>
            <IonIcon icon={printOutline}></IonIcon>
          </IonFabButton>
          <IonFabList side="bottom">
            <IonFabButton
              onClick={() => {
                location.replace("/report?type=2");
              }}
            >
              2
            </IonFabButton>
            <IonFabButton
              onClick={() => {
                location.replace("/report?type=3");
              }}
            >
              3
            </IonFabButton>
          </IonFabList>
        </IonFab>
        <IonGrid>
          <IonRow className="header-sticky">
            <IonCol style={{ textAlign: "center", backgroundColor: "white" }}>
              <IonText>เลข</IonText>
            </IonCol>
            <IonCol className="col-order" style={{ textAlign: "center" }}>
              <IonText>ตรง</IonText>
            </IonCol>
            <IonCol style={{ textAlign: "center", backgroundColor: "white" }}>
              <IonText>โต๊ด</IonText>
            </IonCol>
            <IonCol className="col-order" style={{ textAlign: "center" }}>
              <IonText>ล่าง</IonText>
            </IonCol>
            <IonCol size="1.3" style={{ width: 30, backgroundColor: "white" }} className="col-order"></IonCol>
          </IonRow>
          {renderOrder()}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

import {
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonInput,
} from "@ionic/react";

const ThreeDigitTable: React.FC = () => {
  return (
    <div className="segment-container">
      <IonList>
        <IonGrid>
          <IonRow>
            <IonCol className="grid-col-digit">
              <IonText>เลข</IonText>
            </IonCol>
            <IonCol className="grid-col-digit">
              <IonText>ตรง</IonText>
            </IonCol>
            <IonCol className="grid-col-digit">
              <IonText>โต๊ด</IonText>
            </IonCol>
            <IonCol className="grid-col-digit">
              <IonText>ล่าง</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol className="grid-col-digit-input ion-no-padding">
              <IonCard
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  margin: "0px",
                  border: "solid 2px #DFDFDF",
                  boxShadow: "none",
                  borderRadius: 10,
                }}
              >
                <IonInput
                  style={{ margin: "0px", fontSize: "22px" }}
                ></IonInput>
              </IonCard>
            </IonCol>
            <IonCol className="grid-col-digit-input ion-no-padding">
              <IonCard
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  margin: "0px",
                  border: "solid 2px #DFDFDF",
                  boxShadow: "none",
                  borderRadius: 10,
                }}
              >
                <IonInput
                  style={{ margin: "0px", fontSize: "22px" }}
                ></IonInput>
              </IonCard>
            </IonCol>
            <IonCol className="grid-col-digit-input ion-no-padding">
              <IonCard
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  margin: "0px",
                  border: "solid 2px #DFDFDF",
                  boxShadow: "none",
                  borderRadius: 10,
                }}
              >
                <IonInput
                  style={{ margin: "0px", fontSize: "22px" }}
                ></IonInput>
              </IonCard>
            </IonCol>
            <IonCol className="grid-col-digit-input ion-no-padding">
              <IonCard
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  margin: "0px",
                  border: "solid 2px #DFDFDF",
                  boxShadow: "none",
                  borderRadius: 10,
                }}
              >
                <IonInput
                  style={{ margin: "0px", fontSize: "22px" }}
                ></IonInput>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonList>
    </div>
  );
};

export default ThreeDigitTable;

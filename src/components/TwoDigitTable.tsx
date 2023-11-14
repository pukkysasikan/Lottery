import {
  IonCard,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { readAllData, createData } from "../utils/firestore";

const TwoDigitTable: React.FC = () => {
  const [twoDigit, setTwoDigit] = useState<any[]>([]);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    readAllData("twoDigit").then((data) => {
      console.log(data);
      setTwoDigit(data);
      setLength(data.length);
    });
  }, []);

  const saveDataOnBlur = async (e: any, index?: number) => {
    const payload = {
      [e.target.name]: e.target.value,
    };
    if (index !== undefined) {
      await createData("twoDigit", payload, index);
    } else {
      await createData("twoDigit", payload, length);
      e.target.value = "";
    }
    const data = await readAllData("twoDigit");
    setTwoDigit(data);
    setLength(data.length);
  };

  return (
    <div className="segment-container">
      <IonList>
        <IonGrid>
          <IonRow>
            <IonCol className="grid-col-digit">
              <IonText>เลข</IonText>
            </IonCol>
            <IonCol className="grid-col-digit">
              <IonText>บน</IonText>
            </IonCol>
            <IonCol className="grid-col-digit">
              <IonText>ล่าง</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          {twoDigit.length > 0 &&
            twoDigit.map((item, index) => (
              <IonRow style={{ marginBottom: "0.5rem" }} key={index}>
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
                      className={`digit-input-${index}`}
                      name="digit"
                      onBlur={(e) => saveDataOnBlur(e, index)}
                      value={item.digit}
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
                      className={`up-input-${index}`}
                      name="up"
                      onBlur={(e) => saveDataOnBlur(e, index)}
                      value={item.up}
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
                      className={`down-input-${index}`}
                      name="down"
                      onBlur={(e) => saveDataOnBlur(e, index)}
                      value={item.down}
                      style={{ margin: "0px", fontSize: "22px" }}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
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
                  name="digit"
                  onBlur={(e) => saveDataOnBlur(e)}
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
                  name="up"
                  onBlur={(e) => saveDataOnBlur(e)}
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
                  name="down"
                  onBlur={(e) => saveDataOnBlur(e)}
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

export default TwoDigitTable;

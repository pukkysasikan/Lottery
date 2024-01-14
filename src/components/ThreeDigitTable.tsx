import {
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonInput,
  IonIcon,
  IonButton,
  IonToast,
  IonNote,
  IonBadge,
  IonLabel,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { trashOutline } from "ionicons/icons";

interface InputData {
  id?: string;
  number?: string;
  straight?: string;
  twoDigit?: string;
  lower?: string;
}

const ThreeDigitTable: React.FC = () => {
  const [dataList, setDataList] = useState<any[]>([]);
  const [length, setLength] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(false);
  const [focusValue, setFocusValue] = useState<string>("");
  
  const [inputData, setInputData] = useState<InputData>({});
  const [dataListInput, setDataListInput] = useState<InputData[]>([]);

  const handleInputChange = (e: any, id?: string) => {
    const { name, value } = e.target;
    if (value.length >= 2) {
      if (id) {
        const newDataList = dataList.map((item) => {
          if (item.id === id) {
            item[name] = value;
          }
          return item;
        });
        setDataList(newDataList);
      } else {
        setDataList(
          dataList.concat({
            id: generateUUID(),
            [name]: value,
          })
        );
      }
    }
    e.target.value = "";
  }

  useEffect(() => { 
    console.log("dataList", dataList);
    const lastData = dataList[dataList.length - 1]
    if (!lastData?.straight) {
      const id = lastData?.id;
      // focus last input
      if (id) {
        const input = document.getElementById(`input-${id}`);
        if (input) {
          (document.activeElement as HTMLElement)?.blur();
          input?.getElementsByTagName("input")[0].focus();
        }
      }
    }
  }, [dataList]);

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      // eslint-disable-next-line
      const r = (Math.random() * 16) | 0,
        // eslint-disable-next-line
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const deleteRow = (id: string) => {
    const result = dataList.filter((item) => item.id !== id);
    setDataList(result);
  }

  const onClickGenerateSwap = async () => {
    const swap = swapDigitNumberUnique(focusValue);
    swap.forEach(async (item, index) => {
      const payload = {
        number: item,
      };
    });
  };

  const factorial = (n: number): number => {
    if (n === 1) {
      return 1;
    }
    return n * factorial(n - 1);
  };

  const swapDigitNumberUnique = (number: String) => {
    // [123, 132, 213, 231, 312, 321]
    const result = [];
    const arr = number.split("");
    const len = arr.length;

    const total = factorial(len);
    let i = 0;
    while (i < total) {
      const random = Math.floor(Math.random() * len);
      const temp = arr[random];
      arr[random] = arr[0];
      arr[0] = temp;
      const str = arr.join("");
      if (result.indexOf(str) === -1) {
        result.push(str);
        i++;
      }
    }
    // pop ตัวเดิมออก
    result.pop();
    return result.reverse();
  };

  return (
    <div className="segment-container">
      <IonToast isOpen={load} message="บันทึดข้อมูล..." />
      <IonList>
        <IonGrid>
          <IonRow>
            <IonText style={{ width: 20 }}></IonText>
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

            <IonText style={{ width: 30 }}></IonText>
          </IonRow>
        </IonGrid>

        <IonGrid style={{ marginTop: -10 }}>
          <IonRow>
            <IonText style={{ width: 18 }}></IonText>
            <IonCol>
              <IonButton
                color="medium"
                size="small"
                className="btn-generate-swap"
                style={{
                  borderRadius: 10,
                  marginLeft: "-1.22px",
                }}
                onClick={onClickGenerateSwap}>
                <span style={{ color: "black", fontFamily: "Mali" }}>
                  6 กลับ
                </span>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid style={{ marginTop: -10 }}>
          {dataList.length > 0 &&
            dataList.map((data, index) => (
              <IonRow key={index} style={{ marginBottom: 10 }}>
                <IonText
                  style={{
                    fontSize: "20px",
                    color: "#9d9fa6",
                    paddingTop: 10,
                    paddingRight: 10,
                  }}>
                  {index + 1}
                </IonText>
                <IonCol className="grid-col-digit-input ion-no-padding">
                  <IonCard
                    style={{
                      backgroundColor: "#fff",
                      width: "100%",
                      margin: "0px",
                      border: "solid 2px #DFDFDF",
                      boxShadow: "none",
                      borderRadius: 10,
                    }}>
                    <IonInput
                      name="number"
                      value={data.number}
                      onIonBlur={(e) => handleInputChange(e, data.id)}
                      style={{ margin: "0px", fontSize: "22px" }}></IonInput>
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
                    }}>
                    <IonInput
                      name="straight"
                      id={`input-${data.id}`}
                      value={data.straight}
                      onIonBlur={(e) => handleInputChange(e, data.id)}
                      style={{ margin: "0px", fontSize: "22px" }}></IonInput>
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
                    }}>
                    <IonInput
                      name="twoDigit"
                      disabled={data.number?.length === 2 ? true : false}
                      value={data.twoDigit}
                      onIonBlur={(e) => handleInputChange(e, data.id)}
                      style={{ margin: "0px", fontSize: "22px" }}></IonInput>
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
                    }}>
                    <IonInput
                      name="lower"
                      value={data.lower}
                      onIonBlur={(e) => handleInputChange(e, data.id)}
                      style={{ margin: "0px", fontSize: "22px" }}></IonInput>
                  </IonCard>
                </IonCol>
                <IonButton
                  className="ion-no-padding btn-delete-num"
                  color="medium"
                  onClick={(_) => deleteRow(data.id)}>
                  <IonIcon
                    icon={trashOutline}
                    size="lerge"
                    className="icon-delete-num"></IonIcon>
                </IonButton>
              </IonRow>
            ))}

          <IonRow>
            <IonText
              style={{
                fontSize: "20px",
                color: "#9d9fa6",
                paddingTop: 10,
                paddingRight: 10,
              }}>
              {length + 1}
            </IonText>
            <IonCol className="grid-col-digit-input ion-no-padding">
              <IonCard
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  margin: "0px",
                  border: "solid 2px #DFDFDF",
                  boxShadow: "none",
                  borderRadius: 10,
                }}>
                <IonInput
                  name="number"
                  onIonBlur={(e) => handleInputChange(e)}
                  style={{ margin: "0px", fontSize: "22px" }}></IonInput>
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
                }}>
                <IonInput
                  name="straight"
                  onIonBlur={(e) => handleInputChange(e)}
                  style={{ margin: "0px", fontSize: "22px" }}></IonInput>
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
                }}>
                <IonInput
                  name="twoDigit"
                  onIonBlur={(e) => handleInputChange(e)}
                  style={{ margin: "0px", fontSize: "22px" }}></IonInput>
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
                }}>
                <IonInput
                  name="lower"
                  onIonBlur={(e) => handleInputChange(e)}
                  style={{ margin: "0px", fontSize: "22px" }}></IonInput>
              </IonCard>
            </IonCol>
            <IonButton className="ion-no-padding btn-delete-num" color="medium">
              <IonIcon
                icon={trashOutline}
                size="lerge"
                className="icon-delete-num"></IonIcon>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonList>
    </div>
  );
};

export default ThreeDigitTable;

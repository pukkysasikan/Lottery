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
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { trashOutline } from "ionicons/icons";
import dayjs from "dayjs";
import axios from "axios";

interface InputData {
  id?: string;
  number?: string;
  straight?: string;
  twoDigit?: string;
  lower?: string;
}

const ThreeDigitTable: React.FC = () => {
  const [present] = useIonToast();
  const [dataList, setDataList] = useState<any[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [focusValue, setFocusValue] = useState<string>("");
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [currentRowId, setCurrentRowId] = useState<string>("");

  const [inputData, setInputData] = useState<InputData>({});
  const [dataListInput, setDataListInput] = useState<InputData[]>([]);

  const handleInputChange = (e: any, id?: string) => {
    const { name, value } = e.target;
    if (value && value.length >= 2) {
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
    } else {
      if (id) {
        const newDataList = dataList.map((item) => {
          if (item.id === id) {
            item[name] = value;
          }
          return item;
        });
        setDataList(newDataList);
      }
    }
    e.target.value = "";
    saveFocusValue("");
  };

  useEffect(() => {
    const lastData = dataList[dataList.length - 1];
    if (!lastData?.straight) {
      const id = lastData?.id;
      // focus last input
      if (id && focusValue.length === 0) {
        const input = document.getElementById(`input-${id}`);
        if (input) {
          (document.activeElement as HTMLElement)?.blur();
          const interval = setInterval(() => {
            if (input?.getElementsByTagName("input")[0]) {
              input?.getElementsByTagName("input")[0].focus();
              clearInterval(interval);
            }
            clearInterval(interval);
          }, 100);
        }
      }
    }
  }, [dataList.length]);

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      // eslint-disable-next-line
      const r = (Math.random() * 16) | 0,
        // eslint-disable-next-line
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const deleteRow = (id: string) => {
    const result = dataList.filter((item) => item.id !== id);
    setDataList(result);
  };

  const onClickGenerateSwap = async () => {
    const swap = swapDigitNumberUnique(focusValue);
    const dataSwap = swap.map(async (item, index) => {
      return {
        id: generateUUID(),
        number: item,
      };
    });
    const resulr = await Promise.all(dataSwap);
    if (dataSwap.length > 1) {
      setDataList(dataList.concat(resulr));
    }
  };

  const swapDigitNumberUnique = (number: String) => {
    // input string: 123
    // result is [132, 213, 231, 312, 321]
    const result: string[] = [];
    const swap = (arr: string[], a: number, b: number) => {
      const temp = arr[a];
      arr[a] = arr[b];
      arr[b] = temp;
      return arr.join("");
    };
    const swapDigit = (arr: string[], start: number) => {
      if (start === arr.length - 1) {
        result.push(arr.join(""));
        return;
      }
      for (let i = start; i < arr.length; i++) {
        swap(arr, start, i);
        swapDigit(arr, start + 1);
        swap(arr, start, i);
      }
    };
    swapDigit(number.split(""), 0);
    result.shift();
    return result;
  };

  const enableSwap = () => {
    const unique = new Set(focusValue);
    if (unique.size === focusValue.length) {
      return false;
    }
    return true;
  };

  /**
   * Displays a toast message at the specified position with the given message and timeout.
   * @param position The position of the toast message ('top', 'middle', or 'bottom').
   * @param message The message to be displayed in the toast.
   * @param timeout The duration of the toast message in milliseconds (default: 2000).
   */
  const presentToast = (position: "top" | "middle" | "bottom", message: string, timeout: number = 2000) => {
    present({
      message: message,
      duration: timeout,
      position: position,
    });
  };

  const copyNumber = (key: string) => {
    let tagId = "";
    switch (key) {
      case "straight":
        tagId = `input-${currentRowId}`;
        break;
      case "twoDigit":
        tagId = `input-two-${currentRowId}`;
        break;
      case "lower":
        tagId = `input-lower-${currentRowId}`;
        break;
      default:
        break;
    }
    const value = document.getElementById(tagId)?.getElementsByTagName("input")[0]?.value || "";
    if (value.length > 0) {
      if (!isNaN(Number(value))) {
        const newDataList = dataList.map((item, index) => {
          if (index === currentRowIndex + 1) {
            item[key] = value;
          }
          return item;
        });
        setDataList(newDataList);
        if (currentRowIndex < dataList.length - 1) {
          setCurrentRowIndex(currentRowIndex + 1);
        } else {
          for (let i = 0; i < dataList.length; i++) {
            if (dataList[i][key] === "" || dataList[i][key] === undefined) {
              setCurrentRowIndex(i - 1);
              break;
            }
          }
          presentToast("top", "ไม่สามารถคัดลอกได้");
        }
      } else {
        presentToast("top", "กรุณาใส่เลข");
      }
    } else {
      presentToast("top", "กรุณาใส่เลข");
    }
  };

  const swap2Char = () => {
    // get value from focus input
    const value = focusValue;
    // check value is not empty
    if (value.length > 0) {
      // check value is not number
      if (!isNaN(Number(value))) {
        // check value is not 2 digit
        if (value.length === 2) {
          // swap 2 digit
          const swap = value.split("").reverse().join("");
          // create new data
          const newData = {
            id: generateUUID(),
            number: swap,
          };
          // add new data to list
          setDataList(dataList.concat(newData));
        } else {
          presentToast("top", "กรุณาใส่เลข 2 หลัก");
        }
      } else {
        presentToast("top", "กรุณาใส่เลข");
      }
    } else {
      presentToast("top", "กรุณาใส่เลข");
    }
  };

  const onTangHuay = async () => {
    setLoad(true);
    const result = await Promise.all(
      dataList.map((item) => {
        return {
          id: 0,
          created_at: new Date(),
          updated_at: new Date(),
          name: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          number: item.number,
          straight: item.straight,
          two_digit: item.twoDigit ? item.twoDigit : "",
          lower: item.lower,
        };
      })
    );
    const res = await axios.post("https://lotto-backend.vercel.app/api/v1/lottories", result);
    if (res && res.status === 200 && res.data.message === "OK") {
      setDataList([]);
      presentToast("top", "บันทึกข้อมูลสำเร็จ");
    }
    setLoad(false);
  };

  const saveFocusValue = (value: string) => {
    if (value.length > 0) {
      setFocusValue(value);
    }
  };

  return (
    <div className="segment-container">
      <div id="container-lotto">
        <IonToast isOpen={load} message="บันทึกข้อมูล..." />
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
                <IonText className="grid-col-digit" onClick={onClickGenerateSwap} style={{ fontSize: "14px" }}>
                  6 กลับ
                </IonText>
              </IonCol>
              {/* <IonButton
                  color="medium"
                  size="small"
                  className="btn-generate-swap"
                  style={{
                    borderRadius: 10,
                    marginLeft: "-1.22px",
                  }}
                  disabled={focusValue.length === 0 || enableSwap()}
                  onClick={onClickGenerateSwap}
                >
                  <span style={{ color: "black", fontFamily: "Mali" }}>6 กลับ</span>
                </IonButton> */}
            </IonRow>
          </IonGrid>
          <IonGrid style={{ marginTop: -10, overflow: "scroll", height: "450px" }}>
            {dataList.length > 0 &&
              dataList.map((data, index) => (
                <IonRow key={index} style={{ marginBottom: 10 }}>
                  <IonText
                    style={{
                      fontSize: "14px",
                      color: "#9d9fa6",
                      paddingTop: 10,
                      paddingRight: 10,
                    }}
                  >
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
                      }}
                    >
                      <IonInput
                        name="number"
                        value={data.number}
                        onFocus={(e: any) => {
                          saveFocusValue(e.target.value);
                          setCurrentRowIndex(index);
                        }}
                        onIonBlur={(e) => handleInputChange(e, data.id)}
                        onIonChange={(e) => {
                          saveFocusValue(e.target.value as string);
                          setCurrentRowIndex(index);
                        }}
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
                        name="straight"
                        id={`input-${data.id}`}
                        value={data.straight}
                        onFocus={(e: any) => {
                          saveFocusValue(e.target.value);
                          setCurrentRowIndex(data.id);
                          setCurrentRowId(data.id);
                        }}
                        onIonBlur={(e) => handleInputChange(e, data.id)}
                        onIonChange={(e) => {
                          saveFocusValue(e.target.value as string);
                          setCurrentRowIndex(index);
                          setCurrentRowId(data.id);
                        }}
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
                        name="twoDigit"
                        id={`input-two-${data.id}`}
                        disabled={data.number?.length === 2 ? true : false}
                        value={data.twoDigit}
                        onFocus={(e: any) => {
                          saveFocusValue(e.target.value);
                          setCurrentRowIndex(index);
                        }}
                        onIonBlur={(e) => handleInputChange(e, data.id)}
                        onIonChange={(e) => {
                          saveFocusValue(e.target.value as string);
                          setCurrentRowIndex(index);
                        }}
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
                        name="lower"
                        id={`input-lower-${data.id}`}
                        value={data.lower}
                        onFocus={(e: any) => {
                          saveFocusValue(e.target.value);
                          setCurrentRowIndex(index);
                        }}
                        onIonBlur={(e) => handleInputChange(e, data.id)}
                        onIonChange={(e) => {
                          saveFocusValue(e.target.value as string);
                          setCurrentRowIndex(index);
                        }}
                        style={{ margin: "0px", fontSize: "22px" }}
                      ></IonInput>
                    </IonCard>
                  </IonCol>
                  <IonButton
                    className="ion-no-padding btn-delete-num"
                    color="medium"
                    onClick={(_) => deleteRow(data.id)}
                  >
                    <IonIcon icon={trashOutline} size="lerge" className="icon-delete-num"></IonIcon>
                  </IonButton>
                </IonRow>
              ))}

            <IonRow>
              <IonText
                style={{
                  fontSize: "14px",
                  color: "#9d9fa6",
                  paddingTop: 10,
                  paddingRight: 10,
                }}
              >
                {dataList.length + 1}
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
                  }}
                >
                  <IonInput
                    name="number"
                    onIonBlur={(e) => handleInputChange(e)}
                    onIonChange={(e) => setFocusValue(e.target.value as string)}
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
                    name="straight"
                    onIonBlur={(e) => handleInputChange(e)}
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
                    name="twoDigit"
                    onIonBlur={(e) => handleInputChange(e)}
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
                    name="lower"
                    onIonBlur={(e) => handleInputChange(e)}
                    style={{ margin: "0px", fontSize: "22px" }}
                  ></IonInput>
                </IonCard>
              </IonCol>
              <IonButton className="ion-no-padding btn-delete-num" color="medium">
                <IonIcon icon={trashOutline} size="lerge" className="icon-delete-num"></IonIcon>
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonList>
      </div>
      <IonGrid>
        <IonRow>
          <IonText style={{ width: 20 }}></IonText>
          <IonCol className="grid-col-digit" onClick={swap2Char}>
            <IonText style={{ fontSize: "14px" }}>กลับเลข</IonText>
          </IonCol>
          <IonCol className="grid-col-digit" onClick={(_) => copyNumber("straight")}>
            <IonText style={{ fontSize: "14px" }}>คัดลอก</IonText>
          </IonCol>
          <IonCol className="grid-col-digit">
            <IonText style={{ fontSize: "14px" }} onClick={(_) => copyNumber("twoDigit")}>
              คัดลอก
            </IonText>
          </IonCol>
          <IonCol className="grid-col-digit">
            <IonText style={{ fontSize: "14px" }} onClick={(_) => copyNumber("lower")}>
              คัดลอก
            </IonText>
          </IonCol>

          <IonText style={{ width: 30 }}></IonText>
        </IonRow>
      </IonGrid>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <IonButton onClick={onTangHuay}>
          <IonText>แทง</IonText>
        </IonButton>
        <IonButton>
          <IonText>ลบ</IonText>
        </IonButton>
      </div>
    </div>
  );
};

export default ThreeDigitTable;

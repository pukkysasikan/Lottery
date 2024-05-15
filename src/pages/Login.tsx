import { IonList, IonItem, IonInput, IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { useState } from "react";
import http from "../utils/AxiosUtils";

const Login: React.FC = () => {
  const handleLogin = async (e: any) => {
    const username = e.target.username.value;
    const password = e.target.password.value;
    e.preventDefault();
    const res = await http.post("/login", { username, password });
    if (res.data && res.data.status_code === 200 && res.data.message === "OK") {
      sessionStorage.setItem("isLogin", res.data.data.id);
      location.href = "/tab1";
    } else {
      console.log("Login failed");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <form action="" onSubmit={handleLogin}>
          <IonList>
            <IonInput label="Usernane" name="username" placeholder="Enter text"></IonInput>
            <IonInput label="Password input" name="password" placeholder="000"></IonInput>
            <IonButton type="submit">
              <IonText>เข้าสู่ระบบ</IonText>
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default Login;

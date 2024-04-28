import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { cashOutline, documentLockOutline, homeOutline } from "ionicons/icons";
import HomePage from "./pages/HomePage";
import OrderList from "./pages/OrderList";
import BlockNumber from "./pages/BlockNumber";
import Report from "./pages/Report";
import Login from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";
import http from "./utils/AxiosUtils";
import { useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [totalTwo, setTotalTwo] = useState(0);
  const [totalThree, setTotalThree] = useState(0);

  const getLottoryOrder = async () => {
    const res = await http.get("/lottories");
    if (res && res.status === 200) {
      setData(res.data.data);
      const twoDigit = res.data.data.filter((item: any) => item.number.length === 2);
      const threeDigit = res.data.data.filter((item: any) => item.number.length === 3);
      const sumUpperTwo = twoDigit.reduce((acc: number, item: any) => acc + Number(item.two_digit), 0);
      const sumLowerTwo = twoDigit.reduce((acc: number, item: any) => acc + Number(item.lower), 0);

      const sumUpperThree = threeDigit.reduce((acc: number, item: any) => acc + Number(item.two_digit), 0);
      const sumLowerThree = threeDigit.reduce((acc: number, item: any) => acc + Number(item.lower), 0);
      const sumStraightThree = threeDigit.reduce((acc: number, item: any) => acc + Number(item.straight), 0);
      setTotalTwo(sumUpperTwo + sumLowerTwo);
      setTotalThree(sumUpperThree + sumLowerThree + sumStraightThree);
    }
  };

  const onTabChange = (e: CustomEvent) => {
    if (e.detail.tab === "tab2" || e.detail.tab === "tab1") {
      getLottoryOrder();
    }
  };

  const path = window.location.pathname;

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs onIonTabsDidChange={onTabChange}>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <HomePage totalThree={totalThree} totalTwo={totalTwo} />
            </Route>
            <Route path="/tab2">
              <OrderList data={data} />
            </Route>
            <Route path="/tab3">
              <BlockNumber />
            </Route>
            <Route path="/report">
              <Report />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" mode="ios" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>หนัาหลัก</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={cashOutline} />
              <IonLabel>รายการซื้อ</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon aria-hidden="true" icon={documentLockOutline} />
              <IonLabel>เลขอั้น</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

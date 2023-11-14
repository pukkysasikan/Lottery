import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Header from "../components/Header";
import SegmentSwitch from "../components/SegmentSwitch";
import ThreeDigitTable from "../components/ThreeDigitTable";
import { useState } from "react";
import TwoDigitTable from "../components/TwoDigitTable";

const HomePage: React.FC = () => {
  const [tab, setTab] = useState("two-digit");

  const onSelectSegment = (segment: any) => {
    if (segment.detail.value === "2") {
      setTab("two-digit");
    } else {
      setTab("three-digit");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen color="primary">
        <Header
          totalPriceOfTwoDigits={999999}
          totalPriceOfThreeDigits={300000}
        />
        <div className="container">
          <SegmentSwitch onChange={onSelectSegment} />
          {tab === "two-digit" ? <TwoDigitTable /> : <ThreeDigitTable />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

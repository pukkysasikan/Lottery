import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import Header from "../components/Header";
import SegmentSwitch from "../components/SegmentSwitch";
import ThreeDigitTable from "../components/ThreeDigitTable";
import { useState } from "react";
import TwoDigitTable from "../components/TwoDigitTable";

interface ContainerProps {
  totalTwo: number;
  totalThree: number;
}

const HomePage = (props: ContainerProps) => {
  const [tab, setTab] = useState("three-digit");

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
        <Header totalPriceOfTwoDigits={props.totalTwo} totalPriceOfThreeDigits={props.totalThree} />
        <div className="container">{tab === "two-digit" ? <TwoDigitTable /> : <ThreeDigitTable />}</div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

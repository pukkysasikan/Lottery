import { IonGrid, IonRow, IonCol, IonIcon, IonText } from "@ionic/react";
import { ribbonOutline } from "ionicons/icons";

interface HeaderProps {
  totalPriceOfTwoDigits: number;
  totalPriceOfThreeDigits: number;
}

const Header: React.FC<HeaderProps> = ({
  totalPriceOfTwoDigits,
  totalPriceOfThreeDigits,
}) => {
  const balanceFormat = (balance: number) => {
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <header className="header-container">
      <h1 className="textheader">KOO LOTTO</h1>
      <IonGrid>
        <IonRow style={{ marginTop: 10 }}>
          <IonCol className="subheader-left">
            <IonIcon style={{ fontSize: "30px" }} icon={ribbonOutline} />
            <IonText style={{ fontSize: "19px" }}>
              &nbsp;2ตัว&nbsp;:&nbsp;{balanceFormat(totalPriceOfTwoDigits)}
            </IonText>
          </IonCol>
          <IonCol className="subheader-right">
            <IonIcon style={{ fontSize: "30px" }} icon={ribbonOutline} />
            <IonText style={{ fontSize: "19px" }}>
              &nbsp;3ตัว&nbsp;:&nbsp;{balanceFormat(totalPriceOfThreeDigits)}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </header>
  );
};

export default Header;

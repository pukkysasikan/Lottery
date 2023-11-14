import { IonLabel, IonSegment, IonSegmentButton, IonText } from "@ionic/react";

interface SegmentSwitchProps {
  onChange: (segment: any) => void;
}

const SegmentSwitch: React.FC<SegmentSwitchProps> = ({ onChange }) => {
  return (
    <div className="segment-container">
      <IonSegment
        className="segment"
        value="2"
        onIonChange={onChange}
        mode="md"
      >
        <IonSegmentButton className="segment-btn" value="2">
          <IonText>2 ตัว</IonText>
        </IonSegmentButton>
        <IonSegmentButton className="segment-btn" value="3">
          <IonText>3 ตัว</IonText>
        </IonSegmentButton>
      </IonSegment>
    </div>
  );
};

export default SegmentSwitch;

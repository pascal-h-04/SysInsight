import "./questionnairePageStyle.css";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";

const InfoPopover = () => {
  return (
    <div className="info-icon">
      <OverlayTrigger
        trigger="click"
        rootClose
        key="leftInfoPopover"
        placement="left"
        overlay={
          <Popover className="left-info-popover">
            <Popover.Header as="h3">Information und Hinweise</Popover.Header>
            <Popover.Body>
              Bitte fülle alle <strong>Pflichtfelder</strong> aus, bevor du das
              Formular absenden. Diese erkennst du am roten Sternchen (*) neben
              der Frage.
              <br />
              Bei manchen Dropdowns ist eine Mehrfachauswahl möglich. Klicke
              dazu auf die gewünschten Optionen.
              <br />
              <br />
              <strong>Achte auf Richtigkeit und Sauberkeit</strong> der
              Dateneingabe, da dies Maßgeblich die Auswertung beeinflusst.
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="secondary">
          <BsInfoCircle size={24} />
        </Button>
      </OverlayTrigger>
    </div>
  );
};
export default InfoPopover;

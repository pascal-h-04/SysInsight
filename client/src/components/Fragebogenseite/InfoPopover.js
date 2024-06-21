import "./Fragebogen.css";
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
          <Popover id="left-info-popover">
            <Popover.Header as="h3">Information und Hinweise</Popover.Header>
            <Popover.Body>
              Bitte fülle alle Pflichtfelder aus, bevor du das Formular
              absenden. Diese erkennst du am roten Sternchen (*) neben der
              Frage. Bei manchen Dropdowns ist eine Mehrfachauswahl möglich.
              Klicke dazu auf die gewünschten Optionen. Achte auf Richtigkeit
              und Sauberkeit der Dateneingabe, da dies Maßgeblich die Auswertung
              beeinflusst.
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

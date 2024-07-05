import { Modal, Button } from "react-bootstrap";

const DeletePopup = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Löschvorgang bestätigen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bist du dir sicher, dass du diese Angebot endgültig löschen möchtest?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Abbrechen
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Löschen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePopup;

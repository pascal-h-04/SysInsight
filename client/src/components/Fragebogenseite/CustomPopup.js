import { Modal } from "react-bootstrap";

const CustomPopup = ({ show, onHide, title, body }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
};
export default CustomPopup;

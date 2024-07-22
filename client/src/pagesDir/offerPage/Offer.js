import "./OfferPageStyle.css";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { CiMail } from "react-icons/ci";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import { FiPackage } from "react-icons/fi";

const Offer = ({ data, isAdmin, onEdit, onDelete, onSave, customizingMode }) => {
  const [editMode, setEditMode] = useState(isAdmin && data.Name === "");
  const [editData, setEditData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editData);
    setEditMode(false);
  };

  return (
    <Card>
      {editMode ? (
          <Card.Body>
            <div className="offer-edit-header">Name:</div>
            <Form.Control
                type="text"
                name="Name"
                value={editData.Name}
                onChange={handleChange}
                placeholder="Name"
            />
            <div className="offer-edit-header">Kategorie:</div>
            <Form.Control
                type="text"
                name="category"
                value={editData.category}
                onChange={handleChange}
                placeholder="category"
            />
            <div className="offer-edit-header">Score:</div>
            <Form.Control
                type="number"
                name="Score"
                value={editData.Score}
                onChange={handleChange}
                placeholder="Score"
            />
            <div className="offer-edit-header">Beschreibung:</div>
            <Form.Control
                as="textarea"
                name="Beschreibung"
                value={editData.Beschreibung}
                onChange={handleChange}
                placeholder="Beschreibung"
            />
            <div className="offer-edit-header">Bildadresse:</div>
            <Form.Control
                type="text"
                name="Bild"
                value={editData.Bild}
                onChange={handleChange}
                placeholder="Bild URL"
            />
            <div className="admin-buttons">
              <Button variant="success" onClick={handleSave}>
                <MdSave size={20}/> Speichern
              </Button>{" "}
              <Button variant="danger" onClick={() => setEditMode(false)}>
                Änderungen verwerfen
              </Button>
            </div>
          </Card.Body>
      ) : (
          <>
            <Card.Img variant="top" src={data.Bild} className="angebot-img" />
          <Card.Body>
            <Card.Title>{data.Name}</Card.Title>
            <Card.Text><div className="offer-edit-header">Kategorie:</div>{data.category}</Card.Text>
            <Card.Text><div className="offer-edit-header">Score:</div>{data.Score}</Card.Text>
            <Card.Text><div className="offer-edit-header">Beschreibung:</div>{data.Beschreibung}</Card.Text>

            {customizingMode && (
              <>
                <div className="admin-buttons">
                  <Button variant="success" onClick={() => setEditMode(true)}>
                    <MdEdit size={20} />
                  </Button>{" "}
                  <Button variant="danger" onClick={() => onDelete(data.ID)}>
                    <MdDelete size={20} />
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default Offer;

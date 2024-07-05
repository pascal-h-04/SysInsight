import "./OfferStyle.css";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { CiMail } from "react-icons/ci";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import { FiPackage } from "react-icons/fi";

const Offer = ({ data, isAdmin, onEdit, onDelete, onSave }) => {
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
          <Form.Control
            type="text"
            name="Name"
            value={editData.Name}
            onChange={handleChange}
            placeholder="Name"
          />
          <Form.Control
            type="text"
            name="category"
            value={editData.category}
            onChange={handleChange}
            placeholder="category"
          />
          <Form.Control
            type="number"
            name="Score"
            value={editData.Score}
            onChange={handleChange}
            placeholder="Score"
          />
          <Form.Control
            as="textarea"
            name="Beschreibung"
            value={editData.Beschreibung}
            onChange={handleChange}
            placeholder="Beschreibung"
          />
          <Form.Control
            type="text"
            name="Bild"
            value={editData.Bild}
            onChange={handleChange}
            placeholder="Bild URL"
          />
          <div className="admin-buttons">
            <Button variant="success" onClick={handleSave}>
              <MdSave size={20} /> Speichern
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
            <Card.Text>Kategorie: {data.category}</Card.Text>
            <Card.Text>Score: {data.Score}</Card.Text>
            <Card.Text>Beschreibung: {data.Beschreibung}</Card.Text>
            <Button>
              <CiMail size={20} /> Angebot erhalten
            </Button>

            {isAdmin && (
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

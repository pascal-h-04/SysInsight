import "./Angebotseite.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Angebot from "./Angebot.js";
import { Button } from "react-bootstrap";
import jsonAngebote from "../../data/angebote.json";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Grid } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { Modal } from "react-bootstrap";

const Angebotseite = ({ isAdmin }) => {
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [angebote, setAngebote] = useState(jsonAngebote);
  useEffect(() => {
    setAngebote(jsonAngebote);
  }, []);

  const [customizingMode, setCustomizingMode] = useState(false);

  const handleEdit = (updatedAngebot) => {
    setAngebote((prevAngebote) =>
      prevAngebote.map((angebot) =>
        angebot.id === updatedAngebot.id ? updatedAngebot : angebot
      )
    );
  };

  const handleDelete = (id) => {
    setShowConfirmModal(true);
    setDeleteId(id);
  };
  const confirmDelete = () => {
    setAngebote((prevAngebote) =>
      prevAngebote.filter((angebot) => angebot.id !== deleteId)
    );
    setShowConfirmModal(false);
    setDeleteId(null);
  };

  const handleAdd = () => {
    const newAngebot = {
      id: (angebote.length + 1).toString().padStart(2, "0"),
      name: "",
      kategorie: "",
      score: "",
      bild: "",
      beschreibung: "",
    };
    setAngebote((prevAngebote) => [newAngebot, ...prevAngebote]);
    setCustomizingMode(true);
  };

  const handleSave = (newAngebot) => {
    setAngebote((prevAngebote) =>
      prevAngebote.map((angebot) =>
        angebot.id === newAngebot.id ? newAngebot : angebot
      )
    );
  };

  return (
    <div id="angebotseite">
      <Button variant="primary" onClick={() => navigate("/auswertung")}>
        <IoMdArrowRoundBack size={25} />
        Zurück
      </Button>{" "}
      {isAdmin && (
        <>
          <Button
            variant="success"
            onClick={() => setCustomizingMode(!customizingMode)}
          >
            {customizingMode ? "Anpassung beenden" : "Angebote anpassen"}
          </Button>
          {customizingMode && (
            <>
              {" "}
              <Button variant="success" onClick={handleAdd}>
                <MdAdd size={20} /> Angebot hinzufügen
              </Button>
            </>
          )}
        </>
      )}
      <h1 className="h1-with-spacing">Ihre personalisierten Angebote:</h1>
      <Grid container spacing={2}>
        {angebote.map((angebot) => (
          <Grid item key={angebot.id} xs={6}>
            <Angebot
              data={angebot}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isAdmin={isAdmin}
              onSave={handleSave}
            />
          </Grid>
        ))}
      </Grid>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Löschung des Angebots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sind Sie sicher, dass Sie dieses Angebot löschen möchten?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Abbrechen
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Löschen
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Angebotseite;

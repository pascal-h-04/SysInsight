import "./OfferPageStyle.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Offer from "./Offer.js";
import { Button } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Grid } from "@mui/material";
import { MdAdd } from "react-icons/md";
import DeletePopup from "./DeletePopup.js";
import axios from "axios";

const OfferPage = ({ isAdmin, userID }) => {
  const navigate = useNavigate();
  const [einschaetzungenData, setEinschaetzungenData] = useState(null);
  const [scoreSecurity, setScoreSecurity] = useState(0);
  const [scoreKollaboration, setScoreKollaboration] = useState(0);
  const [scoreKommunikation, setScoreKommunikation] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [angebote, setAngebote] = useState([]);

  useEffect(() => {
    const fetchEinschaetzungen = async (userID) => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/einschaetzungen/${userID}`
        );
        setEinschaetzungenData(response.data);
        console.log("Einschätzungen:", response.data);
        const einschaetzung = response.data[0];
        setScoreSecurity(einschaetzung.ScoreSecurity);
        setScoreKollaboration(einschaetzung.ScoreKollaboration);
        setScoreKommunikation(einschaetzung.ScoreKommunikation);
      } catch (error) {
        console.error("Fehler beim Abrufen der Einschätzungen:", error);
      }
    };

    fetchEinschaetzungen(userID);

    const fetchOffersByCategories = async (isAdmin) => {
      const scores = {
        kommunikation: scoreKommunikation,
        kollaboration: scoreKollaboration,
        security: scoreSecurity,
      };

      try {
        if (isAdmin) {
          const response = await axios.get(
            "http://localhost:3002/api/alleangebote"
          );
          console.log("Angebote:", response.data);
          setAngebote(response.data);
        } else {
          const response = await axios.get(
            "http://localhost:3002/api/angebote",
            { params: { scores: JSON.stringify(scores) } }
          );
          console.log("Angebote:", response.data);
          setAngebote(response.data);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Angebote:", error);
      }
    };

    fetchOffersByCategories(isAdmin);
  }, [scoreSecurity, scoreKollaboration, scoreKommunikation, userID, isAdmin]);

  const [customizingMode, setCustomizingMode] = useState(false);

  const handleEdit = (updatedAngebot) => {
    setAngebote((prevAngebote) =>
      prevAngebote.map((angebot) =>
        angebot.ID === updatedAngebot.ID ? updatedAngebot : angebot
      )
    )
  };
  const handleDelete = (ID) => {
    setShowConfirmModal(true);
    setDeleteId(ID);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/angebote/${deleteId}`);
      setAngebote((prevAngebote) =>
        prevAngebote.filter((angebot) => angebot.ID !== deleteId)
      );
      setShowConfirmModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Fehler beim Löschen des Angebots:", error);
    }
  };

  const validate = (angebot) => {
    if (!angebot.Name) {
      alert("Bitte geben Sie einen Namen ein.");
      return false;
    }
    if (!(angebot.category=="Kommunikation"||angebot.category=="Kollaboration"||angebot.category=="Security")) {
      alert("Bitte wählen Sie eine der Kateogrien: Kommunikation, Kollaboration oder Security.");
      return false;
    }
    if (!angebot.Beschreibung) {
      alert("Bitte geben Sie eine Beschreibung ein.");
      return false;
    }
    if((angebot.Score < 1 || angebot.Score > 5)&& angebot.Score !== null){ 
      alert("Bitte geben Sie eine Bewertung zwischen 1 und 5 ein.");
      return false;
    }
    return true;
  };


  const handleAdd = async () => {
    const newAngebot = {
      ID: null,
      Name: "Neues Offer",
      category: "Kommunikation",
      Score: 5,
      Bild: "bild.jpg",
      Beschreibung: "Beschreibung des neuen Angebots",
      NutzerID: userID,
    };

    try {
      // POST-Anfrage an die API senden
      const response = await axios.post(
        "http://localhost:3002/api/angebote",
        newAngebot
      );
      const savedAngebot = response.data;
      // Erfolgreiche Antwort behandeln
      console.log(response.data); // Zum Testen oder für Feedback

      // Das folgende Setzen von State kann abhängig von deiner App-Logik variieren
      setAngebote((prevAngebote) => [savedAngebot, ...prevAngebote]);
      setCustomizingMode(true); // Optional: Setzen des Customizing-Modus
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Angebots:", error);
    }
    const response = await axios.get("http://localhost:3002/api/alleangebote");
    console.log("Angebote:", response.data);
    setAngebote(response.data);
  };

  const handleSave = async (updatedAngebot) => {
    if (!validate(updatedAngebot)) {
      return;
    }
    else{
      try {
        await axios.put(
          `http://localhost:3002/api/angebote/${updatedAngebot.ID}`,
          updatedAngebot
        );
        setAngebote((prevAngebote) =>
          prevAngebote.map((angebot) =>
            angebot.ID === updatedAngebot.ID ? updatedAngebot : angebot
          )
        );
      } catch (error) {
        console.error("Fehler beim Speichern des Angebots:", error);
      }
    }
  };

  return (
    <div ID="angebotseite">
      {!isAdmin && (
        <Button variant="primary" onClick={() => navigate("/auswertung")}>
          <IoMdArrowRoundBack size={25} />
          Zurück
        </Button>
      )}

      {isAdmin && (
        <>
          <Button
            variant={customizingMode ? "warning" : "success"}
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
        {angebote
          .slice()
          .reverse()
          .map((angebot) => (
            <Grid item key={angebot.ID} xs={6}>
              <Offer
                data={angebot}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin}
                onSave={handleSave}
              />
            </Grid>
          ))}
      </Grid>
      <DeletePopup
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
export default OfferPage;

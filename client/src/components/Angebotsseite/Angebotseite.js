import "./Angebotseite.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Angebot from "./Angebot.js";
import { Button } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Grid } from "@mui/material";
import { MdAdd } from "react-icons/md";
import LöschenBestätigenPopup from "./LöschenBestätigenPopup.js"; // Import the new component
import axios from "axios";

const Angebotseite = ({ isAdmin, userID }) => {
  const navigate = useNavigate();
  const [einschaetzungenData, setEinschaetzungenData] = useState(null);
  const [scoreSecurity, setScoreSecurity] = useState(0);
  const [scoreKollaboration, setScoreKollaboration] = useState(0);
  const [scoreKommunikation, setScoreKommunikation] = useState(0);

  //const apiUrlAngebote = "http://localhost:3002/api/angebote"; 
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [angebote, setAngebote] = useState([]);
  
  useEffect(() => {
    const fetchEinschaetzungen = async (userID) => {
      try {
        const response = await axios.get(`http://localhost:3002/api/einschaetzungen/${userID}`);
        setEinschaetzungenData(response.data);
        console.log('Einschätzungen:', response.data);
        const einschaetzung = response.data[0];
        setScoreSecurity(einschaetzung.ScoreSecurity);
        setScoreKollaboration(einschaetzung.ScoreKollaboration);
        setScoreKommunikation(einschaetzung.ScoreKommunikation);
      } catch (error) {
        console.error('Fehler beim Abrufen der Einschätzungen:', error);
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
        if (isAdmin)
          {
            const response = await axios.get("http://localhost:3002/api/alleangebote");
            console.log('Angebote:', response.data);
            setAngebote(response.data);
          }
          else {
        const response = await axios.get("http://localhost:3002/api/angebote", { params: { scores: JSON.stringify(scores) } });
        console.log('Angebote:', response.data);
        setAngebote(response.data);
          }
      } catch (error) {
        console.error('Fehler beim Abrufen der Angebote:', error);
      }
    };
    
    fetchOffersByCategories(isAdmin);

  
    
  }, [scoreSecurity, scoreKollaboration, scoreKommunikation]);


  const [customizingMode, setCustomizingMode] = useState(false);


  //ganzes Customizing auslagern
  const handleEdit = (updatedAngebot) => { //muss noch mit der API verbunden werden
    setAngebote((prevAngebote) =>
      prevAngebote.map((angebot) =>
        angebot.ID === updatedAngebot.ID ? updatedAngebot : angebot
      )
    );
  };

  const handleDelete = (ID) => { //muss noch mit der API verbunden werden
    setShowConfirmModal(true);
    setDeleteId(ID);
  };

  const confirmDelete = () => {
    setAngebote((prevAngebote) =>
      prevAngebote.filter((angebot) => angebot.ID !== deleteId)
    );
    setShowConfirmModal(false);
    setDeleteId(null);
  };

  const handleAdd = async () => {
    const newAngebot = {
      Name: "",
      category: "",
      Score: "",
      Bild: "",
      Beschreibung: "",
      NutzerID: 1, // Annahme: NutzerID muss gesetzt sein, z.B. aus dem State oder einer Authentifizierung
    };
  
    try {
      // POST-Anfrage an die API senden
      const response = await axios.post('http://localhost:3002/api/angebote', newAngebot);
  
      // Erfolgreiche Antwort behandeln
      console.log(response.data); // Zum Testen oder für Feedback
  
      // Das folgende Setzen von State kann abhängig von deiner App-Logik variieren
      setAngebote((prevAngebote) => [newAngebot, ...prevAngebote]);
      setCustomizingMode(true); // Optional: Setzen des Customizing-Modus
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Angebots:', error);
      // Hier kannst du eine Fehlerbehandlung einfügen, z.B. Benutzer benachrichtigen
    }
  };

  const handleSave = (newAngebot) => {
    setAngebote((prevAngebote) =>
      prevAngebote.map((angebot) =>
        angebot.ID === newAngebot.ID ? newAngebot : angebot
      )
    );
  };

  return (
    <div ID="angebotseite">
      {!isAdmin && (
      <Button variant="primary" onClick={() => navigate("/auswertung")}>
        <IoMdArrowRoundBack size={25} />
        Zurück
      </Button> )}

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
        {angebote.map((angebot) => (
          <Grid item key={angebot.ID} xs={6}>
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
      <LöschenBestätigenPopup
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
export default Angebotseite;

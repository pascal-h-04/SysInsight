import "./HomePageStyle.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdOutlinePlayCircle } from "react-icons/md";

const HomePage = ({ isAdmin }) => {
  return (
    <div className="page-content">
      <div id="sysInsight-heading">SysInsight</div>
      <div id="sysInsight-subheading">
        Als integrierte Teil der innovativen SemanTec AG bietet dir unser neuer
        DWP-Assistent die notwendige Hilfe für deinen Unternehmenserfolg! Starte
        die Ersteinschätzung und ziehe maximalen Nutzen aus unserem Fachwissen
        zum Thema "Digital Workplace". Du bist in einer leitenden Position in
        einem Unternehmen und möchtest herausfinden, ob deine Systemlandschaft
        Verbesserungsbedarf hat? Dann bist du hier genau richtig!
        <br />
        <br />
        Wir bieten dir eine personalisierte Einschätzung, eine Einordnung anhand
        Marktdaten und Best Practices sowie maßgeschneidete Angebote zur
        Weiterentwicklung. Diese Angebote werden regelmäßig von unseren Experten
        aktualisiert und auf die Branchenbedürfnisse angepasst, damit diese
        ideal zu deinem Portfolio und interner IT passt. <br />
      </div>
      <Button as={Link} to="/fragebogen" id="sysInsight-startknopf">
        <MdOutlinePlayCircle size={50} id="sysInsight-startknopf-icon" />{" "}
        Ersteinschätzung durchführen
      </Button>
    </div>
  );
};
export default HomePage;

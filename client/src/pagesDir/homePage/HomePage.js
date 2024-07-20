import "./HomePageStyle.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdOutlinePlayCircle } from "react-icons/md";

const HomePage = () => {
  return (
    <div className="page-content">
      <div id="sysInsight-heading">SysInsight</div>
      <div id="sysInsight-subheading">
        Als integrierter Teil der Unternehmensseite der SemanTec AG, bietet dir
        unser neuer intelligenter Assistent die notwendige Hilfe für deinen
        Unternehmenserfolg! Starte die Ersteinschätzung und ziehe maximalen
        Nutzen aus unserem Fachwissen im Bereich "Digital Workplace".
        <br /> Du bist in einer leitenden Position in einem Unternehmen und
        möchtest herausfinden, ob deine Systemlandschaft Verbesserungsbedarf
        hat? Dann bist du hier genau richtig!
        <br />
        Wir bieten dir eine personalisierte Einschätzung, eine Einordnung anhand
        Marktdaten und Best Practices sowie maßgeschneidete Angebote zur
        Weiterentwicklung. Diese Angebote werden regelmäßig von unseren Experten
        aktualisiert und auf die Branchenbedürfnisse angepasst, damit diese
        ideal zu deinem Portfolio und deiner interner IT passen.
        <br />
        Starte das Tool und hole dir in kürzester Zeit, unkompliziert und
        unverbindlich die Expertise, die du benötigst!
      </div>
      <Button as={Link} to="/fragebogen" id="sysInsight-startknopf">
        <MdOutlinePlayCircle size={50} id="sysInsight-startknopf-icon" />{" "}
        Ersteinschätzung durchführen
      </Button>
    </div>
  );
};
export default HomePage;

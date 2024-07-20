DROP DATABASE IF EXISTS mydatabase;
CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE Nutzer
(
    ID            INT AUTO_INCREMENT PRIMARY KEY,
    Name          VARCHAR(255),
    pw            VARCHAR(255),
    isAdmin       BOOLEAN DEFAULT FALSE
);

CREATE TABLE Einschaetzung
(
    ID            INT AUTO_INCREMENT PRIMARY KEY,
    ScoreKollaboration INT,
    ScoreKommunikation INT,
    ScoreSecurity INT,
    NutzerID      INT,
    FOREIGN KEY (NutzerID) REFERENCES Nutzer(ID)
);

CREATE  TABLE Angebote
(
    ID            INT AUTO_INCREMENT PRIMARY KEY,
    Name          VARCHAR(255),
    Score         INT,
    category      VARCHAR(255),
    Beschreibung  LONGTEXT,
    Bild           VARCHAR(255)
);

-- Beispielzeile für die Tabelle Nutzer
INSERT INTO Nutzer (Name, pw, isAdmin) VALUES ('user@domain.de', 'password', FALSE),
('admin@domain.de', 'password', TRUE),
('Annika@Semantec.de', 'TaylorSwift', TRUE);


-- Beispielzeile für die Tabelle Einschaetzung
INSERT INTO Einschaetzung (ScoreKollaboration, ScoreKommunikation, ScoreSecurity, NutzerID) 
VALUES (3, 4, 5, 1),
(5, 5, 5, 2),
(5, 5, 5, 3)
;  -- Angenommen, NutzerID 1 gehört zu 'user@domain.de'

-- Beispielzeile für die Tabelle Angebote
INSERT INTO Angebote (ID, Name, Score, category, Beschreibung, Bild) VALUES 
(1, 'Microsoft Teams', 1, 'Kommunikation', 'Microsoft Teams ist ein cloudbasierter Dienst, der Chat, Besprechungen, Notizen und Anhänge kombiniert. Teams bietet eine zentrale Anlaufstelle für die Zusammenarbeit, sodass Teams jederzeit und überall zusammenarbeiten können.', 'https://1000logos.net/wp-content/uploads/2021/12/Microsoft-Teams-Logo.png'),
(2, 'Mural', 2, 'Kommunikation', 'Mural ist eine digitale Arbeitsbereichs- und Kollaborationsplattform, die es Teams ermöglicht, Ideen zu erfassen, zu organisieren und zu teilen. Mural bietet eine Vielzahl von Tools und Funktionen, die die Zusammenarbeit und Kreativität fördern.', 'https://logowik.com/content/uploads/images/mural5302.logowik.com.webp'),
(3, 'Integration von Lieferanten/Partnern in bestehende Kommunikationsplattformen', 3, 'Kommunikation', 'Einrichtung und Anpassung von Schnittstellen zur nahtlosen Integration Ihrer Lieferanten und Partner in Ihre bestehenden Kommunikationstools. Dadurch verbessern Sie die Zusammenarbeit, erhöhen die Effizienz der Informationsübermittlung und optimieren die gemeinsamen Arbeitsprozesse.', 'https://www.fis-gmbh.de/wp-content/uploads/de/blog/20230324_cvi_zusammenfuehrung_kunden_lieferanten.jpg'),
(4, 'Kommunikations-Schulungen', 4, 'Kommunikation', '(Online-)Workshops zur optimalen Nutzung von Zoom oder Microsoft Teams Meetings. Zudem beinhalten unsere Schulungen Trainings zur zielgerichteten und effektiven Kommunikation.', 'https://static.integrata-cegos.de/wp-content/uploads/2023/10/27110111/Kommunikation-1.png'),
(5, 'Integration von Chatbots', 5, 'Kommunikation', 'Einrichtung und Anpassung von Chatbots zur Automatisierung wiederkehrender Kommunikationsprozesse und zur Entlastung Ihrer Mitarbeiter. Die Chatbots werden nahtlos in Ihre vorhandenen Tools integriert und bieten sofortige Unterstützung bei häufig gestellten Fragen und Routineaufgaben.', 'https://mindsquare.de/files/AdobeStock_173875594-01.png'),
(6, 'Microsoft Office 365', 1, 'Kollaboration', 'Microsoft Office 365 ist ein cloudbasierter Dienst, der eine Vielzahl von Anwendungen und Diensten für die Zusammenarbeit und Produktivität bietet. Dazu gehören Word, Excel, PowerPoint, Outlook, OneNote, SharePoint, Teams und mehr.', 'https://news.microsoft.com/wp-content/uploads/prod/sites/40/2017/01/Office-365_klein-960x589.jpg'),
(7, 'Einführung von Jira für effizientes Projektmanagement', 2, 'Kollaboration', 'Professionelle Einführung und Konfiguration von Jira für Ihr Team, um Projektmanagementprozesse zu optimieren. Wir helfen Ihnen bei der Einrichtung von Jira, angepasst an Ihre spezifischen Anforderungen, damit Sie Aufgaben besser verfolgen, Teamarbeit verbessern und Projektziele effektiv erreichen können.', 'https://5.imimg.com/data5/SELLER/Default/2023/12/370437052/BI/AM/IU/197369786/jira-work-management-software.png'),
(8, 'Einführung / Optimierung MS SharePoint', 3, 'Kollaboration', 'Microsoft SharePoint, Teil der Office 365 Suite, ermöglicht sichere Dokumentenverwaltung und nahtlose Zusammenarbeit in Echtzeit. Nutzen Sie die Integration mit Word, Excel, PowerPoint, Teams und mehr für optimale Produktivität.', 'https://www.nordicsolutions.es/wp-content/uploads/2023/03/sharepoint-symbol-scaled.webp'),
(9, 'Schulung für fortgeschrittene Nutzung von Microsoft Office Tools', 4, 'Kollaboration', 'Individuelle Schulungen, um Ihre Mitarbeiter in den fortgeschrittenen Einsatz von Microsoft Office Tools wie Excel, Word und PowerPoint einzuführen. Optimieren Sie Arbeitsabläufe, steigern Sie die Produktivität und nutzen Sie die volle Funktionalität dieser Werkzeuge effektiv aus.', 'https://smartstudy.at/wp-content/uploads/2023/08/smart-study_office-tools.jpg'),
(10, 'Workshops zur Förderung der Teamkollaboration', 5, 'Kollaboration', 'Maßgeschneiderte Workshops, um die Teamkollaboration in Ihrem Unternehmen zu stärken. Durch interaktive Sessions und praxisnahe Übungen verbessern wir die Kommunikation, fördern den Wissensaustausch und optimieren die Zusammenarbeit zwischen den Teammitgliedern. Ideal für Unternehmen, die ihre Teamdynamik und Effizienz steigern möchten.', 'https://bernhard-assekuranz.com/fileadmin/_processed_/0/f/csm_teamzusammenarbeit_e12b2a9cf6.jpg'),
(11, 'Umfassende IT-Security-Lösungen für KMUs', 1, 'IT-Sicherheit', 'Wir bieten umfassende IT-Security-Lösungen speziell für kleine und mittlere Unternehmen. Unser Service umfasst Firewall-Einrichtung, Antiviren-Software, regelmäßige Sicherheitsaudits und Schulungen für Mitarbeiter, um Ihre IT-Infrastruktur zu schützen und Ihre Unternehmensdaten vor Cyberbedrohungen zu sichern.', 'https://digital-magazin.de/wp-content/uploads/2023/11/it-sicherheit-kmu.jpeg'),
(12, 'Cloud-Security-Lösungen', 2, 'IT-Sicherheit', 'Cloud-Security-Lösungen sind Technologien, die entwickelt wurden, um die Sicherheit von Cloud-Diensten und -Anwendungen zu gewährleisten. Dazu gehören Verschlüsselung, Zugriffskontrolle, Sicherheitsüberwachung und mehr.', 'https://www.it-daily.net/images/Aufmacher-2021/Cloud-Security_shutterstock_1530570248_700.jpg'),
(13, 'Vulnerability-Management-Lösungen', 3, 'IT-Sicherheit', 'Vulnerability-Management-Lösungen sind Technologien, die entwickelt wurden, um Schwachstellen in IT-Systemen und -Anwendungen zu identifizieren, zu bewerten und zu beheben. Dazu gehören Schwachstellen-Scans, Risikobewertungen, Patch-Management und mehr.', 'https://avatao.com/media/vulnerability-management-blogpost.png'),
(14, 'Endpoint-Security-Lösungen', 4, 'IT-Sicherheit', 'Endpoint-Security-Lösungen sind Technologien, die entwickelt wurden, um Endgeräte wie Laptops, Smartphones und Tablets vor Bedrohungen zu schützen. Dazu gehören Antivirensoftware, Firewalls, Verschlüsselung, Zugriffskontrolle und mehr.', 'https://www.manageengine.com/products/desktop-central/images/ues-banner.png'),
(15, 'Sicherheitsbewusstseinsschulungen für Mitarbeiter', 5, 'IT-Sicherheit', 'Sicherheitsbewusstseinsschulungen für Mitarbeiter sind Schulungen, die entwickelt wurden, um Mitarbeiter über die Bedeutung von IT-Sicherheit und bewährte Sicherheitspraktiken zu informieren. Dies kann dazu beitragen, das Sicherheitsbewusstsein der Mitarbeiter zu stärken und das Risiko von Sicherheitsvorfällen zu reduzieren.', 'https://www.sec4you.com/wp-content/uploads/2023/08/Security-Awareness-Gestaltung-einer-effektiven-Schulung.png');

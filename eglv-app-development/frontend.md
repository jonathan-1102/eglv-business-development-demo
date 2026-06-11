# Frontend-Konzept: eGLV Business Development Agent App

## Zielbild

Das Frontend ist kein Marketing-Auftritt, sondern ein Arbeitswerkzeug fuer Business Development, Fachbereiche, Management und Projektteams. Die erste Ansicht muss sofort zeigen, welche Projekte in welchem Stage stehen, welche Gate-Entscheidungen anstehen und wo der Business Development Agent Teamzeit spart.

## Designprinzipien

- Arbeitsorientiert: dichte, aber klare Information statt grosser Hero-Flachen.
- eGLV-nah: Arial, weisse Flaechen, dunkler Text, eGLV-Blau und eGLV-Gruen als Leitfarben.
- Prozesssichtbar: Stages, Gates, Status, fehlende Nachweise und Entscheidungen muessen als System erkennbar sein.
- Konfigurierbar: Jede Stage und jedes Gate ist editierbar; die UI darf den Prozess nicht als fest verdrahtete Wahrheit behandeln.
- Entscheidungsfaehig: Management sieht nicht nur Daten, sondern klare Entscheidungsoptionen mit Begruendung.

## Designsystem

### Farben

- `#003DA5`: eGLV-Blau, primare Navigation, aktive Stage, Hauptaktionen.
- `#00873E`: eGLV-Gruen, positive Bewertung, abgeschlossene Nachweise, Go-Entscheidungen.
- `#101820`: Haupttext und dunkle UI-Elemente.
- `#5F5F5F`: sekundarer Text.
- `#AAAAAA`: Linien, neutrale Metadaten, inaktive Elemente.
- `#00B5E2`: Informationshinweise, Agenten-Akzente.
- `#D0DF00`: leichte Hervorhebung, Warn- oder Potenzialmarker sparsam einsetzen.
- `#F5F8FB`: ruhiger Hintergrund fuer Arbeitsbereiche.

### Typografie

- Font: Arial oder kompatible systemnahe Sans-Serif.
- Seitentitel: 28-36 px.
- Bereichstitel: 18-24 px.
- Tabellen, Labels, Metadaten: 12-15 px.
- Keine negativen Letter-Spacings, keine viewport-abhaengige Schriftgroesse.

### Komponenten

- Stage-Pipeline: horizontale Prozessleiste mit Stages und Gates.
- Status-Chips: `On Track`, `Needs Evidence`, `Gate Ready`, `Blocked`, `Decision Pending`.
- Evidence Checklist: Pflichtnachweise, optionale Nachweise, Upload- oder Linkstatus.
- Gate Decision Panel: Kriterien, Empfehlung, Managemententscheidung, Protokoll.
- Agent Side Panel: Vorschlaege, offene Aufgaben, generierte Briefings, Rueckfragen.
- Definition Editor: Stage-/Gate-Konfiguration, Kriterien, Rollen, Templates.
- Project Cards: komprimierte Projektuebersicht mit Stage, Owner, Risiko, naechstem Gate.

## Seitenstruktur

### 1. Dashboard

Zweck: Gesamtueberblick ueber alle Business-Development-Projekte.

Inhalte:

- KPI-Leiste: aktive Projekte, Gate-Entscheidungen diese Woche, blockierte Projekte, gesparte Agentenzeit.
- Stage-Gate-Pipeline mit Projektzaehlern je Stage.
- Projektliste mit Filter nach Stage, Owner, Handlungsfeld, Risiko und Gate-Faelligkeit.
- Agenten-Hinweise: Projekte mit fehlenden Nachweisen, veralteten Business Cases oder anstehenden Managemententscheidungen.

### 2. Projektuebersicht

Zweck: Ein einzelnes Projekt durch den Prozess fuehren.

Beispielprojekt: Pflanzenkohle/Pyrolyse.

Inhalte:

- Projektkopf: Titel, Handlungsfeld, Owner, aktueller Stage, Ziel, Status.
- Prozessleiste: aktueller Stand inklusive abgeschlossener Gates.
- Stage-Arbeitsbereich: Ziele, Aufgaben, Nachweise, Stakeholder, Risiken.
- Agentenbereich: naechste Schritte, fehlende Informationen, Entwurf fuer Entscheidungsvorlage.
- Historie: Entscheidungen, Statuswechsel, Kommentare, Lessons Learned.

### 3. Stage-Workflow

Zweck: Zeigen, was in einem Stage erledigt werden muss und was noch fehlt.

Stage 0 Beispiel:

- Eingangspfad waehlen: Technologie, Nachfrage, Policy/Funding.
- Tech-Steckbrief oder Opportunity-Shortlist erfassen.
- Stakeholder und offene Annahmen dokumentieren.
- Agent erstellt erste Hypothesen, Nachfragen und Scoring-Vorschlag.

Stage 2 Beispiel:

- Business-Case-Varianten anlegen.
- 10 Bausteine ausfuellen.
- Bandbreiten statt Scheingenauigkeit erfassen.
- Rechtsform-Indikator vorbereiten.

### 4. Gate-Seite

Zweck: Managemententscheidungen strukturiert vorbereiten und dokumentieren.

Inhalte:

- Gate-Kriterien mit Bewertung und Nachweisstatus.
- Agentenempfehlung mit Unsicherheiten.
- Entscheidungsoptionen: `Go`, `Stop`, `Hold`, `Pivot`, `Fast Track`, `Wissenstransfer`.
- Management-Kommentar und Beschlussprotokoll.
- Folgeaufgaben nach Entscheidung.

### 5. Einstellungen: Stage-Gate-Definition

Zweck: Den Prozess veraenderbar machen.

Funktionen:

- Stages anlegen, umbenennen, sortieren, deaktivieren.
- Gates anlegen und zwischen Stages platzieren.
- Kriterien, Pflichtnachweise, Rollen und Templates je Stage/Gate definieren.
- Versionierung: neue Prozessversionen gelten fuer neue Projekte; laufende Projekte behalten ihren Prozessstand oder werden bewusst migriert.
- Vorschau: Darstellung, wie die Prozessdefinition in Dashboard und Projektseiten aussieht.

### 6. Agent Workspace

Zweck: Alle agentengestuetzten Aufgaben buendeln.

Funktionen:

- Gate-Briefing generieren.
- Business-Case-Gliederung erstellen.
- Stakeholder-Fragen vorschlagen.
- Risikoannahmen strukturieren.
- Lessons Learned in neue Ideen ueberfuehren.
- Projektstatus in Managementsprache zusammenfassen.

## UX fuer Organisationen ohne starke Go-to-Market-Routinen

Die App darf nicht voraussetzen, dass Nutzer bereits wie ein marktorientiertes Venture-Team arbeiten. Deshalb:

- Sie fuehrt Nutzer ueber Fragen, Kriterien und Beispiele.
- Sie erlaubt `unklar` als legitimen Zustand, macht aber den Klaerungsbedarf sichtbar.
- Sie bewertet nicht nur Profit, sondern Public Value, Verbandsauftrag, Umweltwirkung, Betriebsfaehigkeit, Foerderfaehigkeit und Rechtsform.
- Sie macht Uebergaben explizit: von Idee zu Business Case, von Pilot zu Betrieb, von Projektwissen zu Wissensspeicher.

## Video-taugliche Frontend-Szenen

1. Dashboard zeigt: mehrere Projekte stehen an unterschiedlichen Stages; Pflanzenkohle ist in Stage 2.
2. Projektseite zeigt: Business Case ist fast gate-ready, Rechtsform-Indikator fehlt.
3. Agent generiert: Gate-2-Briefing und Liste fehlender Nachweise.
4. Gate-Seite zeigt: Management entscheidet `Go in Pilotierung`.
5. Einstellungen zeigen: Gate 2 kann angepasst werden, ohne Code zu aendern.

## Festgelegte UX-Behaviors

- Die Demo startet ueber QR-Code direkt auf dem Management-Dashboard.
- Nach dem Dashboard ist die Kanban-Ansicht die zentrale Stage-Gate-Gesamtuebersicht.
- Projektkarten zeigen den Fertigstellungsgrad der notwendigen Informationen pro Stage/Gate in Prozent.
- Klick auf ein Projekt oeffnet ein seitliches Drawer-Panel mit naechsten Schritten.
- Der Prozess ist gefuehrt; Nutzer sollen wenig Spielraum fuer fehlerhafte Prozessspruenge haben.
- Pflichtnachweise muessen erfuellt sein, bevor ein Stage abgeschlossen oder ein Gate entschieden werden kann.
- Nur Admins koennen Pflichtnachweise aussetzen oder Prozessregeln neu strukturieren.
- Es gibt keinen Status `unklar`; Unvollstaendigkeit wird ueber Prozentfortschritt unter 100 Prozent dargestellt.
- Bei 100 Prozent Vollstaendigkeit schlaegt die KI eine Entscheidung mit kurzer Begruendung vor.
- Das Management entscheidet direkt im Tool.
- Erlaubte Gate-Entscheidungen fuer die Demo: `Go`, `Stop`, `Hold`, `Pivot`.
- Der Agent handelt proaktiv und priorisiert die wichtigsten Entscheidungen und Projekte.
- Agentenaktionen sind bewusst reduziert: `Übernehmen`, `Bearbeiten`, `Ablehnen`.
- Agentenrolle wechselt je Kontext: Management-Briefing-Assistant auf dem Dashboard, Prozessassistent im Kanban, BD-Experte in Stage/Gate-Formularen.
- Admin-Einstellungen ermoeglichen Drag-and-drop, neue Regeln und flexible Stage-/Gate-Anpassungen.

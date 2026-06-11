# Backend-Konzept: eGLV Business Development Agent App

## Backend-Ziel

Das Backend bildet den Stage-Gate-Prozess als konfigurierbares, versioniertes Prozesssystem ab. Es verwaltet Projekte, Stages, Gates, Nachweise, Entscheidungen, Rollen, Agentenaufgaben und Wissensobjekte. Die API muss so gestaltet sein, dass Frontend, Demo, spaetere Integrationen und Agentenlogik dieselben Datenobjekte verwenden.

## Domaenenmodell

### Kernobjekte

`ProcessDefinition`

- Versionierter Stage-Gate-Prozess.
- Enthaelt Stages, Gates, Kriterien, Rollen, Templates und erlaubte Statuswechsel.

`StageDefinition`

- Definiert Name, Ziel, Eingangsdaten, Aufgaben, Nachweise, Rollen und Abschlussbedingungen eines Stages.

`GateDefinition`

- Definiert Entscheidungskriterien, Pflichtnachweise, Entscheidungsoptionen und Managementrollen.

`Project`

- Konkretes Business-Development-Vorhaben.
- Beispiel: Pflanzenkohle/Pyrolyse.

`ProjectStage`

- Status eines Projekts in einer Stage-Definition.
- Enthaelt Fortschritt, Aufgaben, offene Nachweise, Kommentare und Agentenhinweise.

`GateReview`

- Konkrete Gate-Pruefung eines Projekts.
- Enthaelt Bewertung, Entscheidung, Beschluss, Risiken und Folgeaufgaben.

`Evidence`

- Nachweisobjekt: Dokument, Link, Notiz, Interview, Scoring, Business-Case-Baustein, Rechtsformanalyse, Stakeholder-Commitment.

`BusinessCaseVariant`

- Eine von 2-3 Varianten je Idee.
- Enthaelt die 10 Bausteine aus der Praesentation.

`AgentRun`

- Protokoll einer Agentenaktion: Eingabe, Kontext, Ausgabe, Status, Annahmen, Quellenverweise.

`KnowledgeItem`

- Wiederverwendbares Wissen aus Projekten: Lessons Learned, Entscheidungslogik, Risiken, Stakeholdermuster, Vorlagen.

## Prozesslogik

### Stage-Status

- `not_started`
- `in_progress`
- `needs_evidence`
- `ready_for_gate`
- `blocked`
- `completed`

### Gate-Entscheidungen

- `go`
- `stop`
- `hold`
- `pivot`
- `fast_track`
- `handover`
- `knowledge_transfer`

### Prozessversionierung

Eine Prozessdefinition darf nicht einfach ueberschrieben werden. Aenderungen erzeugen eine neue Version.

Regel:

- Neue Projekte nutzen standardmaessig die aktuelle Prozessversion.
- Laufende Projekte behalten ihre Version.
- Migrationen muessen explizit bestaetigt und protokolliert werden.

## Agentenfunktionen

Der Business Development Agent ist kein Entscheider. Er ist ein Arbeitsbeschleuniger.

### Kernaufgaben

- fehlende Nachweise erkennen
- Gate-Briefings vorbereiten
- Business-Case-Bausteine strukturieren
- Stakeholderfragen vorschlagen
- Risiken und Annahmen zusammenfassen
- Managementzusammenfassungen formulieren
- Lessons Learned in KnowledgeItems ueberfuehren
- Hinweise auf widerspruechliche oder unvollstaendige Angaben geben

### Agenten-Grenzen

- Der Agent darf keine Managemententscheidung treffen.
- Der Agent darf fehlende Fakten nicht erfinden.
- Der Agent muss Annahmen sichtbar markieren.
- Jede generierte Empfehlung braucht Rueckverweis auf genutzte Projektinformationen.

## Datenmodell-Skizze

```text
ProcessDefinition 1--n StageDefinition
ProcessDefinition 1--n GateDefinition
Project n--1 ProcessDefinition
Project 1--n ProjectStage
Project 1--n GateReview
Project 1--n Evidence
Project 1--n BusinessCaseVariant
Project 1--n AgentRun
GateReview 1--n GateCriterionScore
ProjectStage 1--n Task
KnowledgeItem n--1 Project
```

## Rollenmodell

`admin`

- Prozessdefinitionen bearbeiten.
- Rollen und Templates konfigurieren.

`business_development`

- Projekte anlegen, Stages pflegen, Agentenlaeufe starten, Gate-Unterlagen vorbereiten.

`project_owner`

- Projektinformationen, Nachweise und Aufgaben pflegen.

`management`

- Gate-Unterlagen lesen, Entscheidungen treffen, Kommentare dokumentieren.

`viewer`

- Lesender Zugriff auf freigegebene Projekte und Prozessuebersichten.

## Backend-Services

`ProcessService`

- Erstellt und versioniert Stage-Gate-Definitionen.

`ProjectService`

- Verwaltet Projektstatus, Stage-Fortschritt und Aufgaben.

`EvidenceService`

- Verwaltet Nachweise, Dokumentlinks und Vollstaendigkeit.

`GateService`

- Erstellt Gate-Reviews und protokolliert Entscheidungen.

`AgentService`

- Baut den Kontext fuer Agentenlaeufe, startet Generierungen und speichert Ergebnisse.

`KnowledgeService`

- Extrahiert wiederverwendbares Wissen aus abgeschlossenen Projekten.

`AuditService`

- Protokolliert Statuswechsel, Gate-Entscheidungen und Prozessversionsaenderungen.

## Persistenz

Fuer eine Demo reicht eine einfache relationale Datenbank oder JSON-basierte Persistenz. Fuer ein produktionsnahes Backend ist eine relationale Datenbank sinnvoll, weil Stages, Gates, Kriterien, Entscheidungen und Audit-Logs starke Beziehungen haben.

Empfohlene Tabellen:

- `process_definitions`
- `stage_definitions`
- `gate_definitions`
- `gate_criteria`
- `projects`
- `project_stages`
- `tasks`
- `evidence`
- `business_case_variants`
- `gate_reviews`
- `gate_review_scores`
- `agent_runs`
- `knowledge_items`
- `audit_events`

## Sicherheit und Demo-Betrieb

Fuer den Probierlink:

- Nur Demo-Daten verwenden.
- Kein Upload vertraulicher Dokumente.
- Optional einfacher Passwortschutz.
- Agentenoutputs als Demo markieren.

Fuer Produktion:

- Single Sign-on oder rollenbasierte Anmeldung.
- Audit-Logs fuer Entscheidungen und Prozessanpassungen.
- Mandantenfaehigkeit pruefen, falls mehrere Organisationen angebunden werden.
- Datenschutz und Loeschkonzept fuer Personen- und Projektdaten.


# Agent API Calls fuer die eGLV Business-Development-App

Ziel: Ein Business-Development-Agent soll dieselben kontrollierten Arbeitsschritte ausfuehren koennen wie ein Mensch im Tool. Er bekommt keine freie Vollmacht, sondern klar begrenzte API-Calls mit Rollen, Audit Trail und nachvollziehbaren Ergebnissen.

## Grundprinzip

- Der Agent liest Portfolio, Prozessdefinitionen, Nachweise und Entscheidungshistorie.
- Der Agent darf Aufgaben vorbereiten, Nachweise anfragen, Empfehlungen erstellen und Erinnerungen ausloesen.
- Managemententscheidungen werden direkt im Tool gespeichert und bleiben auditierbar.
- Pflichtnachweise duerfen nur durch Admin-Regeln veraendert oder ausgesetzt werden.
- Alle Schreiboperationen erzeugen ein Audit-Event.

## Notwendige Calls

| Methode | Endpoint | Zweck | Menschliche Arbeit, die der Agent ersetzt |
| --- | --- | --- | --- |
| GET | `/api/portfolio/briefing` | Management-Briefing priorisieren | Portfolio lesen, Gate-Reife bewerten, Top-Projekte sortieren |
| GET | `/api/projects` | Kanban und Portfolio laden | Projektuebersicht vorbereiten |
| POST | `/api/projects` | Neues BD-Vorhaben anlegen | Erstaufnahme eines neuen Projekts strukturieren |
| GET | `/api/projects/{projectId}` | Projektkontext laden | Projektstatus, Stage, Risiken, Budget, Owner und naechste Entscheidung verstehen |
| PATCH | `/api/projects/{projectId}` | Projektstammdaten aktualisieren | Korrekturen an Owner, Risiko, Budget, Nutzenwirkung oder Beschreibung speichern |
| GET | `/api/projects/{projectId}/evidence` | Pflichtnachweise lesen | Fehlende Informationen, Owner, Quellen und Fristen erkennen |
| PATCH | `/api/projects/{projectId}/evidence/{evidenceId}` | Nachweisstatus aktualisieren | Nachweis als offen, in Beschaffung, erfuellt oder blockiert markieren |
| POST | `/api/agent-tasks` | Agentenaufgabe starten | Fehlende Nachweise in kontrollierte Arbeitsaufgaben umwandeln |
| PATCH | `/api/agent-tasks/{taskId}` | Agentenaufgabe aktualisieren | Status, Quelle, Ergebnis und Rueckfrage dokumentieren |
| POST | `/api/recommendations` | Entscheidungsempfehlung erzeugen | Go, Stop, Hold oder Pivot mit kurzer Begruendung vorschlagen |
| POST | `/api/decisions` | Managemententscheidung speichern | Entscheidung, Kommentar, Entscheiderrolle und Konsequenz protokollieren |
| PATCH | `/api/projects/{projectId}/stage` | Stage-Wechsel ausfuehren | Projekt nach Go in die naechste Stage ueberfuehren |
| POST | `/api/projects/{projectId}/archive` | Projekt archivieren | Stop-Entscheidung, Lernwert und Archivstatus sichern |
| PATCH | `/api/archive/{projectId}/reminder` | Wiedervorlage setzen | Erinnerung fuer Management oder BD-Team planen |
| GET | `/api/process-definition` | Stage-Gate-Prozess laden | Aktuelle Stages, Gates, Pflichtnachweise, Rollen und Regeln verstehen |
| POST | `/api/process-definition/rules` | Admin-Regel anlegen | Neue Pflichtregel versioniert in den Prozess aufnehmen |
| PATCH | `/api/process-definition/rules/{ruleId}` | Admin-Regel aendern | Regel aktivieren, deaktivieren oder anpassen |
| POST | `/api/leads` | QR-Demo Lead erfassen | E-Mail, Consent und Demo-Kontext fuer Kontaktaufnahme speichern |
| POST | `/api/notifications` | Teams/Outlook Hinweis senden | Entscheidung, Reminder oder fehlenden Nachweis an Verantwortliche schicken |
| GET | `/api/audit-events` | Audit Trail lesen | Nachvollziehbarkeit fuer Management, IT und Compliance herstellen |

## Agent-Faehigkeiten nach Workflow

### Dashboard

- `GET /api/portfolio/briefing`
- `GET /api/projects`
- `POST /api/recommendations`
- `POST /api/notifications`

Der Agent priorisiert Projekte, markiert Gate-reife Entscheidungen und fuehrt das Management zu den wichtigsten Aufgaben.

### Kanban und Projekt-Drawer

- `GET /api/projects/{projectId}`
- `GET /api/projects/{projectId}/evidence`
- `POST /api/agent-tasks`
- `PATCH /api/agent-tasks/{taskId}`

Der Agent erkennt fehlende Pflichtnachweise, erzeugt konkrete Aufgaben und dokumentiert, welche Quelle oder welcher Owner benoetigt wird.

### Gate-Entscheidung

- `POST /api/recommendations`
- `POST /api/decisions`
- `PATCH /api/projects/{projectId}/stage`
- `GET /api/audit-events`

Der Agent bereitet die Empfehlung vor. Die Entscheidung selbst wird im Tool durch das Management bestaetigt und gespeichert.

### Archiv und Reminder

- `POST /api/projects/{projectId}/archive`
- `PATCH /api/archive/{projectId}/reminder`
- `POST /api/notifications`

Der Agent sorgt dafuer, dass gescheiterte Projekte nicht verloren gehen, sondern als Lernfall mit Wiedervorlage erhalten bleiben.

### Admin-Einstellungen

- `GET /api/process-definition`
- `POST /api/process-definition/rules`
- `PATCH /api/process-definition/rules/{ruleId}`

Nur Admins duerfen den Prozess veraendern. Alle anderen Rollen folgen der freigegebenen Stage-Gate-Definition.

## Minimales Datenmodell fuer erste Backend-Version

- `Project`: ID, Name, Owner, Handlungsfeld, Stage, Status, Progress, Risiko, Budget, Faelligkeit, Nutzenwirkung.
- `Evidence`: ID, Project ID, Label, Required, Done, Owner, Source, Due Date, Status, Rule ID.
- `Decision`: ID, Project ID, Gate, Decision, Comment, Rationale, Decided By, Decided At.
- `AgentTask`: ID, Project ID, Evidence ID, Label, Status, Owner, Result, Created At.
- `ProcessRule`: ID, Label, Type, Scope, Applies To, Active, Evidence Label.
- `Lead`: ID, Email, Consent, Source, Viewed Project, Unlock Until, Created At.
- `AuditEvent`: ID, Actor, Action, Entity, Detail, Created At.

## Sicherheits- und Compliance-Hinweise

- Authentifizierung spaeter ueber Microsoft Entra ID mit MFA.
- Rollen: Management, Business Development, Admin, Agent Service.
- Der Agent braucht Least-Privilege-Zugriff: lesen breit, schreiben nur ueber erlaubte Workflow-Endpunkte.
- Jeder schreibende Call erzeugt ein Audit-Event.
- DSGVO: Leads und personenbezogene Daten mit Consent, Zweckbindung, Loesch-/Aufbewahrungskonzept und Exportmoeglichkeit speichern.

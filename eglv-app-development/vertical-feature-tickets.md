# Vertical Feature Tickets: eGLV Business Development Agent App

Diese Tickets sind bewusst vertikal geschnitten: Jedes Ticket verbindet UI, Backend/API, Datenmodell, Agentenverhalten und Akzeptanzkriterien. Dadurch arbeiten Frontend und Backend nicht getrennt an abstrakten Schichten, sondern an direkt vorfuehrbaren Management-Features.

## Leitentscheidung

Die Demo ist zu 100 Prozent management-fokussiert. Der QR-Code am Ende der Praesentation fuehrt auf eine stabile Demo-URL mit Login. Dort wird sichtbar, dass eine Zwei-Faktor-Authentifizierung stattgefunden hat. Danach sieht das Management den Status aller Projekte, erkennt Pflanzenkohle/Pyrolyse bei Gate 2, entscheidet im Tool, ueberfuehrt das Projekt in Stage 3, sieht dort den notwendigen Fortschritt und erlebt spaeter das Scheitern in Gate 3 inklusive Archivierung und Erinnerung.

## Offene Klaerungsfragen

1. Bedeutet `Stop`, dass ein Projekt dauerhaft archiviert wird, oder kann es mit Erinnerung spaeter reaktiviert werden?
2. Bedeutet `Hold`, dass das Projekt aktiv bleibt, aber blockiert ist, bis neue Informationen oder ein Datum erreicht sind?
3. Bedeutet `Pivot`, dass das Projekt im Prozess bleibt, aber mit geaendertem Scope, neuen Pflichtnachweisen oder Ruecksprung in einen frueheren Stage?
4. Wird die Prozentanzeige gleichgewichtet ueber alle Pflichtnachweise berechnet, oder koennen einzelne Nachweise/Gate-Regeln hoeher gewichtet werden?
5. Soll der Agent Erinnerungen nur im Tool anzeigen oder auch spaeter per E-Mail/Calendar/Notification vorbereiten?
6. Was genau ist die Webkiva-Referenz: ein Link, ein Screenshot, ein konkretes Tool oder ein gewuenschtes Interaktionsmuster?

## Ticket V00: Demo-Login mit sichtbarer Zwei-Faktor-Authentifizierung

### Ziel

Die Demo startet mit einem Login, der sichtbar macht, dass das Tool fuer eine Unternehmensinfrastruktur mit Zwei-Faktor-Authentifizierung gedacht ist.

### UI Behavior

- QR-Code fuehrt auf die Demo-URL.
- Erste Ansicht ist ein Login-Screen mit eGLV-nahem Look.
- Demo-Login nutzt `management@eglv-demo.de`.
- Nach Login erscheint ein 2FA-Schritt oder ein klarer Status: `Zwei-Faktor-Authentifizierung bestätigt`.
- Der 2FA-Schritt ist fuer die Demo nur visuell simuliert.
- Danach Weiterleitung auf das Management-Dashboard.
- Fuer die Demo darf die 2FA kontrolliert simuliert sein.

### Frontend

- Routen: `/login`, `/mfa`, `/dashboard`.
- Komponenten: `DemoLoginForm`, `MfaVerificationStep`, `SecurityContextBadge`.
- Sichtbarer Hinweis: `Demo-Zugang - Unternehmenslogin mit MFA simuliert`.
- Vorbefuellte Demo-E-Mail: `management@eglv-demo.de`.

### Backend/API

- `POST /api/demo-login`
- `POST /api/demo-mfa/verify`
- `GET /api/session`

### Daten

- `DemoSession`
- `DemoSession.mfaVerified`
- `DemoSession.startedAt`

### Akzeptanzkriterien

- Der Demoeinstieg wirkt wie ein gesicherter Unternehmenszugang.
- `management@eglv-demo.de` ist als Demo-Managementzugang nutzbar.
- MFA ist sichtbar, aber fuer die Demo reibungslos.
- Nach erfolgreichem MFA-Schritt landet der Nutzer auf dem Dashboard.

## Ticket V01: QR-Code Einstieg und Management Dashboard

### Ziel

Das Management landet nach QR-Code, Login und sichtbarer Zwei-Faktor-Authentifizierung auf einem Dashboard, das die wichtigsten Projekte, kritischen Entscheidungen und Agentenempfehlungen sichtbar macht.

### UI Behavior

- Dashboard ist die erste Ansicht.
- Oben stehen Management-KPIs: aktive Projekte, Gate-Entscheidungen offen, Projekte mit Risiko, Projekte im Archiv, geschaetzte Agenten-Zeitersparnis.
- Eine Prioritaetsliste zeigt die wichtigsten aktuell zu bearbeitenden Projekte.
- Der Agent tritt hier als Management-Briefing-Assistant auf und fuehrt zu den dringendsten Entscheidungen.
- Pflanzenkohle/Pyrolyse ist prominent sichtbar und als `Gate 2 - Entscheidung offen` markiert.

### Frontend

- Route: `/dashboard`
- Komponenten: `ManagementKpiBar`, `PriorityProjectList`, `AgentBriefingPanel`, `DashboardKanbanPreview`.
- eGLV-Design: weisser Arbeitsbereich, eGLV-Blau fuer aktive Navigation, eGLV-Gruen fuer positive Fortschritte, klare Management-Typografie.

### Backend/API

- `GET /api/dashboard/management-summary`
- `GET /api/projects?sort=priority`
- `GET /api/agent-recommendations?surface=dashboard`

### Daten

- `Project.priorityScore`
- `Project.currentStage`
- `Project.currentGate`
- `Project.decisionDueAt`
- `AgentRecommendation.surface = dashboard`

### Akzeptanzkriterien

- Das Management sieht innerhalb von 10 Sekunden, welches Projekt als naechstes entschieden werden sollte.
- Pflanzenkohle/Pyrolyse ist ohne Suche auffindbar.
- Klick auf Pflanzenkohle fuehrt in die Kanban-/Projektansicht.
- Agentenhinweis hat Aktionen: `Übernehmen`, `Bearbeiten`, `Ablehnen`.

## Ticket V02: Stage-Gate Kanban Gesamtuebersicht

### Ziel

Die App zeigt den gesamten Stage-Gate-Prozess als Kanban-Board. Jede Spalte entspricht einem Stage oder Gate und zeigt Projekte mit Fortschritt in Prozent.

### UI Behavior

- Kanban ist die zentrale Prozessuebersicht.
- Jede Spalte hat Titel, Kurzbeschreibung und Projektanzahl.
- Projektkarten zeigen Projektname, Owner, Fortschritt in Prozent, Pflichtnachweise offen/erfuellt, naechste Entscheidung.
- Prozentanzeige ist farblich hervorgehoben:
  - 0-49 Prozent: rot/risikobehaftet
  - 50-79 Prozent: gelb/handlungsbeduerftig
  - 80-99 Prozent: blau/fast bereit
  - 100 Prozent: gruen/gate-ready
- Kein Nutzer kann ein Projekt in die naechste Stage ziehen, wenn Pflichtnachweise fehlen.
- Admins koennen Pflichtnachweise aussetzen oder Regeln neu strukturieren.

### Frontend

- Route: `/kanban`
- Komponenten: `StageGateKanban`, `StageColumn`, `ProjectKanbanCard`, `CompletionProgress`.
- Burger-Menue je Stage/Gate mit Optionen: Details ansehen, Einstellungen oeffnen, Regeln anzeigen.

### Backend/API

- `GET /api/kanban/stage-gate`
- `PATCH /api/projects/{projectId}/position`
- `GET /api/projects/{projectId}/completion`
- `POST /api/projects/{projectId}/stage-transition-attempt`

### Daten

- `StageDefinition.order`
- `GateDefinition.order`
- `ProjectStage.completionPercent`
- `ProjectStage.requiredEvidenceCompleted`
- `ProjectStage.requiredEvidenceTotal`
- `ProjectStage.transitionBlockedReason`

### Akzeptanzkriterien

- Pflanzenkohle/Pyrolyse steht bei Gate 2.
- Fortschritt ist auf jeder Karte sichtbar.
- Drag oder Wechselversuch wird blockiert, wenn Pflichtnachweise fehlen.
- Blockierung nennt konkret fehlende Nachweise.
- Admin-Rolle sieht eine Option zum Bearbeiten der Stage-/Gate-Regeln.

## Ticket V03: Projekt-Drawer mit gefuehrtem Prozess

### Ziel

Wenn ein Projekt im Kanban angeklickt wird, oeffnet sich ein seitliches Drawer-Panel mit den naechsten Schritten, statt den Nutzer in eine lose Detailwelt zu werfen.

### UI Behavior

- Klick auf eine Projektkarte oeffnet rechts einen Drawer.
- Der Drawer zeigt: aktueller Stage/Gate, Fortschritt, fehlende Pflichtnachweise, naechste Schritte, Agentenempfehlung.
- Hauptaktionen sind klar gefuehrt: `Nachweis ergänzen`, `Agent beauftragen`, `Entscheidung vorbereiten`, `Zum Gate öffnen`.
- Der Agent tritt im Drawer als Prozessassistent auf.

### Frontend

- Komponenten: `ProjectDrawer`, `NextStepsList`, `MissingEvidenceList`, `DrawerAgentAssistant`.
- Drawer bleibt kontextuell: Kanban bleibt im Hintergrund sichtbar.

### Backend/API

- `GET /api/projects/{projectId}/drawer-summary`
- `GET /api/projects/{projectId}/next-steps`
- `POST /api/agent-runs` mit `taskType = identify_missing_evidence`

### Daten

- `NextStep`
- `MissingEvidence`
- `AgentRun.taskType`

### Akzeptanzkriterien

- Drawer oeffnet ohne Seitenwechsel.
- Der erste sichtbare Inhalt beantwortet: Was ist als naechstes zu tun?
- Fehlende Pflichtnachweise koennen direkt an den Agenten uebergeben werden.
- Nutzer kann zur Gate-2-Entscheidungsansicht wechseln.

## Ticket V04: Pflichtnachweise und Stage-Abschluss-Blockierung

### Ziel

Pflichtnachweise sind verbindlich. Die App verhindert Stage-Abschluss und Gate-Weiterleitung, solange Pflichtnachweise fehlen.

### UI Behavior

- Fehlende Nachweise werden nicht als `unklar`, sondern als Prozentfortschritt unter 100 Prozent angezeigt.
- Abschlussbutton bleibt deaktiviert oder erzeugt eine klare Blockierung.
- Nutzer kann den Agenten beauftragen, Informationen zu beschaffen oder eine Aufgabenliste zu erstellen.
- Admin kann Pflichtnachweise aussetzen, muss dies aber begruenden.

### Frontend

- Komponenten: `EvidenceChecklist`, `CompletionGate`, `AdminOverrideDialog`, `AgentEvidenceTaskPanel`.
- Deutliche Copy: `Stage kann nicht abgeschlossen werden, weil 3 Pflichtnachweise fehlen.`

### Backend/API

- `GET /api/projects/{projectId}/evidence-requirements`
- `POST /api/projects/{projectId}/stage-completion-check`
- `POST /api/evidence/{evidenceId}/admin-waive`
- `POST /api/agent-runs` mit `taskType = collect_required_information`

### Daten

- `EvidenceRequirement.required = true`
- `Evidence.status = missing | partial | submitted | accepted | waived`
- `Evidence.waivedBy`
- `Evidence.waiverReason`

### Akzeptanzkriterien

- Stage kann bei <100 Prozent nicht abgeschlossen werden.
- Admin-Override setzt einen Audit-Log-Eintrag.
- Agentenaufgabe kann aus fehlenden Nachweisen erstellt werden.
- Prozentanzeige aktualisiert sich nach akzeptiertem oder ausgesetztem Nachweis.

## Ticket V05: Gate-2 Entscheidungsansicht mit KI-Empfehlung

### Ziel

Wenn alle Pflichtinformationen fuer Gate 2 vollstaendig sind, schlaegt die KI eine Entscheidung vor und begruendet diese kurz. Das Management entscheidet direkt im Tool.

### UI Behavior

- Gate-2-Seite zeigt Kriterien, Nachweise, Business-Case-Varianten, Rechtsformstatus und Agentenempfehlung.
- KI-Empfehlung erscheint erst, wenn Gate-Fortschritt 100 Prozent erreicht.
- Entscheidungsoptionen: `Go`, `Stop`, `Hold`, `Pivot`.
- Management waehlt eine Entscheidung, fuegt optional Kommentar hinzu und bestaetigt.
- Entscheidung wird sofort protokolliert.

### Frontend

- Route: `/projects/{projectId}/gates/{gateId}`
- Komponenten: `GateDecisionView`, `CriterionScoreList`, `AgentRecommendationCard`, `ManagementDecisionForm`.
- Agent tritt als Management-Briefing-Assistant auf.

### Backend/API

- `GET /api/gate-reviews/{reviewId}`
- `POST /api/agent-runs` mit `taskType = recommend_gate_decision`
- `POST /api/gate-reviews/{reviewId}/decision`
- `GET /api/projects/{projectId}/business-case-variants`

### Daten

- `GateReview.readinessPercent`
- `GateReview.agentRecommendation`
- `GateDecision.decision`
- `GateDecision.rationale`
- `GateDecision.decidedBy`
- `GateDecision.decidedAt`

### Akzeptanzkriterien

- Bei <100 Prozent erscheint keine finale KI-Entscheidungsempfehlung.
- Bei 100 Prozent erscheint Empfehlung mit kurzer Begruendung.
- Management kann im Tool `Go` waehlen.
- Nach `Go` wird das Projekt nach Stage 3 ueberfuehrt.

## Ticket V06: Ueberfuehrung von Gate 2 in Stage 3

### Ziel

Nach `Go` in Gate 2 zeigt die App sofort, welche Anforderungen in Stage 3 fuer Pilotierung/Reallabor/Forschungsprojekt gelten.

### UI Behavior

- Nach Entscheidung `Go` erscheint eine Erfolgsmeldung und direkter Wechsel zu Stage 3.
- Stage 3 zeigt Fortschritt bei 0 Prozent oder initialem Seed-Wert.
- Pflichtnachweise fuer Stage 3 werden sichtbar.
- Der Agent tritt als BD-Experte der eGLV auf und erklaert, welche Informationen fuer Pilotierung und Reallabor wichtig sind.

### Frontend

- Komponenten: `StageTransitionResult`, `StageRequirementOverview`, `Stage3PilotChecklist`.
- Route nach Entscheidung: `/kanban?project={projectId}` oder direkt Drawer mit Stage-3-Kontext.

### Backend/API

- `POST /api/gate-reviews/{reviewId}/decision`
- `POST /api/projects/{projectId}/transition`
- `GET /api/projects/{projectId}/stages/{stageId}`

### Daten

- `Project.currentStage = stage-3`
- `ProjectStage.startedAt`
- `ProjectStage.completionPercent`
- `AuditEvent.type = project.transitioned`

### Akzeptanzkriterien

- Projekt erscheint nach Gate-2-Go in Stage 3.
- Stage-3-Pflichtnachweise werden direkt angezeigt.
- Prozentanzeige ist sichtbar.
- Agent gibt konkrete naechste Handlungsempfehlung.

## Ticket V07: Gate-3 Scheitern, Archiv und Erinnerung

### Ziel

Die Demo zeigt, dass ein Projekt in Gate 3 scheitern kann, im Archiv landet und mit einer Erinnerung spaeter wieder betrachtet werden kann.

### UI Behavior

- Gate 3 bietet Entscheidungsoptionen `Go`, `Stop`, `Hold`, `Pivot`.
- Fuer die Demo wird eine negative Entscheidung simuliert.
- Projekt wandert in das Archiv.
- Nutzer kann ein Erinnerungsdatum setzen.
- Archiv zeigt Entscheidungsgrund, Datum, naechste Erinnerung und Reaktivierungsoption, falls erlaubt.
- Agent erinnert spaeter proaktiv an das Projekt.

### Frontend

- Routen: `/archive`, `/projects/{projectId}/archive-summary`
- Komponenten: `ArchiveList`, `ArchivedProjectCard`, `ReminderPicker`, `GateFailureSummary`.

### Backend/API

- `POST /api/gate-reviews/{reviewId}/decision`
- `POST /api/projects/{projectId}/archive`
- `POST /api/projects/{projectId}/reminders`
- `GET /api/archive`

### Daten

- `Project.status = archived`
- `ArchiveRecord.reason`
- `ArchiveRecord.gateId`
- `Reminder.remindAt`
- `Reminder.note`

### Akzeptanzkriterien

- Projekt ist nach Gate-3-Scheitern nicht mehr im aktiven Kanban.
- Projekt ist im Archiv sichtbar.
- Erinnerung kann gesetzt werden.
- Agentenlogik kann archivierte Projekte mit faelliger Erinnerung priorisieren.

## Ticket V08: Admin-Einstellungen fuer Stages, Gates und Regeln

### Ziel

Admins koennen den generellen Stage-Gate-Prozess flexibel bearbeiten. Alle anderen Nutzer muessen dem vorgegebenen Prozess folgen.

### UI Behavior

- Einstellungen haben einen visuellen Stage-Gate-Editor.
- Stages und Gates koennen per Drag-and-drop sortiert werden.
- Regeln koennen hinzugefuegt werden, z. B. `Projektkosten duerfen nicht groesser als X sein`.
- Pflichtnachweise und Gate-Kriterien koennen bearbeitet werden.
- Aenderungen wirken grundsaetzlich auf alle Projekte.
- Projektspezifische Kommentare und Spezialregeln koennen zusaetzlich gepflegt werden.

### Frontend

- Route: `/settings/process`
- Komponenten: `ProcessEditor`, `RuleBuilder`, `StageGateDragDrop`, `ProjectSpecificRulesPanel`.

### Backend/API

- `GET /api/process-definitions/current`
- `POST /api/process-definitions/{processId}/rules`
- `PATCH /api/stage-definitions/{stageId}`
- `PATCH /api/gate-definitions/{gateId}`
- `POST /api/process-definitions/{processId}/publish`
- `POST /api/projects/{projectId}/custom-rules`

### Daten

- `Rule`
- `Rule.scope = global | project`
- `Rule.type = threshold | required_evidence | decision_constraint | custom`
- `Rule.expression`
- `Rule.createdBy`

### Akzeptanzkriterien

- Admin kann eine neue Kostenregel anlegen.
- Nicht-Admins koennen Regeln sehen, aber nicht bearbeiten.
- Regel erscheint in relevanten Stage-/Gate-Pruefungen.
- Aenderung wird auditiert.

## Ticket V09: Proaktiver Agent und Priorisierung

### Ziel

Der Agent fuehrt Management und Business Development zu den wichtigsten Entscheidungen und Projekten.

### UI Behavior

- Auf dem Dashboard agiert der Agent als Management-Briefing-Assistant.
- Im Kanban agiert er als Prozessassistent.
- In Stage/Gate-Formularen agiert er als BD-Experte der eGLV.
- Agentenvorschlaege haben genau drei Aktionen: `Übernehmen`, `Bearbeiten`, `Ablehnen`.
- Wenn Nutzer ablehnen oder nicht reagieren, kann der Agent spaeter erneut erinnern.

### Frontend

- Komponenten: `AgentRecommendationCard`, `AgentActionButtons`, `AgentReminderNudge`.
- Agentenstatus muss klar erkennbar sein: Vorschlag, Warnung, Erinnerung, Entscheidungsvorbereitung.

### Backend/API

- `GET /api/agent-recommendations`
- `POST /api/agent-recommendations/{id}/accept`
- `POST /api/agent-recommendations/{id}/edit`
- `POST /api/agent-recommendations/{id}/reject`
- `POST /api/agent-recommendations/{id}/remind-later`

### Daten

- `AgentRecommendation`
- `AgentRecommendation.surface`
- `AgentRecommendation.priority`
- `AgentRecommendation.status = proposed | accepted | edited | rejected | snoozed`

### Akzeptanzkriterien

- Agent zeigt auf jeder Hauptansicht kontextgerechtes Verhalten.
- Es gibt nur die drei primaeren Aktionen.
- Abgelehnte oder vertagte Themen koennen spaeter erneut auftauchen.
- Agent trifft keine Managemententscheidung selbst.

## Ticket V10: Demo-Script und Seed-Daten fuer Pflanzenkohle/Pyrolyse

### Ziel

Die Demo laeuft stabil entlang des geplanten Videos: Dashboard, Kanban, Gate 2, Stage 3, Gate 3 Scheitern, Archiv, Erinnerung, Einstellungen.

### UI Behavior

- Demo-Daten sind konsistent und ohne echte vertrauliche Informationen.
- Demo startet mit Login und sichtbarer Zwei-Faktor-Authentifizierung.
- Pflanzenkohle/Pyrolyse startet bei Gate 2.
- Gate 2 kann erfolgreich entschieden werden.
- Stage 3 zeigt Fortschritt und Pflichtnachweise.
- Gate 3 kann scheitern.
- Archiv und Erinnerung funktionieren sichtbar.
- Am Ende wird in den Einstellungen die Microsoft-nahe Infrastruktur und Datenarchitektur gezeigt.

### Frontend

- Demo-Modus erkennbar markieren.
- QR-Code-Ziel ist Dashboard.
- QR-Code-Ziel kann zunaechst eine fixe Vercel-URL sein; spaeter kann eine eigene Domain oder ein Redirect vorgeschaltet werden.
- Optional Button: `Demo zurücksetzen`.

### Backend/API

- `POST /api/demo/reset`
- `GET /api/demo/script-state`
- Seed-Daten fuer Projekte, Prozessdefinition, Nachweise, Gate Reviews, Agentenempfehlungen.

### Daten

- `DemoScenario`
- `DemoScenarioStep`
- `SeedProject`

### Akzeptanzkriterien

- Demo kann mehrfach vorgefuehrt werden.
- QR-Code fuehrt auf stabile Demo-URL mit Login.
- Alle Video-Schritte sind ohne manuelle Datenkorrektur klickbar.
- Demo ist klar als Demonstrator gekennzeichnet.

## Ticket V11: Lead-Capture nach Demo-Nutzung

### Ziel

Nach kurzer Nutzung kann der Besucher seine E-Mail-Adresse hinterlassen. Die Adresse wird gespeichert und als Lead-Benachrichtigung an `js090168@fh-muenster.de` gesendet. Es wird kein automatisches Einladungsdokument versprochen.

### UI Behavior

- Nach ca. 30 Sekunden Demo-Nutzung erscheint ein Modal.
- Das Modal blockiert die weitere Nutzung, bis der Nutzer eine E-Mail-Adresse eintraegt oder die Demo bewusst verlaesst.
- Dialog fragt nach E-Mail-Adresse und Zustimmung zur Kontaktaufnahme.
- Text fokussiert auf Rueckfrage/Einleitungsgespraech, nicht auf Einladungsdokumente.
- Nutzer kann das Modal nicht einfach schliessen und unbegrenzt weiter testen.
- Nach dem Lead-Capture kann der Nutzer weiter Daten eingeben; diese Eingaben werden dauerhaft gespeichert.

### Frontend

- Komponenten: `LeadCaptureModal`, `PrivacyConsentCheckbox`, `LeadCaptureSuccessToast`.
- Copy-Beispiel: `Moechten Sie Rueckfragen zur Demo stellen oder ein Einleitungsgespraech vereinbaren? Hinterlassen Sie Ihre E-Mail-Adresse.`

### Backend/API

- `POST /api/leads`
- `POST /api/leads/{leadId}/notify-owner`
- `GET /api/leads`

### Daten

- `Lead.email`
- `Lead.consentGiven`
- `Lead.createdAt`
- `Lead.source = qr_demo`
- `Lead.notifiedOwnerAt`
- `Lead.accessUnlockedAt`
- `DemoUserInput.persisted = true`

### Akzeptanzkriterien

- E-Mail-Adresse wird dauerhaft gespeichert.
- Datenschutz-Zustimmung wird abgefragt.
- Schul-E-Mail-Adresse erhaelt eine Benachrichtigung.
- Benachrichtigung geht an `js090168@fh-muenster.de`.
- Es wird kein automatisiertes Einladungsdokument erwaehnt.
- Weitere Demo-Nutzung wird erst nach Lead-Capture freigeschaltet.
- Nutzereingaben nach Freischaltung werden gespeichert.

## Ticket V12: Microsoft-Infrastruktur und Datenarchitektur in Einstellungen

### Ziel

Die Demo zeigt visuell, dass die App in eine Microsoft-orientierte Infrastruktur passt und langfristig auf Azure Static Web Apps deployed werden kann.

### UI Behavior

- In den Einstellungen gibt es eine Ansicht `APIs & Infrastruktur`.
- Die Ansicht zeigt: Azure Static Web Apps, Microsoft Entra ID, SharePoint, Teams/Outlook, Power BI, Azure AI/Azure Functions und Datenhaltung.
- Es wird klar getrennt zwischen `Demo-Prototyp` und `Zielarchitektur`.
- Alle Microsoft-Bausteine werden als vorhandene Infrastruktur dargestellt.
- Kontrollierter Agent wird als sicherer, API-basierter Workflow gezeigt.

### Frontend

- Route: `/settings/infrastructure`
- Komponenten: `InfrastructureMap`, `MicrosoftIntegrationList`, `ArchitectureFitPanel`.

### Backend/API

- `GET /api/infrastructure/microsoft-fit`
- `GET /api/infrastructure/integrations`
- `PATCH /api/settings/integrations/{integrationId}`

### Daten

- `IntegrationCapability`
- `IntegrationCapability.status = planned | demo | connected`
- `ArchitectureFitNote`

### Akzeptanzkriterien

- Management erkennt, dass die App keine isolierte Inselloesung ist.
- Azure Static Web Apps wird als langfristiges Deploymentziel sichtbar.
- Microsoft-Entra-ID/MFA, SharePoint, Teams/Outlook und Power BI werden als anschlussfaehige Bausteine dargestellt.
- Kontrollierter Agent wird als integrierbar, aber nicht als offene KI-Spielwiese dargestellt.

## Priorisierung

1. V10 Demo-Script und Seed-Daten
2. V00 Demo-Login mit sichtbarer Zwei-Faktor-Authentifizierung
3. V01 Management Dashboard
4. V02 Stage-Gate Kanban
5. V03 Projekt-Drawer
6. V05 Gate-2 Entscheidungsansicht
7. V06 Ueberfuehrung in Stage 3
8. V07 Gate-3 Scheitern, Archiv und Erinnerung
9. V12 Microsoft-Infrastruktur und Datenarchitektur in Einstellungen
10. V11 Lead-Capture nach Demo-Nutzung
11. V04 Pflichtnachweise und Blockierung
12. V08 Admin-Einstellungen
13. V09 Proaktiver Agent

Hinweis: V04 liegt fachlich frueh, kann aber technisch zuerst in einfacher Form innerhalb V02/V05 umgesetzt und danach als eigenes Regel-/Override-System vertieft werden.

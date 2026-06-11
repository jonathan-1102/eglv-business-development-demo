# eGLV Business Development Demo App

Statischer, dependency-freier MVP-Prototyp fuer die management-fokussierte eGLV-Demo.

## Start

```bash
npm run dev
```

Danach lokal oeffnen:

```text
http://localhost:5173
```

## Demo-Flow

1. Login mit `management@eglv-demo.de`.
2. Visuelle Zwei-Faktor-Authentifizierung bestaetigen.
3. Dashboard zeigt Management-Prioritaeten.
4. Demo-Regie zeigt den gefuehrten Presenter-Flow.
5. Kanban zeigt Pflanzenkohle/Pyrolyse bei Gate 2.
6. Projektkarte oeffnet einen rechten Drawer mit Pflichtnachweisen und Agentenaufgaben.
7. Gate 2 kann mit `Go` entschieden werden.
8. Projekt wird in Stage 3 ueberfuehrt.
9. Stage 3 zeigt Pflichtnachweise, Prozentfortschritt und kontrollierte Agentenaufgaben.
10. Gate 3 kann fuer die Demo scheitern.
11. Projekt landet im Archiv mit Erinnerung.
12. Einstellungen zeigen Stage-/Gate-Regeln, Microsoft-Infrastrukturfit, API-Blueprint und letzte API-Events.

## Produktlogik

- Jede Managemententscheidung schreibt einen Audit-Eintrag und einen simulierten API-Event.
- Agenten handeln kontrolliert: `Übernehmen`, `Bearbeiten`, `Ablehnen` und Aufgabenanlage fuer fehlende Pflichtnachweise.
- Neue Projekte und Regeln koennen eingegeben werden; dynamische Texte werden vor dem Rendern escaped.
- Die API-Sicht ist als Vercel-Prototyp visualisiert und laesst sich spaeter auf Azure Functions, Entra ID, SharePoint, Power BI und Azure Data Store uebertragen.

## Lead-Gate

Nach ca. 30 Sekunden erscheint ein Lead-Capture-Modal. Nach DSGVO-Zustimmung wird die Demo fuer 24 Stunden freigeschaltet. Leads werden im Prototyp in `localStorage` gespeichert und fuer eine spaetere Benachrichtigung an `js090168@fh-muenster.de` vorbereitet.

## Deployment

Der Ordner ist fuer ein statisches Vercel-Deployment vorbereitet. Spaeter kann eine eigene Domain oder ein Redirect vor die Vercel-URL gelegt werden. Langfristiges Ziel bleibt Azure Static Web Apps.

## Entwicklungsorchestrierung

Aktueller Arbeitszweig:

```text
codex/eglv-demo-mvp
```

Arbeitsweise:

1. Kleine vertikale Features bauen: UI, Demo-Daten, Verhalten und Persistenz zusammen.
2. Nach jedem sichtbaren Fortschritt testen und committen.
3. `main` bleibt die stabile Linie; aktive Arbeit laeuft auf `codex/eglv-demo-mvp`.
4. Fuer die Demo zuerst den Klickpfad stabilisieren, danach echte Services anbinden.

Empfohlene naechste Commits:

1. `feat: scaffold static eglv demo app`
2. `feat: add management demo flow`
3. `feat: add lead gate and local persistence`
4. `docs: add deployment and azure migration notes`

Noch offen fuer produktionsnaehere Version:

- Echte Lead-Benachrichtigung an `js090168@fh-muenster.de` ueber Microsoft Graph, Resend oder einen anderen Maildienst.
- Persistente Datenbank statt `localStorage`.
- Echte Microsoft-Entra-ID-Anbindung statt visueller MFA.
- Vercel-Projekt anlegen und feste Demo-URL fuer QR-Code sichern.
- Spaetere Migration auf Azure Static Web Apps.

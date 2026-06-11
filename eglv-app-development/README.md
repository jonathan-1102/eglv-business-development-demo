# eGLV Business Development Agent App

Dieses Verzeichnis beschreibt eine API-basierte Demo- und Produktvision fuer eine eGLV-App, die den ausgearbeiteten Business-Development-Stage-Gate-Prozess digital abbildet. Die App soll Projekte von der Idee bis zur Verstetigung fuehren, fehlende Nachweise sichtbar machen, Management-Gates vorbereiten und mit einem Business Development Agenten repetitive Aufgaben reduzieren.

## Ausgangspunkt

Die Grundlage ist der in der Abschlussprasentation dargestellte eGLV-Prozess:

- Stage 0: Discovery & Scoping, Opportunity Identification, Policy & Funding
- Stage 1: Stakeholder Co-Creation
- Gate 1: Strategic Fit
- Stage 2: Business Case
- Gate 2: Invest + Rechtsform
- Stage 3: Pilotierung, Reallabor oder Forschungsprojekt
- Gate 3: Skalierung
- Stage 4: Markteinfuehrung
- Gate 4: Post-Launch
- Stage 5: Betrieb & Verstetigung

Das Pyrolyse-/Pflanzenkohle-Beispiel dient als Demo-Projekt, an dem gezeigt wird, wie ein Vorhaben durch Stages, Gates, Nachweise, Entscheidungen und Agentenunterstuetzung laeuft.

## Dokumente

- [Frontend-Konzept](./frontend.md): Informationsarchitektur, Screens, UI-Komponenten, eGLV-Designsystem und UX-Prinzipien.
- [Backend-Konzept](./backend.md): Domaenenmodell, Datenobjekte, Agentenlogik, Rollen, Persistenz und technische Leitplanken.
- [API- und App-Struktur](./app-structure-api.md): API-first Architektur, Endpunkte, Events, Integrationen und Demo-Deployment.
- [Zusammenfassung](./summary.md): Produktkern, Service-Blueprint, MVP-Scope und Umsetzungslogik.
- [Vertical Feature Tickets](./vertical-feature-tickets.md): Management-fokussierte, vertikal geschnittene Tickets fuer UI, API, Datenmodell und Agentenverhalten.
- [Demo-Sprechtext](./demo-script.md): Kurzskript fuer die management-fokussierte Demo mit Login, 2FA, Agent und Microsoft-Architektur.

## Skills

Die Skills sind als wiederverwendbare Arbeitsanweisungen fuer die weitere Produktentwicklung gedacht:

- [Frontend Skill](./skills/frontend-eglv-app/SKILL.md)
- [Backend Skill](./skills/backend-eglv-app/SKILL.md)
- [Projektmanagement Skill](./skills/project-management-eglv-app/SKILL.md)

## Produktversprechen

Die App stellt der eGLV einen digitalen Business-Development-Service bereit:

1. Projekte werden entlang eines konfigurierbaren Stage-Gate-Prozesses gefuehrt.
2. Teams sehen jederzeit, wo ein Projekt steht und was fuer den naechsten Schritt fehlt.
3. Managemententscheidungen werden vorbereitet, dokumentiert und nachvollziehbar gemacht.
4. Wiederkehrende Aufgaben wie Gate-Briefings, Business-Case-Strukturen, Stakeholderlisten, Risikoannahmen und Lessons Learned werden vom Agenten vorgeschlagen.
5. Wissen wird aus einzelnen Personen in einen wiederholbaren Prozess, strukturierte Daten und wiederverwendbare Vorlagen ueberfuehrt.

## Demo-Abgrenzung

Ein Probierlink fuer die eGLV sollte nur Demo-Daten enthalten. Der Demoeinstieg zeigt einen Login mit `management@eglv-demo.de` und sichtbarer Zwei-Faktor-Authentifizierung, kann fuer den Prototyp aber kontrolliert simuliert werden. Nach ca. 30 Sekunden erscheint ein Lead-Capture-Modal, damit die Software nicht unbegrenzt frei nutzbar ist. Lead-E-Mail-Adressen und Demo-Nutzereingaben duerfen laenger gespeichert werden, wenn Zustimmung und Datenschutzhinweis sauber eingebaut sind. Fuer eine produktive Nutzung braucht die App spaeter Authentifizierung, Rollenrechte, Audit-Logs, Datenschutzkonzept und eine klare Datenloeschlogik.

## Deployment-Richtung

- Prototyp: stabile Demo-URL auf Vercel, optional spaeter mit eigener Domain oder Redirect fuer den QR-Code.
- Langfristig: Azure Static Web Apps mit Microsoft Entra ID, SharePoint, Teams/Outlook, Power BI und Azure-basierter Agenten-/API-Architektur.
- Lead-Benachrichtigungen: `js090168@fh-muenster.de`.

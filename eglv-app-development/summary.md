# Zusammenfassung: Produkt- und Projektentwicklung

## Produktidee

Die eGLV Business Development Agent App ist eine digitale Arbeitsplattform fuer den entwickelten Stage-Gate-Prozess. Sie kombiniert Prozessfuehrung, Projektuebersicht, Gate-Entscheidungen, konfigurierbare Prozessdefinitionen und einen Business Development Agenten.

Der Nutzen liegt nicht nur in einer schoeneren Darstellung des Prozesses. Die App macht Business Development operativ nutzbar: Sie zeigt, wo Projekte stehen, was fehlt, wer entscheiden muss und welche wiederkehrenden Aufgaben automatisiert vorbereitet werden koennen.

## Service-Blueprint in einem Satz

Die Software liefert der eGLV einen gefuehrten Business-Development-Service, bei dem Nutzer vorne mit klaren Screens arbeiten und hinten Prozesslogik, Nachweispruefung, Agentenunterstuetzung, Auditierung und Wissensspeicherung zusammenspielen.

## MVP-Scope

Der erste Demo-Prototyp sollte diese Funktionen enthalten:

- Demo-Login mit sichtbar abgeschlossener Zwei-Faktor-Authentifizierung.
- Dashboard mit Projekten entlang des Stage-Gate-Prozesses.
- Detailseite fuer das Beispiel Pflanzenkohle/Pyrolyse.
- Stage-Workflow mit fehlenden Nachweisen.
- Gate-Seite fuer Managemententscheidungen.
- Einstellungsseite zur Definition von Stages und Gates.
- Agentenpanel mit simulierten oder echten Vorschlaegen fuer Gate-Briefings, Nachweise und Business-Case-Struktur.
- Lead-Capture nach kurzer Demo-Nutzung mit Benachrichtigung an die Schul-E-Mail-Adresse.
- Einstellungen mit visueller Microsoft-/Azure-Architekturansicht.

## Wichtigste Produktentscheidungen

- Der Stage-Gate-Prozess wird konfigurierbar und versioniert.
- Die App bewertet Public Value, Verbandsauftrag, Betriebsfaehigkeit und Rechtsform genauso ernst wie Wirtschaftlichkeit.
- Der Agent unterstuetzt, aber entscheidet nicht.
- Die Demo nutzt nur Beispieldaten.
- Das Frontend bleibt ein Arbeitstool, kein Marketing-Auftritt.
- Prototyp-Deployment: stabile Demo-URL auf Vercel, langfristig Azure Static Web Apps.
- Es wird kein automatisiertes Einladungsdokument versprochen; E-Mail-Adressen dienen der Nachbereitung und Kontaktaufnahme.
- Lead-Benachrichtigungen gehen an `js090168@fh-muenster.de`.
- Die Zwei-Faktor-Authentifizierung wird in der Demo visuell dargestellt.
- Microsoft-Infrastrukturbausteine werden als vorhanden angenommen.
- Demo-Login nutzt `management@eglv-demo.de`.
- Lead-Capture erscheint nach ca. 30 Sekunden als Modal und schaltet die weitere Nutzung frei.
- Demo-Nutzereingaben koennen dauerhaft gespeichert werden.

## Warum das fuer eGLV passt

Die Praesentation zeigt, dass eGLV Business Development nicht als klassischer Venture-Funnel funktionieren sollte. Entscheidend sind oeffentlicher Auftrag, Stakeholder, politische und regulatorische Passung, Reallabore, Rechtsformlogik, Verbandsverstetigung und Wissenstransfer.

Genau diese Logik wird in der App als strukturierter Service umgesetzt:

- Ideenmanagement wird zum Eingangskanal.
- Stage 0 trennt Technologie, Nachfrage und Policy/Funding.
- Gate 1 schuetzt Ressourcen, ohne Public-Value-Ideen vorschnell zu stoppen.
- Stage 2 macht Business Cases vergleichbar.
- Gate 2 verbindet Investitionsentscheidung mit Rechtsform.
- Stage 3 nutzt Reallabore als Lernschritt.
- Stage 4 klaert Markteinfuehrung, Tochter-GmbH oder Verbandsverstetigung.
- Stage 5 macht Betrieb und Wissenstransfer sichtbar.

## Zwei grafische Darstellungen fuer Video und Pitch

### Grafik 1: Service-Blueprint

Darstellung von Nutzeraktionen, Frontend-Touchpoints, Backstage-Prozessen und Agentenunterstuetzung.

Kernaussage: Die App ist kein Dashboard allein, sondern ein digitaler Business-Development-Service.

### Grafik 2: Stage-Gate-Agentenfluss

Darstellung eines Projekts vom Eingangspfad bis zur Verstetigung. Unter jedem Stage stehen Pflichtnachweise, unter jedem Gate Managemententscheidung und Agentenbeitrag.

Kernaussage: Der Agent reduziert Teamzeit, indem er fehlende Informationen erkennt, Entscheidungsvorlagen vorbereitet und Wissen wiederverwendbar macht.

## Naechste Umsetzungsschritte

1. QR-Code-Ziel festlegen: zunaechst fixe Vercel-URL oder direkt eigene Domain/Redirect.
2. Demo-Scope finalisieren: Login/MFA, Dashboard, Kanban, Gate 2, Stage 3, Gate 3, Archiv, Einstellungen/Infrastruktur.
3. Seed-Daten fuer Pflanzenkohle/Pyrolyse definieren.
4. API-Dummy oder echtes Backend waehlen.
5. Frontend-Prototyp im eGLV-Design bauen.
6. Agentenoutputs kontrolliert simulieren.
7. Demo-Link deployen und Video-Storyboard anhand der Management-Demo vorbereiten.

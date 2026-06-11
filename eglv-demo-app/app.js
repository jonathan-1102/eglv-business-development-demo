const SESSION_KEY = "eglv-demo-session";
const DATA_KEY = "eglv-demo-data";
const LEADS_KEY = "eglv-demo-leads";
const UNLOCK_KEY = "eglv-demo-unlocked-until";

const leadRecipient = "js090168@fh-muenster.de";
const demoLoginEmail = "management@eglv-demo.de";

const stageDefinitions = [
  {
    id: "stage-0",
    title: "Stage 0",
    subtitle: "Discovery, Opportunity, Policy",
    description: "Eingangspfade fuer Technologie, Nachfrage oder Foerderfenster."
  },
  {
    id: "stage-1",
    title: "Stage 1",
    subtitle: "Stakeholder Co-Creation",
    description: "Problemvalidierung, Use Case und Stakeholder-Commitment."
  },
  {
    id: "gate-1",
    title: "Gate 1",
    subtitle: "Strategic Fit",
    description: "Pruefung von Verbandsauftrag, Public Value und Machbarkeit."
  },
  {
    id: "stage-2",
    title: "Stage 2",
    subtitle: "Business Case",
    description: "Varianten, Wirkungsmodell, Wirtschaftlichkeit und Rechtsform."
  },
  {
    id: "gate-2",
    title: "Gate 2",
    subtitle: "Invest + Rechtsform",
    description: "Managemententscheidung ueber Pilotbudget und Struktur."
  },
  {
    id: "stage-3",
    title: "Stage 3",
    subtitle: "Pilotierung",
    description: "Reallabor, Forschungsprojekt oder beschleunigtes Verfahren."
  },
  {
    id: "gate-3",
    title: "Gate 3",
    subtitle: "Skalierung",
    description: "Entscheidung ueber Roll-out, Pivot, Hold oder Stop."
  },
  {
    id: "stage-4",
    title: "Stage 4",
    subtitle: "Markteinfuehrung",
    description: "Verbandsverstetigung, Tochter-GmbH oder Partnermodell."
  },
  {
    id: "archive",
    title: "Archiv",
    subtitle: "Wissen sichern",
    description: "Abgelegte Projekte mit Entscheidung, Erinnerung und Lernwert."
  }
];

const microsoftIntegrations = [
  ["Azure Static Web Apps", "Langfristiges Hosting fuer compliant Web-App-Betrieb"],
  ["Microsoft Entra ID", "Login, Rollen und Multi-Faktor-Authentifizierung"],
  ["SharePoint", "Nachweise, Gate-Dokumente und Business-Case-Artefakte"],
  ["Teams / Outlook", "Benachrichtigungen, Follow-ups und Management-Termine"],
  ["Power BI", "Portfolio-Auswertung, Stage-Durchlaufzeiten und Entscheidungsmetriken"],
  ["Azure Functions", "API-Schicht, Agenten-Tasks und Integrationslogik"],
  ["Azure AI", "Kontrollierte Agenten-Workflows mit nachvollziehbarem Kontext"],
  ["Azure Data Store", "Persistenz fuer Projekte, Leads, Entscheidungen und Audit-Events"]
];

const seedData = {
  projects: [
    {
      id: "pyrolysis",
      name: "Pflanzenkohle / Pyrolyse",
      owner: "Business Development",
      field: "Klimaschutz und Kreislaufwirtschaft",
      stage: "gate-2",
      status: "decision_pending",
      progress: 100,
      nextDecision: "Invest + Rechtsform",
      priority: 96,
      createdByUser: false,
      summary: "Reststoffe durch Pyrolyse nutzbar machen, CO2 binden und einen skalierbaren Pilotpfad pruefen.",
      evidence: [
        { id: "bc", label: "Business-Case-Varianten vergleichbar", required: true, done: true },
        { id: "legal", label: "Rechtsform-Indikator vorbereitet", required: true, done: true },
        { id: "funding", label: "Foerderpotenzial eingeordnet", required: true, done: true },
        { id: "stakeholder", label: "Stakeholder-Commitment dokumentiert", required: true, done: true }
      ],
      stage3Evidence: [
        { id: "pilot-site", label: "Reallabor-Standort an EGLV-Anlage bestaetigen", required: true, done: false },
        { id: "lead-user", label: "Lead-User und Feedbackschleifen definieren", required: true, done: false },
        { id: "safety", label: "EHS- und Genehmigungsrisiken pruefen", required: true, done: false },
        { id: "pilot-budget", label: "Pilotbudget finalisieren", required: true, done: false }
      ],
      decisions: [],
      reminders: []
    },
    {
      id: "stormwater",
      name: "KI-Starkregen-Fruehwarnung",
      owner: "Fachbereich Betrieb",
      field: "Resilienz und Digitalisierung",
      stage: "stage-1",
      status: "needs_evidence",
      progress: 62,
      nextDecision: "Strategic Fit vorbereiten",
      priority: 74,
      createdByUser: false,
      summary: "Datenbasierte Fruehwarnung fuer kommunale Starkregenereignisse.",
      evidence: [
        { id: "need", label: "Kommunaler Bedarf validiert", required: true, done: true },
        { id: "data", label: "Datenverfuegbarkeit geklaert", required: true, done: false },
        { id: "owner", label: "Interner Sponsor identifiziert", required: true, done: true }
      ],
      stage3Evidence: [],
      decisions: [],
      reminders: []
    },
    {
      id: "heat-grid",
      name: "Abwaerme-Nutzung Klaeranlage",
      owner: "Strategie",
      field: "Energie und Waerme",
      stage: "stage-2",
      status: "in_progress",
      progress: 78,
      nextDecision: "Business Case vervollstaendigen",
      priority: 68,
      createdByUser: false,
      summary: "Nutzung vorhandener Waermepotenziale fuer kommunale Partner.",
      evidence: [
        { id: "value", label: "Wertversprechen", required: true, done: true },
        { id: "cost", label: "Kostenbandbreite", required: true, done: false },
        { id: "partner", label: "Partnerstruktur", required: true, done: true }
      ],
      stage3Evidence: [],
      decisions: [],
      reminders: []
    }
  ],
  rules: [
    { id: "cost-cap", label: "Projektkosten duerfen im Demo-Pilot nicht groesser als 250.000 Euro sein.", scope: "global" },
    { id: "evidence-lock", label: "Pflichtnachweise muessen vor Stage-Abschluss vollstaendig sein.", scope: "global" }
  ],
  archived: []
};

const state = {
  screen: "login",
  selectedProjectId: null,
  selectedDecision: "go",
  drawerOpen: false,
  modal: null,
  toast: "",
  data: loadData(),
  session: loadSession()
};

if (state.session?.mfaVerified) {
  state.screen = "dashboard";
  scheduleLeadGate();
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  state.session = session;
}

function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(DATA_KEY));
    if (stored?.projects) return stored;
  } catch {
    return null;
  }
  localStorage.setItem(DATA_KEY, JSON.stringify(seedData));
  return JSON.parse(JSON.stringify(seedData));
}

function saveData() {
  localStorage.setItem(DATA_KEY, JSON.stringify(state.data));
}

function getProject(id = state.selectedProjectId) {
  return state.data.projects.find((project) => project.id === id);
}

function getStage(id) {
  return stageDefinitions.find((stage) => stage.id === id);
}

function progressColor(progress) {
  if (progress >= 100) return "green";
  if (progress >= 80) return "blue";
  if (progress >= 50) return "yellow";
  return "red";
}

function updateProjectProgress(project) {
  const list = project.stage === "stage-3" ? project.stage3Evidence : project.evidence;
  if (!list.length) return;
  const done = list.filter((item) => item.done).length;
  project.progress = Math.round((done / list.length) * 100);
}

function setScreen(screen) {
  state.screen = screen;
  state.drawerOpen = false;
  state.modal = null;
  render();
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 3200);
}

function isLeadUnlocked() {
  const unlockedUntil = Number(localStorage.getItem(UNLOCK_KEY) || 0);
  return unlockedUntil > Date.now();
}

function scheduleLeadGate() {
  if (isLeadUnlocked()) return;
  window.setTimeout(() => {
    if (!isLeadUnlocked() && state.session?.mfaVerified) {
      state.modal = "lead";
      render();
    }
  }, 30000);
}

function handleLogin(event) {
  event.preventDefault();
  saveSession({
    email: demoLoginEmail,
    mfaVerified: false,
    startedAt: new Date().toISOString()
  });
  state.screen = "mfa";
  render();
}

function handleMfa() {
  saveSession({
    email: demoLoginEmail,
    mfaVerified: true,
    startedAt: state.session?.startedAt || new Date().toISOString(),
    verifiedAt: new Date().toISOString()
  });
  state.screen = "dashboard";
  scheduleLeadGate();
  render();
}

function resetDemo() {
  localStorage.removeItem(DATA_KEY);
  localStorage.removeItem(UNLOCK_KEY);
  state.data = loadData();
  state.selectedProjectId = null;
  state.drawerOpen = false;
  showToast("Demo wurde zurueckgesetzt.");
}

function openProject(projectId) {
  state.selectedProjectId = projectId;
  state.drawerOpen = true;
  render();
}

function openGate(projectId) {
  state.selectedProjectId = projectId;
  state.drawerOpen = false;
  state.screen = "gate";
  render();
}

function selectDecision(decision) {
  state.selectedDecision = decision;
  render();
}

function decideGate2() {
  const project = getProject();
  if (!project || project.progress < 100) {
    showToast("Gate 2 ist blockiert, weil Pflichtnachweise fehlen.");
    return;
  }
  project.decisions.push({
    gate: "Gate 2",
    decision: state.selectedDecision,
    decidedAt: new Date().toISOString(),
    rationale: "Business Case, Rechtsform und Foerderpotenzial sind fuer den Pilotpfad ausreichend belastbar."
  });
  if (state.selectedDecision === "go") {
    project.stage = "stage-3";
    project.status = "in_progress";
    updateProjectProgress(project);
    saveData();
    state.screen = "stage3";
    showToast("Projekt wurde in Stage 3 ueberfuehrt.");
    return;
  }
  if (state.selectedDecision === "stop") {
    archiveProject(project, "Stop in Gate 2");
    return;
  }
  project.status = state.selectedDecision === "hold" ? "on_hold" : "pivot";
  saveData();
  showToast(`Entscheidung ${state.selectedDecision.toUpperCase()} wurde dokumentiert.`);
  render();
}

function toggleStage3Evidence(id) {
  const project = getProject();
  if (!project) return;
  const item = project.stage3Evidence.find((evidence) => evidence.id === id);
  if (item) item.done = !item.done;
  updateProjectProgress(project);
  saveData();
  render();
}

function failGate3() {
  const project = getProject();
  if (!project) return;
  project.decisions.push({
    gate: "Gate 3",
    decision: "stop",
    decidedAt: new Date().toISOString(),
    rationale: "Skalierbarkeit und Betriebsreife sind fuer einen Roll-out noch nicht ausreichend nachgewiesen."
  });
  archiveProject(project, "Stop in Gate 3: Skalierung nicht freigegeben");
}

function archiveProject(project, reason) {
  state.data.archived.push({
    ...project,
    archivedAt: new Date().toISOString(),
    archiveReason: reason,
    reminderAt: null
  });
  state.data.projects = state.data.projects.filter((item) => item.id !== project.id);
  saveData();
  state.selectedProjectId = null;
  state.drawerOpen = false;
  state.screen = "archive";
  showToast("Projekt wurde archiviert. Erinnerung kann gesetzt werden.");
}

function setArchiveReminder(projectId, value) {
  const project = state.data.archived.find((item) => item.id === projectId);
  if (!project) return;
  project.reminderAt = value;
  saveData();
  render();
}

function addProject(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const id = `project-${Date.now()}`;
  const project = {
    id,
    name: String(form.get("name") || "Neues Projekt"),
    owner: String(form.get("owner") || "Business Development"),
    field: String(form.get("field") || "Neues Handlungsfeld"),
    stage: "stage-0",
    status: "needs_evidence",
    progress: 0,
    nextDecision: "Stage 0 starten",
    priority: 52,
    createdByUser: true,
    summary: String(form.get("summary") || "Neues Business-Development-Vorhaben."),
    evidence: [
      { id: "idea", label: "Ideensteckbrief angelegt", required: true, done: false },
      { id: "fit", label: "EGLV-Handlungsfeld zugeordnet", required: true, done: false },
      { id: "owner", label: "Owner benannt", required: true, done: false }
    ],
    stage3Evidence: [],
    decisions: [],
    reminders: []
  };
  state.data.projects.unshift(project);
  saveData();
  state.modal = null;
  state.screen = "kanban";
  openProject(id);
  showToast("Neues Projekt wurde angelegt und in Stage 0 einsortiert.");
}

function addRule(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const label = String(form.get("rule") || "").trim();
  if (!label) return;
  state.data.rules.push({ id: `rule-${Date.now()}`, label, scope: "global" });
  saveData();
  event.currentTarget.reset();
  showToast("Neue Prozessregel wurde gespeichert.");
}

function submitLead(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const email = String(form.get("email") || "").trim();
  const consent = form.get("consent") === "on";
  if (!email || !email.includes("@") || !consent) {
    showToast("Bitte E-Mail-Adresse und DSGVO-Zustimmung angeben.");
    return;
  }
  const selectedProject = getProject();
  const lead = {
    id: `lead-${Date.now()}`,
    email,
    consentGiven: true,
    createdAt: new Date().toISOString(),
    notifyTo: leadRecipient,
    source: "qr_demo",
    lastScreen: state.screen,
    viewedProject: selectedProject?.name || "kein Projekt ausgewaehlt",
    latestDecisionPath: selectedProject?.decisions?.at(-1)?.decision || "keine Entscheidung",
    projectCount: state.data.projects.length,
    unlockedUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  };
  const leads = JSON.parse(localStorage.getItem(LEADS_KEY) || "[]");
  leads.push(lead);
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  localStorage.setItem(UNLOCK_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
  state.modal = null;
  showToast(`Demo fuer 24 Stunden freigeschaltet. Lead-Benachrichtigung an ${leadRecipient} vorbereitet.`);
}

function render() {
  const root = document.querySelector("#app");
  root.innerHTML = state.screen === "login" || state.screen === "mfa" ? renderAuth() : renderApp();
  bindEvents();
}

function renderAuth() {
  const mfa = state.screen === "mfa";
  return `
    <main class="login-shell">
      <section class="login-story">
        <div class="brand-mark"><span class="river-mark"></span><span>eGLV Business Development</span></div>
        <div>
          <span class="eyebrow">Management Demo</span>
          <h1>Stage-Gate Entscheidungen in einem gefuehrten System.</h1>
          <p>Vom Projektstatus bis zur Gate-Entscheidung: Diese Demo zeigt, wie Business Development, Management und Agentenlogik in einer Microsoft-faehigen Infrastruktur zusammenarbeiten.</p>
        </div>
        <p class="meta">Prototyp: Vercel. Zielarchitektur: Azure Static Web Apps, Entra ID, SharePoint, Teams, Power BI und kontrollierte Agenten-Workflows.</p>
      </section>
      <section class="login-panel">
        <div class="login-box">
          <span class="eyebrow">${mfa ? "Zweiter Faktor" : "Demo-Zugang"}</span>
          <h2>${mfa ? "MFA visuell bestaetigen" : "Einloggen"}</h2>
          <p class="meta">${mfa ? "Die Zwei-Faktor-Authentifizierung wird fuer den Prototyp simuliert." : "Der Management-Zugang ist fuer die Demo vorbereitet."}</p>
          ${
            mfa
              ? `<div class="security-line"><strong>Authentifizierung bereit.</strong><br />Zugang fuer ${demoLoginEmail}. MFA-Status: wartet auf Bestaetigung.</div>
                 <button class="primary-btn" data-action="mfa">MFA bestätigen und Dashboard öffnen</button>`
              : `<form data-form="login">
                   <div class="field">
                     <label for="email">E-Mail</label>
                     <input id="email" name="email" value="${demoLoginEmail}" readonly />
                   </div>
                   <button class="primary-btn" type="submit">Demo-Zugang starten</button>
                 </form>
                 <div class="security-line">Hinweis: In der Zielarchitektur laeuft dieser Einstieg ueber Microsoft Entra ID mit echter Multi-Faktor-Authentifizierung.</div>`
          }
        </div>
      </section>
    </main>
  `;
}

function renderApp() {
  return `
    <div class="app-shell">
      ${renderSidebar()}
      <main class="main">
        ${renderTopbar()}
        ${renderScreen()}
      </main>
      ${state.drawerOpen ? renderDrawer() : ""}
      ${state.modal ? renderModal() : ""}
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
    </div>
  `;
}

function renderSidebar() {
  const items = [
    ["dashboard", "Dashboard"],
    ["kanban", "Kanban"],
    ["stage3", "Stage 3"],
    ["archive", "Archiv"],
    ["settings", "Einstellungen"]
  ];
  return `
    <aside class="sidebar">
      <div class="brand-mark"><span class="river-mark"></span><span>eGLV BD Agent</span></div>
      <nav class="nav">
        ${items.map(([id, label]) => `<button class="${state.screen === id ? "active" : ""}" data-screen="${id}">${label}</button>`).join("")}
      </nav>
      <div class="side-note">
        Demo-Login: ${demoLoginEmail}<br />
        MFA: visuell bestaetigt<br />
        Lead-Ziel: ${leadRecipient}
      </div>
    </aside>
  `;
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="page-title">
        <span class="eyebrow">Management-Fokus</span>
        <h1>${screenTitle()}</h1>
        <p>${screenSubtitle()}</p>
      </div>
      <div class="button-row">
        <span class="badge green">MFA bestätigt</span>
        <button class="quiet-btn" data-action="new-project">Neues Projekt</button>
        <button class="quiet-btn" data-action="reset">Demo zurücksetzen</button>
      </div>
    </header>
  `;
}

function screenTitle() {
  return {
    dashboard: "Business Development Dashboard",
    kanban: "Stage-Gate Kanban",
    gate: "Gate-2 Entscheidung",
    stage3: "Stage 3 Pilotierung",
    archive: "Archiv und Erinnerung",
    settings: "Einstellungen und Infrastruktur"
  }[state.screen] || "Business Development Demo";
}

function screenSubtitle() {
  return {
    dashboard: "Priorisierte Entscheidungen, Risiken und Agentenhinweise fuer Management und Business Development.",
    kanban: "Alle Projekte entlang des eGLV Stage-Gate-Prozesses mit Prozentanzeige der Pflichtinformationen.",
    gate: "Investition, Rechtsform und Pilotpfad fuer Pflanzenkohle entscheiden.",
    stage3: "Nach dem Go: Reallabor, Pilotnachweise und Fortschritt fuer die naechste Entscheidung.",
    archive: "Gescheiterte oder gestoppte Projekte bleiben nachvollziehbar und koennen erinnert werden.",
    settings: "Admin-Regeln, Stage-Gate-Prozess und Microsoft-Architekturfit."
  }[state.screen] || "";
}

function renderScreen() {
  if (state.screen === "dashboard") return renderDashboard();
  if (state.screen === "kanban") return renderKanban();
  if (state.screen === "gate") return renderGate();
  if (state.screen === "stage3") return renderStage3();
  if (state.screen === "archive") return renderArchive();
  if (state.screen === "settings") return renderSettings();
  return renderDashboard();
}

function renderDashboard() {
  const projects = state.data.projects.slice().sort((a, b) => b.priority - a.priority);
  const gateOpen = projects.filter((project) => project.stage.startsWith("gate")).length;
  return `
    <section class="kpi-grid">
      ${renderKpi(projects.length, "aktive Projekte")}
      ${renderKpi(gateOpen, "Gate-Entscheidungen offen")}
      ${renderKpi(state.data.archived.length, "Projekte im Archiv")}
      ${renderKpi("18h", "geschaetzte Agentenzeit gespart")}
    </section>
    <section class="two-col">
      <div class="panel">
        <div class="section-heading">
          <h2>Priorisierte Projekte</h2>
          <p>Der Agent sortiert nach Entscheidungsnaehe, Risiko und Management-Relevanz.</p>
        </div>
        <div class="project-list">
          ${projects.map(renderProjectRow).join("")}
        </div>
      </div>
      <div>
        <div class="panel agent-panel">
          <span class="eyebrow">Agentenbriefing</span>
          <p><strong>Pflanzenkohle zuerst bearbeiten.</strong> Gate 2 ist vollstaendig vorbereitet. Management kann heute ueber Go in Stage 3 entscheiden.</p>
          <div class="agent-actions">
            <button data-action="agent-accept">Übernehmen</button>
            <button data-action="agent-edit">Bearbeiten</button>
            <button data-action="agent-reject">Ablehnen</button>
          </div>
        </div>
        <div class="panel">
          <span class="eyebrow">QR-Code Ziel</span>
          <p class="meta">Stabile Vercel-URL fuer die Demo. Spaeter kann eine eigene Domain oder ein Redirect vorgeschaltet werden.</p>
        </div>
        <div class="panel">
          <span class="eyebrow">Demo Script</span>
          <ol class="demo-steps">
            <li>Kanban oeffnen und Pflanzenkohle bei Gate 2 zeigen.</li>
            <li>Projekt-Drawer oeffnen und naechste Schritte erklaeren.</li>
            <li>Gate 2 mit Go entscheiden und Stage 3 starten.</li>
            <li>Stage-3-Nachweise und Prozentfortschritt zeigen.</li>
            <li>Gate 3 scheitern lassen, archivieren und Erinnerung setzen.</li>
            <li>Einstellungen mit Microsoft-Fit und Prozessregeln zeigen.</li>
          </ol>
        </div>
      </div>
    </section>
  `;
}

function renderKpi(value, label) {
  return `<div class="kpi"><div class="value">${value}</div><div class="label">${label}</div></div>`;
}

function renderProjectRow(project) {
  const stage = getStage(project.stage);
  return `
    <article class="project-row">
      <div>
        <h3>${project.name}</h3>
        <div class="badge-row">
          <span class="badge blue">${stage?.title || "Stage"}</span>
          <span class="badge ${project.progress === 100 ? "green" : "warning"}">${project.progress}% Pflichtinformationen</span>
          <span class="badge">${project.nextDecision}</span>
        </div>
        <p class="meta">${project.summary}</p>
      </div>
      <button class="primary-btn" data-open-project="${project.id}">Öffnen</button>
    </article>
  `;
}

function renderKanban() {
  return `
    <section class="kanban">
      ${stageDefinitions.map((stage) => renderStageColumn(stage)).join("")}
    </section>
  `;
}

function renderStageColumn(stage) {
  const projects = stage.id === "archive"
    ? state.data.archived
    : state.data.projects.filter((project) => project.stage === stage.id);
  return `
    <section class="stage-column">
      <header class="stage-head">
        <button class="stage-menu" data-screen="settings">Menu</button>
        <h2>${stage.title}: ${stage.subtitle}</h2>
        <p>${stage.description}</p>
        <span class="badge">${projects.length} Projekt${projects.length === 1 ? "" : "e"}</span>
      </header>
      <div class="card-stack">
        ${projects.length ? projects.map((project) => renderProjectCard(project, stage.id === "archive")).join("") : `<div class="empty">Keine Projekte in diesem Abschnitt.</div>`}
      </div>
    </section>
  `;
}

function renderProjectCard(project, archived = false) {
  return `
    <button class="project-card" ${archived ? `data-screen="archive"` : `data-open-project="${project.id}"`}>
      <h3>${project.name}</h3>
      <div class="meta">${project.owner} · ${project.field}</div>
      ${renderProgress(project.progress)}
      <div class="badge-row">
        <span class="badge ${project.progress === 100 ? "green" : "warning"}">${project.progress === 100 ? "Gate-ready" : "Nachweise offen"}</span>
        <span class="badge">${project.nextDecision || project.archiveReason || "Review"}</span>
      </div>
    </button>
  `;
}

function renderProgress(progress) {
  const color = progressColor(progress);
  return `
    <div class="progress-wrap">
      <div class="progress-label"><span>Pflichtinformationen</span><span>${progress}%</span></div>
      <div class="progress-track"><div class="progress-fill ${color}" style="width: ${progress}%"></div></div>
    </div>
  `;
}

function renderDrawer() {
  const project = getProject();
  if (!project) return "";
  const stage = getStage(project.stage);
  const missing = project.evidence.filter((item) => item.required && !item.done);
  return `
    <div class="drawer-backdrop" data-action="close-drawer"></div>
    <aside class="drawer">
      <header class="drawer-head">
        <div>
          <span class="eyebrow">${stage?.title || "Projekt"} · ${stage?.subtitle || ""}</span>
          <h2>${project.name}</h2>
          <p class="meta">${project.summary}</p>
        </div>
        <button class="close-btn" data-action="close-drawer">X</button>
      </header>
      ${renderProgress(project.progress)}
      <div class="panel agent-panel">
        <span class="eyebrow">Prozessassistent</span>
        <p><strong>Nächster Schritt:</strong> ${project.stage === "gate-2" ? "Gate-2-Entscheidung im Management vorbereiten." : "Pflichtnachweise vervollstaendigen."}</p>
        <div class="button-row">
          <button class="secondary-btn" data-action="agent-accept">Übernehmen</button>
          <button class="quiet-btn" data-action="agent-edit">Bearbeiten</button>
          <button class="quiet-btn" data-action="agent-reject">Ablehnen</button>
        </div>
      </div>
      <div class="panel">
        <h3>Pflichtnachweise</h3>
        <div class="checklist">
          ${project.evidence.map((item) => `
            <div class="check-item">
              <input type="checkbox" ${item.done ? "checked" : ""} disabled />
              <div><strong>${item.label}</strong><br /><span class="meta">${item.done ? "erfuellt" : "offen"}</span></div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="button-row">
        ${project.stage === "gate-2" ? `<button class="primary-btn" data-open-gate="${project.id}">Zur Gate-2-Entscheidung</button>` : ""}
        <button class="quiet-btn" data-action="agent-collect">Agent beauftragen</button>
      </div>
      ${missing.length ? `<p class="meta">${missing.length} Pflichtnachweise fehlen. Abschluss bleibt blockiert.</p>` : `<p class="meta">Alle Pflichtnachweise sind vollstaendig. Managemententscheidung moeglich.</p>`}
    </aside>
  `;
}

function renderGate() {
  const project = getProject() || state.data.projects.find((item) => item.id === "pyrolysis");
  state.selectedProjectId = project?.id;
  if (!project) return `<div class="empty">Projekt wurde bereits archiviert.</div>`;
  return `
    <section class="gate-layout">
      <div class="panel">
        <span class="eyebrow">Gate 2 · Invest + Rechtsform</span>
        <h2>${project.name}</h2>
        <p class="meta">Entscheidung ueber Pilotbudget, Betreiberstruktur und Ueberfuehrung in Stage 3.</p>
        ${renderProgress(project.progress)}
        <div>
          ${[
            ["Business Case", "Varianten liegen vergleichbar vor, Bandbreiten statt Scheingenauigkeit."],
            ["Rechtsform", "Betreiberstruktur und Pilotpfad sind fuer Stage 3 vorbereitet."],
            ["Foerderpotenzial", "Foerderfenster wird weiter beobachtet und im Pilot konkretisiert."],
            ["Public Value", "Klimaschutz, Reststoffnutzung und regionale Wirkung passen zum Verbandsauftrag."]
          ].map(([title, copy]) => `
            <div class="criterion">
              <div><strong>${title}</strong><br /><span class="meta">${copy}</span></div>
              <span class="badge green">erfuellt</span>
            </div>
          `).join("")}
        </div>
      </div>
      <aside>
        <div class="panel agent-panel">
          <span class="eyebrow">BD-Experte der eGLV</span>
          <p><strong>Empfehlung: Go.</strong> Die Pflichtinformationen sind vollstaendig. Der Pilotpfad ist belastbar genug, um Stage 3 als Reallabor zu starten.</p>
        </div>
        <div class="panel">
          <h3>Managemententscheidung</h3>
          <div class="decision-grid">
            ${["go", "stop", "hold", "pivot"].map((decision) => `
              <button class="${state.selectedDecision === decision ? "selected" : ""}" data-decision="${decision}">${decision.toUpperCase()}<br /><span class="meta">${decisionText(decision)}</span></button>
            `).join("")}
          </div>
          <div class="field">
            <label>Kommentar</label>
            <textarea>Freigabe fuer Stage 3, Pilotierung an EGLV-Anlage vorbereiten.</textarea>
          </div>
          <button class="primary-btn" data-action="decide-gate2">Entscheidung dokumentieren</button>
        </div>
      </aside>
    </section>
  `;
}

function decisionText(decision) {
  return {
    go: "weiter in Stage 3",
    stop: "beenden und archivieren",
    hold: "pausieren",
    pivot: "Scope anpassen"
  }[decision];
}

function renderStage3() {
  const selected = getProject();
  const project = selected?.stage === "stage-3" ? selected : state.data.projects.find((item) => item.stage === "stage-3");
  if (!project) {
    return `<div class="empty">Kein aktives Stage-3-Projekt. Fuehre Pflanzenkohle in Gate 2 mit Go weiter oder setze die Demo zurueck.</div>`;
  }
  state.selectedProjectId = project.id;
  return `
    <section class="two-col">
      <div class="panel">
        <span class="eyebrow">Stage 3 · Pilotierung / Reallabor</span>
        <h2>${project.name}</h2>
        <p class="meta">Hier wird sichtbar, welche Nachweise fuer Pilotierung, Reallabor und spaetere Gate-3-Entscheidung fehlen.</p>
        ${renderProgress(project.progress)}
        <div class="checklist">
          ${project.stage3Evidence.map((item) => `
            <label class="check-item">
              <input type="checkbox" ${item.done ? "checked" : ""} data-stage3-evidence="${item.id}" />
              <div><strong>${item.label}</strong><br /><span class="meta">${item.done ? "erfuellt" : "offen"}</span></div>
            </label>
          `).join("")}
        </div>
      </div>
      <div>
        <div class="panel agent-panel">
          <span class="eyebrow">BD-Experte</span>
          <p><strong>Fokus fuer Stage 3:</strong> Standort, Lead-User, EHS-Risiken und Pilotbudget priorisieren. Ohne Betriebsreife sollte Gate 3 nicht freigegeben werden.</p>
        </div>
        <div class="panel">
          <h3>Demo: Gate 3 scheitert</h3>
          <p class="meta">Fuer das Video wird gezeigt, dass ein Projekt kontrolliert scheitern darf und Wissen trotzdem erhalten bleibt.</p>
          <button class="danger-btn" data-action="fail-gate3">Stop in Gate 3 simulieren</button>
        </div>
      </div>
    </section>
  `;
}

function renderArchive() {
  const archived = state.data.archived;
  return `
    <section class="panel">
      <div class="section-heading">
        <h2>Archivierte Projekte</h2>
        <p>Gestoppte Projekte bleiben nachvollziehbar und koennen mit Erinnerung spaeter erneut betrachtet werden.</p>
      </div>
      <div class="project-list">
        ${archived.length ? archived.map((project) => `
          <article class="archive-row">
            <div>
              <h3>${project.name}</h3>
              <p class="meta">${project.archiveReason}<br />Archiviert am ${new Date(project.archivedAt).toLocaleString("de-DE")}</p>
              <div class="field">
                <label>Erinnerung setzen</label>
                <input type="date" value="${project.reminderAt || ""}" data-reminder="${project.id}" />
              </div>
            </div>
            <span class="badge danger">archiviert</span>
          </article>
        `).join("") : `<div class="empty">Noch keine archivierten Projekte. In Stage 3 kann Gate 3 fuer die Demo scheitern.</div>`}
      </div>
    </section>
  `;
}

function renderSettings() {
  return `
    <section class="settings-grid">
      <div>
        <div class="panel">
          <span class="eyebrow">Admin-Prozesseditor</span>
          <h2>Stages, Gates und Regeln</h2>
          <p class="meta">Admins koennen Regeln hinzufuegen. Alle anderen Nutzer folgen dem definierten Prozess.</p>
          <div class="card-stack">
            ${stageDefinitions.filter((stage) => stage.id !== "archive").map((stage) => `
              <div class="integration-row">
                <div><strong>${stage.title}: ${stage.subtitle}</strong><br /><span class="meta">${stage.description}</span></div>
                <span class="badge blue">Drag</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <h3>Neue Regel hinzufuegen</h3>
          <form data-form="rule">
            <div class="field">
              <label>Regel</label>
              <input name="rule" placeholder="z. B. Projektkosten duerfen nicht groesser als 250.000 Euro sein" />
            </div>
            <button class="primary-btn" type="submit">Regel speichern</button>
          </form>
          <div class="card-stack">
            ${state.data.rules.map((rule) => `<div class="integration-row"><div>${rule.label}</div><span class="badge green">${rule.scope}</span></div>`).join("")}
          </div>
        </div>
      </div>
      <div class="panel">
        <span class="eyebrow">APIs und Infrastruktur</span>
        <h2>Microsoft-Fit</h2>
        <p class="meta">Alle Bausteine werden fuer die Demo als vorhandene Infrastrukturannahme dargestellt.</p>
        <div class="architecture-map">
          ${microsoftIntegrations.map(([name, description]) => `
            <div class="integration-row">
              <div><strong>${name}</strong><br /><span class="meta">${description}</span></div>
              <span class="badge green">vorhanden</span>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderModal() {
  if (state.modal === "lead") {
    return `
      <div class="modal-backdrop">
        <section class="modal blocking">
          <div class="modal-head">
            <div>
              <span class="eyebrow">Demo freischalten</span>
              <h2>Software weiter ausprobieren</h2>
              <p class="meta">Damit die Demo nicht unbegrenzt frei nutzbar ist, bitten wir nach 30 Sekunden um eine E-Mail-Adresse. Die Freischaltung gilt 24 Stunden.</p>
            </div>
            <button class="close-btn">X</button>
          </div>
          <form data-form="lead">
            <div class="field">
              <label>E-Mail-Adresse</label>
              <input name="email" type="email" placeholder="name@unternehmen.de" required />
            </div>
            <label class="consent">
              <input name="consent" type="checkbox" />
              <span>Ich bin damit einverstanden, dass meine E-Mail-Adresse zur Kontaktaufnahme zur Demo gespeichert wird. Eine Benachrichtigung geht an ${leadRecipient}.</span>
            </label>
            <button class="primary-btn" type="submit">Demo fuer 24 Stunden freischalten</button>
          </form>
        </section>
      </div>
    `;
  }
  if (state.modal === "project") {
    return `
      <div class="modal-backdrop">
        <section class="modal">
          <div class="modal-head">
            <div>
              <span class="eyebrow">Neues Projekt</span>
              <h2>Business-Development-Vorhaben anlegen</h2>
            </div>
            <button class="close-btn" data-action="close-modal">X</button>
          </div>
          <form data-form="project">
            <div class="field"><label>Projektname</label><input name="name" required placeholder="z. B. Digitale Gewaesserzwillinge" /></div>
            <div class="field"><label>Owner</label><input name="owner" value="Business Development" /></div>
            <div class="field"><label>Handlungsfeld</label><input name="field" placeholder="z. B. Digitalisierung und Betrieb" /></div>
            <div class="field"><label>Kurzbeschreibung</label><textarea name="summary" placeholder="Worum geht es fachlich?"></textarea></div>
            <button class="primary-btn" type="submit">Projekt in Stage 0 anlegen</button>
          </form>
        </section>
      </div>
    `;
  }
  return "";
}

function bindEvents() {
  document.querySelectorAll("[data-screen]").forEach((button) => {
    button.addEventListener("click", () => setScreen(button.dataset.screen));
  });
  document.querySelector("[data-form='login']")?.addEventListener("submit", handleLogin);
  document.querySelector("[data-action='mfa']")?.addEventListener("click", handleMfa);
  document.querySelector("[data-action='reset']")?.addEventListener("click", resetDemo);
  document.querySelector("[data-action='new-project']")?.addEventListener("click", () => {
    state.modal = "project";
    render();
  });
  document.querySelector("[data-action='close-modal']")?.addEventListener("click", () => {
    state.modal = null;
    render();
  });
  document.querySelectorAll("[data-open-project]").forEach((button) => {
    button.addEventListener("click", () => openProject(button.dataset.openProject));
  });
  document.querySelectorAll("[data-open-gate]").forEach((button) => {
    button.addEventListener("click", () => openGate(button.dataset.openGate));
  });
  document.querySelectorAll("[data-action='close-drawer']").forEach((button) => button.addEventListener("click", () => {
    state.drawerOpen = false;
    render();
  }));
  document.querySelectorAll("[data-decision]").forEach((button) => {
    button.addEventListener("click", () => selectDecision(button.dataset.decision));
  });
  document.querySelector("[data-action='decide-gate2']")?.addEventListener("click", decideGate2);
  document.querySelectorAll("[data-stage3-evidence]").forEach((input) => {
    input.addEventListener("change", () => toggleStage3Evidence(input.dataset.stage3Evidence));
  });
  document.querySelector("[data-action='fail-gate3']")?.addEventListener("click", failGate3);
  document.querySelectorAll("[data-reminder]").forEach((input) => {
    input.addEventListener("change", () => setArchiveReminder(input.dataset.reminder, input.value));
  });
  document.querySelector("[data-form='lead']")?.addEventListener("submit", submitLead);
  document.querySelector("[data-form='project']")?.addEventListener("submit", addProject);
  document.querySelector("[data-form='rule']")?.addEventListener("submit", addRule);
  document.querySelectorAll("[data-action^='agent']").forEach((button) => {
    button.addEventListener("click", () => showToast("Agentenaktion wurde fuer die Demo kontrolliert vorgemerkt."));
  });
}

render();

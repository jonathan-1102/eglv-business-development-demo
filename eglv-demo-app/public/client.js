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

const screenFlow = [
  { id: "briefing", label: "Briefing", screen: "dashboard" },
  { id: "portfolio", label: "Kanban", screen: "kanban" },
  { id: "gate2", label: "Gate 2", screen: "gate" },
  { id: "stage3", label: "Stage 3", screen: "stage3" },
  { id: "archive", label: "Archiv", screen: "archive" },
  { id: "settings", label: "Architektur", screen: "settings" }
];

const stageCriteriaSummary = {
  "stage-0": { ko: 2, soft: 3, hint: "Ideenfit" },
  "stage-1": { ko: 2, soft: 4, hint: "Stakeholder" },
  "gate-1": { ko: 3, soft: 2, hint: "Strategic Fit" },
  "stage-2": { ko: 3, soft: 4, hint: "Business Case" },
  "gate-2": { ko: 4, soft: 2, hint: "Invest" },
  "stage-3": { ko: 3, soft: 4, hint: "Pilot" },
  "gate-3": { ko: 4, soft: 2, hint: "Skalierung" },
  "stage-4": { ko: 2, soft: 3, hint: "Markt" }
};

const usageTrend = [
  { month: "Jan", users: 12, projects: 2 },
  { month: "Feb", users: 18, projects: 3 },
  { month: "Mrz", users: 26, projects: 5 },
  { month: "Apr", users: 38, projects: 7 },
  { month: "Mai", users: 54, projects: 10 },
  { month: "Jun", users: 71, projects: 14 }
];

const stageDurationTrend = {
  all: [18, 21, 24, 22, 19, 17],
  "stage-0": [7, 8, 9, 8, 7, 6],
  "stage-1": [13, 14, 15, 14, 12, 11],
  "gate-1": [4, 5, 5, 4, 4, 3],
  "stage-2": [24, 27, 31, 29, 25, 22],
  "gate-2": [8, 9, 10, 9, 8, 7],
  "stage-3": [36, 39, 42, 40, 35, 31],
  "gate-3": [11, 12, 13, 12, 11, 9],
  "stage-4": [21, 22, 20, 19, 18, 16]
};

const completedCostBuckets = [
  { bucket: "<100k", count: 4, volume: 260 },
  { bucket: "100-250k", count: 7, volume: 1210 },
  { bucket: "250-500k", count: 3, volume: 1040 },
  { bucket: ">500k", count: 1, volume: 680 }
];

const apiContracts = [
  ["GET", "/api/projects", "Portfolio, Kanban und Projekt-Drawer laden", "Azure Data Store"],
  ["POST", "/api/projects", "Neue BD-Vorhaben strukturiert anlegen", "Azure Functions"],
  ["POST", "/api/decisions", "Gate-Entscheidungen revisionsfaehig speichern", "SharePoint / Audit Log"],
  ["POST", "/api/agent-tasks", "Kontrollierte Agentenaufgaben fuer Nachweise starten", "Azure AI + Graph"],
  ["POST", "/api/leads", "QR-Demo-Leads mit DSGVO-Zustimmung erfassen", "Graph Mail / Outlook"],
  ["GET", "/api/process-definition", "Stage-Gate-Definition und Regeln laden", "Azure Data Store"]
];

const agentApiCalls = [
  ["GET", "/api/portfolio/briefing", "Management-Briefing priorisieren", "Portfolio lesen, Gate-Reife bewerten, Top-Projekte sortieren"],
  ["GET", "/api/projects/{projectId}", "Projektkontext laden", "Status, Stage, Nachweise, Entscheidungen und Regeln verstehen"],
  ["GET", "/api/projects/{projectId}/evidence", "Pflichtnachweise pruefen", "Fehlende Informationen, Owner, Quellen und Fristen erkennen"],
  ["POST", "/api/agent-tasks", "Agentenarbeit starten", "Fehlende Nachweise in kontrollierte Aufgaben umwandeln"],
  ["PATCH", "/api/agent-tasks/{taskId}", "Agentenaufgabe aktualisieren", "Status, Quelle, Ergebnis und Rueckfrage dokumentieren"],
  ["POST", "/api/recommendations", "Entscheidungsempfehlung erzeugen", "Go, Stop, Hold oder Pivot mit Begruendung vorschlagen"],
  ["POST", "/api/decisions", "Managemententscheidung protokollieren", "Entscheidung, Kommentar, Entscheiderrolle und Konsequenz speichern"],
  ["PATCH", "/api/projects/{projectId}/stage", "Stage-Uebergang ausfuehren", "Projekt nach Go in die naechste Stage ueberfuehren"],
  ["POST", "/api/projects/{projectId}/archive", "Projekt kontrolliert archivieren", "Stop-Entscheidung, Lernwert und Reminder sichern"],
  ["PATCH", "/api/archive/{projectId}/reminder", "Wiedervorlage setzen", "Erinnerungsdatum und Follow-up-Kontext speichern"],
  ["GET", "/api/process-definition", "Stage-Gate-Regeln lesen", "Pflichtnachweise, Gates, Rollen und Admin-Regeln anwenden"],
  ["POST", "/api/process-definition/rules", "Admin-Regel anlegen", "Neue Pflichtregel versioniert in den Prozess aufnehmen"],
  ["POST", "/api/leads", "QR-Demo Lead erfassen", "E-Mail, Consent und Demo-Kontext fuer Kontaktaufnahme speichern"],
  ["POST", "/api/notifications", "Teams/Outlook Hinweis senden", "Entscheidung, Reminder oder fehlenden Nachweis an Verantwortliche schicken"],
  ["GET", "/api/audit-events", "Audit Trail lesen", "Nachvollziehbarkeit fuer Management und Compliance herstellen"]
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
      risk: "mittel",
      budget: "220.000 EUR",
      dueDate: "2026-06-18",
      impact: "CO2-Bindung, Reststoffnutzung und regionale Klimawirkung",
      createdByUser: false,
      summary: "Reststoffe durch Pyrolyse nutzbar machen, CO2 binden und einen skalierbaren Pilotpfad pruefen.",
      evidence: [
        { id: "bc", label: "Business-Case-Varianten vergleichbar", required: true, done: true, owner: "BD Team", source: "Business-Case Canvas", dueDate: "2026-06-05", status: "erfuellt" },
        { id: "legal", label: "Rechtsform-Indikator vorbereitet", required: true, done: true, owner: "Recht / Strategie", source: "Rechtsform-Check", dueDate: "2026-06-06", status: "erfuellt" },
        { id: "funding", label: "Foerderpotenzial eingeordnet", required: true, done: true, owner: "Foerdermittelkoordination", source: "Foerderfenster-Screening", dueDate: "2026-06-07", status: "erfuellt" },
        { id: "stakeholder", label: "Stakeholder-Commitment dokumentiert", required: true, done: true, owner: "Business Development", source: "Stakeholder-Protokoll", dueDate: "2026-06-10", status: "erfuellt" }
      ],
      stage3Evidence: [
        { id: "pilot-site", label: "Reallabor-Standort an EGLV-Anlage bestaetigen", required: true, done: false, owner: "Betrieb", source: "Anlagensteckbrief", dueDate: "2026-06-21", status: "offen" },
        { id: "lead-user", label: "Lead-User und Feedbackschleifen definieren", required: true, done: false, owner: "BD Team", source: "Pilot-Interviewplan", dueDate: "2026-06-24", status: "offen" },
        { id: "safety", label: "EHS- und Genehmigungsrisiken pruefen", required: true, done: false, owner: "EHS / Genehmigung", source: "Risikocheck", dueDate: "2026-06-28", status: "offen" },
        { id: "pilot-budget", label: "Pilotbudget finalisieren", required: true, done: false, owner: "Controlling", source: "Budgetfreigabe", dueDate: "2026-06-30", status: "offen" }
      ],
      agentTasks: [],
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
      risk: "hoch",
      budget: "120.000 EUR",
      dueDate: "2026-06-24",
      impact: "Resilienz fuer Kommunen und schnellere Lageeinschaetzung",
      createdByUser: false,
      summary: "Datenbasierte Fruehwarnung fuer kommunale Starkregenereignisse.",
      evidence: [
        { id: "need", label: "Kommunaler Bedarf validiert", required: true, done: true, owner: "Kommunalmanagement", source: "Bedarfsinterviews", dueDate: "2026-06-12", status: "erfuellt" },
        { id: "data", label: "Datenverfuegbarkeit geklaert", required: true, done: false, owner: "Datenmanagement", source: "Dateninventar", dueDate: "2026-06-20", status: "offen" },
        { id: "owner", label: "Interner Sponsor identifiziert", required: true, done: true, owner: "Fachbereich Betrieb", source: "Sponsor-Notiz", dueDate: "2026-06-14", status: "erfuellt" }
      ],
      stage3Evidence: [],
      agentTasks: [
        { id: "stormwater-data", label: "Datenquellen fuer Starkregenmodell klaeren", status: "in Bearbeitung", owner: "BD Agent" }
      ],
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
      risk: "mittel",
      budget: "180.000 EUR",
      dueDate: "2026-07-02",
      impact: "Kommunale Waermeversorgung und Energieeffizienz",
      createdByUser: false,
      summary: "Nutzung vorhandener Waermepotenziale fuer kommunale Partner.",
      evidence: [
        { id: "value", label: "Wertversprechen", required: true, done: true, owner: "Strategie", source: "Value Proposition", dueDate: "2026-06-16", status: "erfuellt" },
        { id: "cost", label: "Kostenbandbreite", required: true, done: false, owner: "Controlling", source: "Kostenkorridor", dueDate: "2026-06-29", status: "offen" },
        { id: "partner", label: "Partnerstruktur", required: true, done: true, owner: "Kooperationen", source: "Partner-Mapping", dueDate: "2026-06-18", status: "erfuellt" }
      ],
      stage3Evidence: [],
      agentTasks: [],
      decisions: [],
      reminders: []
    }
  ],
  rules: [
    { id: "cost-cap", label: "Projektkosten duerfen im Demo-Pilot nicht groesser als 250.000 Euro sein.", scope: "global", type: "threshold", appliesTo: "all-projects", active: true },
    { id: "evidence-lock", label: "Pflichtnachweise muessen vor Stage-Abschluss vollstaendig sein.", scope: "global", type: "gate-lock", appliesTo: "all-projects", active: true }
  ],
  archived: [],
  auditLog: [
    {
      id: "audit-seed",
      action: "Demo vorbereitet",
      project: "Pflanzenkohle / Pyrolyse",
      detail: "Projekt startet Gate-ready bei Gate 2.",
      createdAt: new Date().toISOString()
    }
  ],
  apiEvents: [
    {
      id: "api-seed",
      method: "GET",
      path: "/api/projects",
      entity: "Portfolio initial geladen",
      createdAt: new Date().toISOString()
    }
  ]
};

const state = {
  screen: "login",
  selectedProjectId: null,
  selectedDecision: "go",
  drawerOpen: false,
  modal: null,
  toast: "",
  agentDraft: null,
  analyticsStage: "all",
  selectedProcessGateId: null,
  processGateDecision: "continue",
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
    if (stored?.projects) return normalizeData(stored);
  } catch {
    const seeded = cloneSeedData();
    localStorage.setItem(DATA_KEY, JSON.stringify(seeded));
    return seeded;
  }
  const seeded = cloneSeedData();
  localStorage.setItem(DATA_KEY, JSON.stringify(seeded));
  return seeded;
}

function cloneSeedData() {
  return JSON.parse(JSON.stringify(seedData));
}

function normalizeEvidence(item = {}, index = 0, listName = "evidence") {
  const done = Boolean(item.done);
  return {
    id: item.id || `${listName}-${index + 1}`,
    label: item.label || `Nachweis ${index + 1}`,
    required: item.required !== false,
    done,
    owner: item.owner || "Business Development",
    source: item.source || "Noch nicht verknuepft",
    dueDate: item.dueDate || (done ? "erfuellt" : "offen"),
    status: item.status || (done ? "erfuellt" : "offen"),
    ruleId: item.ruleId || null
  };
}

function normalizeProject(project, seedProject = {}) {
  const evidenceSource = project.evidence || seedProject.evidence || [];
  const stage3Source = project.stage3Evidence || seedProject.stage3Evidence || [];
  return {
    ...seedProject,
    ...project,
    risk: project.risk || seedProject.risk || "mittel",
    budget: project.budget || seedProject.budget || "offen",
    dueDate: project.dueDate || seedProject.dueDate || "offen",
    impact: project.impact || seedProject.impact || "Public Value wird bewertet",
    evidence: evidenceSource.map((item, index) => normalizeEvidence(item, index, "evidence")),
    stage3Evidence: stage3Source.map((item, index) => normalizeEvidence(item, index, "stage3-evidence")),
    agentTasks: project.agentTasks || seedProject.agentTasks || [],
    departmentMessages: project.departmentMessages || [],
    changeHighlight: Boolean(project.changeHighlight || project.decisions?.length || project.agentTasks?.length || project.reminders?.length),
    decisions: project.decisions || [],
    reminders: project.reminders || []
  };
}

function normalizeRule(rule = {}) {
  const label = rule.label || "Neue Prozessregel";
  return {
    id: rule.id || `rule-${Date.now()}`,
    label,
    scope: rule.scope || "global",
    type: rule.type || "policy",
    appliesTo: rule.appliesTo || "all-projects",
    active: rule.active !== false,
    evidenceLabel: rule.evidenceLabel || (rule.type === "required-evidence" ? `Admin-Regel pruefen: ${label}` : "")
  };
}

function normalizeData(data) {
  const fallback = cloneSeedData();
  return {
    ...fallback,
    ...data,
    projects: (data.projects || fallback.projects).map((project) => {
      const seedProject = fallback.projects.find((item) => item.id === project.id);
      return normalizeProject(project, seedProject);
    }),
    archived: (data.archived || []).map((project) => normalizeProject(project)),
    rules: (data.rules?.length ? data.rules : fallback.rules).map(normalizeRule),
    auditLog: data.auditLog?.length ? data.auditLog : fallback.auditLog,
    apiEvents: data.apiEvents?.length ? data.apiEvents : fallback.apiEvents
  };
}

function saveData() {
  localStorage.setItem(DATA_KEY, JSON.stringify(state.data));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}

function getProject(id = state.selectedProjectId) {
  return state.data.projects.find((project) => project.id === id);
}

function getStage(id) {
  return stageDefinitions.find((stage) => stage.id === id);
}

function getFocusProject() {
  return getProject()
    || state.data.projects.find((project) => project.id === "pyrolysis")
    || state.data.projects[0]
    || state.data.archived.find((project) => project.id === "pyrolysis")
    || state.data.archived[0];
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

function markProjectChanged(project) {
  if (project) project.changeHighlight = true;
}

function ruleEvidenceFromRule(rule) {
  return normalizeEvidence({
    id: `rule-${rule.id}`,
    label: rule.evidenceLabel || `Admin-Regel pruefen: ${rule.label}`,
    required: true,
    done: false,
    owner: "Admin / BD Team",
    source: "Stage-Gate-Regelwerk",
    dueDate: "vor Stage-Abschluss",
    status: "offen",
    ruleId: rule.id
  });
}

function activeRequiredRuleEvidence() {
  return state.data.rules
    .filter((rule) => rule.active && (rule.type === "required-evidence" || rule.type === "ko-criterion"))
    .map(ruleEvidenceFromRule);
}

function buildInitialEvidence() {
  return [
    normalizeEvidence({ id: "idea", label: "Ideensteckbrief angelegt", required: true, done: false, owner: "Business Development", source: "Projektanlage", dueDate: "vor Stage-Abschluss", status: "offen" }),
    normalizeEvidence({ id: "fit", label: "EGLV-Handlungsfeld zugeordnet", required: true, done: false, owner: "Strategie", source: "Portfolio-Kriterien", dueDate: "vor Stage-Abschluss", status: "offen" }),
    normalizeEvidence({ id: "owner", label: "Owner benannt", required: true, done: false, owner: "Management", source: "Projektsteckbrief", dueDate: "vor Stage-Abschluss", status: "offen" }),
    ...activeRequiredRuleEvidence()
  ];
}

function recordAudit(action, project, detail) {
  state.data.auditLog.unshift({
    id: `audit-${Date.now()}`,
    action,
    project,
    detail,
    createdAt: new Date().toISOString()
  });
  state.data.auditLog = state.data.auditLog.slice(0, 8);
}

function recordApiEvent(method, path, entity) {
  state.data.apiEvents.unshift({
    id: `api-${Date.now()}`,
    method,
    path,
    entity,
    createdAt: new Date().toISOString()
  });
  state.data.apiEvents = state.data.apiEvents.slice(0, 8);
}

function getDemoStepIndex() {
  const archivedPyrolysis = state.data.archived.some((project) => project.id === "pyrolysis");
  const pyrolysis = state.data.projects.find((project) => project.id === "pyrolysis");
  if (state.screen === "settings") return 5;
  if (archivedPyrolysis || state.screen === "archive") return 4;
  if (pyrolysis?.stage === "stage-3" || state.screen === "stage3") return 3;
  if (state.screen === "gate") return 2;
  if (state.screen === "kanban") return 1;
  return 0;
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

function nextStageAfterGate(gateId) {
  return {
    "gate-1": "stage-2",
    "gate-2": "stage-3",
    "gate-3": "stage-4"
  }[gateId] || "stage-0";
}

function openProcessStage(stageId) {
  state.modal = null;
  setScreen("kanban");
  window.setTimeout(() => focusStage(stageId), 50);
}

function openProcessGate(gateId) {
  state.selectedProcessGateId = gateId;
  state.processGateDecision = "continue";
  state.modal = "process-gate";
  render();
}

function selectProcessGateDecision(decision) {
  state.processGateDecision = decision;
  render();
}

function submitProcessGateDecision(event) {
  event.preventDefault();
  const project = getFocusProject();
  const gate = getStage(state.selectedProcessGateId);
  if (!project || !gate) return;
  const form = new FormData(event.currentTarget);
  const rationale = String(form.get("rationale") || "").trim() || "Managemententscheidung wurde im Gate dokumentiert.";
  const decision = state.processGateDecision;
  project.decisions.push({
    gate: gate.title,
    decision,
    decidedAt: new Date().toISOString(),
    rationale,
    comment: rationale,
    decidedBy: "Management",
    consequence: processGateDecisionText(decision)
  });
  markProjectChanged(project);
  recordAudit(`${gate.title} entschieden`, project.name, `${processGateDecisionText(decision)}: ${rationale}`);
  recordApiEvent("POST", "/api/decisions", `${project.name}: ${gate.title} ${decision}`);
  if (decision === "continue" && project.stage === gate.id) {
    project.stage = nextStageAfterGate(gate.id);
    project.status = "in_progress";
    updateProjectProgress(project);
    state.screen = project.stage === "stage-3" ? "stage3" : "kanban";
  }
  if (decision === "hold") project.status = "on_hold";
  if (decision === "decline") {
    saveData();
    archiveProject(project, `${gate.title}: abgelehnt`);
    return;
  }
  saveData();
  state.modal = null;
  showToast(`${gate.title}: ${processGateDecisionText(decision)} wurde gespeichert.`);
  render();
}

function processGateDecisionText(decision) {
  return {
    continue: "Weiter in die naechste Stage",
    hold: "Projekt auf Halt setzen",
    decline: "Projekt ablehnen"
  }[decision] || "Entscheidung dokumentieren";
}

function decideGate2() {
  const project = getProject();
  if (!project || project.progress < 100) {
    showToast("Gate 2 ist blockiert, weil Pflichtnachweise fehlen.");
    return;
  }
  const comment = document.querySelector("[data-gate-comment]")?.value.trim() || "Freigabe fuer Stage 3, Pilotierung an EGLV-Anlage vorbereiten.";
  project.decisions.push({
    gate: "Gate 2",
    decision: state.selectedDecision,
    decidedAt: new Date().toISOString(),
    rationale: "Business Case, Rechtsform und Foerderpotenzial sind fuer den Pilotpfad ausreichend belastbar.",
    comment,
    decidedBy: "Management",
    consequence: decisionText(state.selectedDecision)
  });
  markProjectChanged(project);
  recordAudit("Gate 2 entschieden", project.name, `Managemententscheidung: ${state.selectedDecision.toUpperCase()}. Kommentar: ${comment}`);
  recordApiEvent("POST", "/api/decisions", `${project.name}: Gate 2 ${state.selectedDecision.toUpperCase()}`);
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
  if (item) {
    item.done = !item.done;
    item.status = item.done ? "erfuellt" : "offen";
  }
  markProjectChanged(project);
  updateProjectProgress(project);
  recordAudit("Nachweis aktualisiert", project.name, `${item?.label || "Nachweis"}: ${item?.done ? "erfuellt" : "offen"}.`);
  recordApiEvent("PATCH", `/api/projects/${project.id}/evidence/${id}`, item?.done ? "Nachweis erfuellt" : "Nachweis offen");
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
    rationale: "Skalierbarkeit und Betriebsreife sind fuer einen Roll-out noch nicht ausreichend nachgewiesen.",
    comment: "Demo-Stop: Projekt soll als Lernfall archiviert und spaeter erinnert werden.",
    decidedBy: "Management",
    consequence: "beenden und archivieren"
  });
  markProjectChanged(project);
  recordApiEvent("POST", "/api/decisions", `${project.name}: Gate 3 STOP`);
  archiveProject(project, "Stop in Gate 3: Skalierung nicht freigegeben");
}

function archiveProject(project, reason) {
  recordAudit("Projekt archiviert", project.name, reason);
  recordApiEvent("POST", `/api/projects/${project.id}/archive`, reason);
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
  markProjectChanged(project);
  recordAudit("Erinnerung gesetzt", project.name, value || "Keine Erinnerung");
  recordApiEvent("PATCH", `/api/archive/${projectId}/reminder`, value || "leer");
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
    risk: String(form.get("risk") || "mittel"),
    budget: String(form.get("budget") || "offen"),
    dueDate: String(form.get("dueDate") || "offen"),
    impact: String(form.get("impact") || "Public Value wird bewertet"),
    createdByUser: true,
    summary: String(form.get("summary") || "Neues Business-Development-Vorhaben."),
    evidence: buildInitialEvidence(),
    stage3Evidence: [],
    agentTasks: [],
    departmentMessages: [],
    changeHighlight: true,
    decisions: [],
    reminders: []
  };
  state.data.projects.unshift(project);
  recordAudit("Projekt angelegt", project.name, "Neues Vorhaben wurde in Stage 0 eingeordnet.");
  recordApiEvent("POST", "/api/projects", project.name);
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
  const ruleType = String(form.get("ruleType") || "ko-criterion");
  if (!label) return;
  state.data.rules.push(normalizeRule({
    id: `rule-${Date.now()}`,
    label,
    scope: "global",
    type: ruleType,
    appliesTo: ruleType === "soft-criterion" ? "decision-guidance" : "new-projects",
    active: true,
    evidenceLabel: ruleType === "soft-criterion" ? "" : `KO-Kriterium pruefen: ${label}`
  }));
  recordAudit("Regel ergaenzt", "Stage-Gate-Prozess", label);
  recordApiEvent("POST", "/api/process-definition/rules", label);
  saveData();
  event.currentTarget.reset();
  showToast("Neue Prozessregel wurde gespeichert.");
}

function assignAgentCollection() {
  const project = getProject();
  if (!project) return;
  const list = project.stage === "stage-3" ? project.stage3Evidence : project.evidence;
  const missing = list.filter((item) => item.required && !item.done);
  if (!missing.length) {
    showToast("Alle Pflichtnachweise sind vorhanden. Der Agent empfiehlt die naechste Gate-Entscheidung.");
    return;
  }
  const createdAt = new Date().toISOString();
  const tasks = missing.map((item, index) => ({
    id: `task-${Date.now()}-${index}`,
    label: `Nachweis beschaffen: ${item.label}`,
    status: index === 0 ? "in Bearbeitung" : "geplant",
    owner: "BD Agent",
    createdAt
  }));
  project.agentTasks = [...tasks, ...(project.agentTasks || [])].slice(0, 6);
  project.status = "agent_working";
  markProjectChanged(project);
  recordAudit("Agentenauftrag gestartet", project.name, `${missing.length} Pflichtnachweise in kontrollierte Aufgaben ueberfuehrt.`);
  recordApiEvent("POST", "/api/agent-tasks", `${project.name}: ${missing.length} Aufgaben`);
  saveData();
  showToast("Agentenauftrag wurde erstellt und im Projekt protokolliert.");
}

function handleAgentAction(action) {
  const project = getProject() || state.data.projects.find((item) => item.id === "pyrolysis") || state.data.projects[0];
  const label = {
    accept: "Empfehlung uebernommen",
    edit: "Empfehlung zur Bearbeitung markiert",
    reject: "Empfehlung abgelehnt"
  }[action] || "Agentenaktion";
  if (project) {
    markProjectChanged(project);
    recordAudit(label, project.name, "Agentenhinweis wurde durch Management bewertet.");
    recordApiEvent("POST", "/api/agent-feedback", `${project.name}: ${action}`);
    saveData();
  }
  if (action === "accept" && project?.id) {
    openProject(project.id);
    return;
  }
  showToast(`${label}.`);
}

function businessCaseNameFromDescription(description) {
  const firstLine = description.split(/[.\n]/).find((part) => part.trim()) || "Neuer Business Case";
  return firstLine.trim().slice(0, 54) || "Neuer Business Case";
}

function structureBusinessCase(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const description = String(form.get("businessCase") || "").trim();
  if (description.length < 12) {
    showToast("Bitte den Business Case etwas konkreter beschreiben.");
    return;
  }
  const name = businessCaseNameFromDescription(description);
  state.agentDraft = {
    name,
    owner: "Business Development",
    field: description.toLowerCase().includes("daten") || description.toLowerCase().includes("ki")
      ? "Digitalisierung und Betrieb"
      : "Business Development",
    summary: description,
    impact: "Nutzenwirkung, Stakeholder und Wirtschaftlichkeit werden in Stage 0 geprueft.",
    risk: "mittel",
    budget: "offen",
    dueDate: "offen",
    questions: [
      "Welches EGLV-Handlungsfeld ist hauptsaechlich betroffen?",
      "Welche Fachabteilung muss den Bedarf fachlich bestaetigen?",
      "Welches KO-Kriterium kann den Business Case stoppen?",
      "Welche Softkriterien sollen dem Management als Hinweis angezeigt werden?",
      "Welche Daten, Kosten oder Stakeholder-Informationen fehlen fuer Stage 0?"
    ]
  };
  recordApiEvent("POST", "/api/recommendations", `Business Case strukturiert: ${name}`);
  showToast("Business Case wurde strukturiert. Offene Fragen sind gesammelt.");
  render();
}

function addAgentBusinessCaseToStage0() {
  const draft = state.agentDraft;
  if (!draft) return;
  const id = `agent-case-${Date.now()}`;
  const project = {
    id,
    name: draft.name,
    owner: draft.owner,
    field: draft.field,
    stage: "stage-0",
    status: "needs_evidence",
    progress: 0,
    nextDecision: "Stage 0 klaeren",
    priority: 58,
    risk: draft.risk,
    budget: draft.budget,
    dueDate: draft.dueDate,
    impact: draft.impact,
    createdByUser: true,
    summary: draft.summary,
    evidence: [
      ...buildInitialEvidence(),
      ...draft.questions.map((question, index) => normalizeEvidence({
        id: `agent-question-${index + 1}`,
        label: question,
        required: index < 3,
        done: false,
        owner: index === 1 ? "Fachabteilung" : "Business Development",
        source: "Agenten-Dialog",
        dueDate: "Stage 0",
        status: "offen"
      }, index, "agent-question"))
    ],
    stage3Evidence: [],
    agentTasks: [{
      id: `task-${Date.now()}`,
      label: "Business-Case-Fragen mit Fachabteilungen klaeren",
      status: "geplant",
      owner: "BD Agent",
      createdAt: new Date().toISOString()
    }],
    departmentMessages: [],
    changeHighlight: true,
    decisions: [],
    reminders: []
  };
  state.data.projects.unshift(project);
  recordAudit("Business Case angelegt", project.name, "Agentenentwurf wurde in Stage 0 uebernommen.");
  recordApiEvent("POST", "/api/projects", `${project.name}: aus Agentenchat`);
  saveData();
  state.agentDraft = null;
  state.modal = null;
  state.screen = "kanban";
  openProject(id);
  showToast("Business Case wurde in Stage 0 angelegt.");
}

function sendDepartmentMessage(event) {
  event.preventDefault();
  const project = getFocusProject();
  if (!project) return;
  const form = new FormData(event.currentTarget);
  const department = String(form.get("department") || "Business Development");
  const message = String(form.get("message") || "").trim();
  if (!message) {
    showToast("Bitte eine kurze Nachricht an die Abteilung eingeben.");
    return;
  }
  const item = {
    id: `message-${Date.now()}`,
    department,
    message,
    createdAt: new Date().toISOString(),
    status: "gesendet"
  };
  project.departmentMessages = [item, ...(project.departmentMessages || [])].slice(0, 6);
  markProjectChanged(project);
  recordAudit("Abteilung informiert", project.name, `${department}: ${message}`);
  recordApiEvent("POST", "/api/notifications", `${project.name}: ${department}`);
  saveData();
  event.currentTarget.reset();
  showToast(`Nachricht an ${department} wurde protokolliert.`);
  render();
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
  recordAudit("Lead erfasst", "QR-Demo", `Kontakt fuer ${email} vorbereitet.`);
  recordApiEvent("POST", "/api/leads", `Lead an ${leadRecipient}`);
  saveData();
  state.modal = null;
  showToast(`Zugang fuer 24 Stunden freigeschaltet. Kontaktaufnahme an ${leadRecipient} vorbereitet.`);
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
        <div class="brand-mark"><span class="river-mark"></span><span>EGLV Business Development</span></div>
        <div>
          <span class="eyebrow">Management Workspace</span>
          <h1>Stage-Gate Entscheidungen in einem gefuehrten System.</h1>
          <p>Vom Projektstatus bis zur Gate-Entscheidung: Business Development, Management und Agentenlogik arbeiten in einer Microsoft-faehigen Infrastruktur zusammen.</p>
        </div>
        <p class="meta">Zielarchitektur: Azure Static Web Apps, Entra ID, SharePoint, Teams, Power BI und kontrollierte Agenten-Workflows.</p>
      </section>
      <section class="login-panel">
        <div class="login-box">
          <span class="eyebrow">${mfa ? "Zweiter Faktor" : "Zugang"}</span>
          <h2>${mfa ? "MFA bestaetigen" : "Einloggen"}</h2>
          <p class="meta">${mfa ? "Die Zwei-Faktor-Authentifizierung sichert den Management-Zugang." : "Der Management-Zugang ist vorbereitet."}</p>
          ${
            mfa
              ? `<div class="security-line"><strong>Authentifizierung bereit.</strong><br />Zugang fuer ${demoLoginEmail}. MFA-Status: wartet auf Bestaetigung.</div>
                 <button class="primary-btn" data-action="mfa">MFA bestätigen und Dashboard öffnen</button>`
              : `<form data-form="login">
                   <div class="field">
                     <label for="email">E-Mail</label>
                     <input id="email" name="email" value="${demoLoginEmail}" readonly />
                   </div>
                   <button class="primary-btn" type="submit">Zugang starten</button>
                 </form>
                 <div class="security-line">Zielarchitektur: Einstieg ueber Microsoft Entra ID mit Multi-Faktor-Authentifizierung.</div>`
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
        ${state.screen === "settings" ? "" : renderProcessRail()}
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
    ["stage3", "To-dos"],
    ["archive", "Archiv"],
    ["settings", "Einstellungen"]
  ];
  return `
    <aside class="sidebar">
      <div class="brand-mark"><span class="river-mark"></span><span>EGLV BD Agent</span></div>
      <nav class="nav">
        ${items.map(([id, label]) => `<button class="${state.screen === id ? "active" : ""}" data-screen="${id}">${label}</button>`).join("")}
      </nav>
      <div class="side-note">
        Angemeldet: ${demoLoginEmail}<br />
        MFA: bestaetigt<br />
        Kontakt: ${leadRecipient}
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
      <div class="topbar-actions" aria-label="Schnellaktionen">
        <span class="status-chip">MFA</span>
        <button class="toolbar-btn agent-toolbar-btn" data-action="agent-business-case">Agent</button>
        <button class="toolbar-btn icon-toolbar-btn" data-action="new-project" aria-label="Neues Projekt anlegen" title="Neues Projekt anlegen">+</button>
      </div>
    </header>
  `;
}

function renderProcessRail() {
  const focusProject = getFocusProject();
  const stagePackages = stageDefinitions.filter((stage) => stage.id !== "archive");
  const activePackageIndex = Math.max(0, stagePackages.findIndex((stage) => stage.id === focusProject?.stage));
  return `
    <section class="process-rail compact-process-rail" aria-label="Prozesspfad">
      <div>
        <span class="eyebrow">Prozesspfad</span>
        <strong>${escapeHtml(focusProject?.name || "Portfolio")}</strong>
        <span class="meta">Stages und Management-Gates</span>
      </div>
      <div class="screen-flow stage-package-flow compact-stage-flow">
        ${stagePackages.map((stage, index) => {
          const isGate = stage.id.startsWith("gate");
          const isDone = index < activePackageIndex;
          const isActive = index === activePackageIndex;
          const statusIcon = isDone ? "✓" : isActive ? "•" : "";
          return `
          <button class="stage-package compact-step ${isGate ? "gate-step" : "stage-step"} ${isActive ? "active" : ""} ${isDone ? "done" : ""}" ${isGate ? `data-process-gate="${stage.id}"` : `data-process-stage="${stage.id}"`} title="${escapeHtml(`${stage.title}: ${stage.subtitle}`)}">
            <span class="step-shape">${statusIcon || stageIndexLabel(stage)}</span>
            <strong>${escapeHtml(stageIndexLabel(stage))}</strong>
            <em>${isGate ? "Gate" : "Stage"}</em>
          </button>
        `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderProcessConfigRail() {
  const configurableStages = stageDefinitions.filter((stage) => stage.id !== "archive");
  return `
    <section class="process-rail process-config-rail" aria-label="Stage-Gate-Konfiguration">
      <div>
        <span class="eyebrow">Prozessdesign</span>
        <strong>Stages und Gates anpassen</strong>
        <span class="meta">KO-Kriterien, Softkriterien und Hinweise</span>
      </div>
      <div class="screen-flow criteria-flow">
        ${configurableStages.map((stage) => {
          const criteria = stageCriteriaSummary[stage.id] || { ko: 0, soft: 0, hint: "Review" };
          return `
            <button class="criteria-package" data-flow-screen="settings" title="${escapeHtml(`${stage.title}: ${stage.subtitle}`)}">
              <strong>${escapeHtml(stage.title)}</strong>
              <small>${escapeHtml(criteria.hint)}</small>
              <span class="criteria-row"><span>KO ${criteria.ko}</span><span>Soft ${criteria.soft}</span></span>
              <em>anpassen</em>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function screenTitle() {
  return {
    dashboard: "Business Development Dashboard",
    kanban: "Stage-Gate Kanban",
    gate: "Gate-2 Entscheidung",
    stage3: "To-dos und Änderungen",
    archive: "Archiv und Erinnerung",
    settings: "Einstellungen und Infrastruktur"
  }[state.screen] || "Business Development Demo";
}

function screenSubtitle() {
  return {
    dashboard: "Priorisierte Entscheidungen, Risiken und Agentenhinweise fuer Management und Business Development.",
    kanban: "Alle Projekte entlang des EGLV Stage-Gate-Prozesses mit Prozentanzeige der Pflichtinformationen.",
    gate: "Investition, Rechtsform und Pilotpfad fuer Pflanzenkohle entscheiden.",
    stage3: "Offene Aufgaben, Projektänderungen und Nachrichten an beteiligte Abteilungen.",
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

function renderTodayFocus(projects) {
  const project = projects.find((item) => item.stage?.startsWith("gate")) || projects[0];
  if (!project) return "";
  const stage = getStage(project.stage);
  return `
    <section class="today-focus">
      <div>
        <span class="eyebrow">Heute entscheiden</span>
        <h2>${escapeHtml(project.name)}</h2>
        <p>${escapeHtml(project.impact)}</p>
        ${renderProjectMeta(project)}
      </div>
      <div class="focus-action">
        <span class="badge ${project.progress === 100 ? "green" : "warning"}">${project.progress}% Pflichtinformationen</span>
        <strong>${escapeHtml(stage?.title || "Stage")} · ${escapeHtml(project.nextDecision || "Review")}</strong>
        <p class="meta">${project.progress === 100 ? "KI empfiehlt eine Managemententscheidung mit kurzer Begruendung." : "Agent soll offene Pflichtnachweise beschaffen, bevor das Gate entschieden wird."}</p>
        ${project.stage === "gate-2" ? `<button class="primary-btn" data-open-gate="${project.id}">Entscheidungsansicht oeffnen</button>` : `<button class="primary-btn" data-open-project="${project.id}">Projekt oeffnen</button>`}
      </div>
    </section>
  `;
}

function renderProjectMeta(project) {
  return `
    <div class="meta-grid">
      <span><strong>Risiko</strong>${escapeHtml(project.risk || "offen")}</span>
      <span><strong>Budget</strong>${escapeHtml(project.budget || "offen")}</span>
      <span><strong>Faelligkeit</strong>${escapeHtml(project.dueDate || "offen")}</span>
    </div>
  `;
}

function renderEvidenceCards(items, interactive = false) {
  if (!items.length) return `<div class="empty">Keine Nachweise fuer diesen Abschnitt definiert.</div>`;
  return `
    <div class="evidence-grid">
      ${items.map((item) => `
        <label class="evidence-card ${item.done ? "done" : ""}">
          <span class="evidence-check">
            <input type="checkbox" ${item.done ? "checked" : ""} ${interactive ? `data-stage3-evidence="${item.id}"` : "disabled"} />
          </span>
          <span>
            <strong>${escapeHtml(item.label)}</strong>
            <span class="evidence-meta">
              <span>Owner: ${escapeHtml(item.owner)}</span>
              <span>Quelle: ${escapeHtml(item.source)}</span>
              <span>Faelligkeit: ${escapeHtml(item.dueDate)}</span>
            </span>
          </span>
          <span class="badge ${item.done ? "green" : "warning"}">${escapeHtml(item.status || (item.done ? "erfuellt" : "offen"))}</span>
        </label>
      `).join("")}
    </div>
  `;
}

function renderDecisionHistory(project) {
  const decisions = project.decisions || [];
  if (!decisions.length) return `<div class="empty">Noch keine Managemententscheidung dokumentiert.</div>`;
  return `
    <div class="timeline">
      ${decisions.slice().reverse().map((decision) => `
        <div class="timeline-item">
          <strong>${escapeHtml(decision.gate)} · ${escapeHtml(decision.decision.toUpperCase())}</strong>
          <span>${escapeHtml(decision.decidedBy || "Management")} · ${new Date(decision.decidedAt).toLocaleString("de-DE")}</span>
          <p class="meta">${escapeHtml(decision.comment || decision.rationale || "")}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function lineChartPath(values, width = 320, height = 120) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const spread = Math.max(max - min, 1);
  return values.map((value, index) => {
    const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
    const y = height - ((value - min) / spread) * (height - 18) - 9;
    return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

function renderLineChart(values, labels, unit) {
  const path = lineChartPath(values);
  const latest = values.at(-1);
  return `
    <div class="line-chart" aria-label="Linienchart">
      <svg viewBox="0 0 320 120" role="img">
        <line x1="0" y1="108" x2="320" y2="108" class="chart-grid" />
        <line x1="0" y1="62" x2="320" y2="62" class="chart-grid" />
        <path d="${path}" class="chart-line" />
        ${values.map((value, index) => {
          const x = values.length === 1 ? 160 : (index / (values.length - 1)) * 320;
          const yPath = lineChartPath(values).match(/[-\d.]+ [-\d.]+/g)?.[index] || "0 0";
          const y = Number(yPath.split(" ")[1]);
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" class="chart-dot"><title>${labels[index]}: ${value} ${unit}</title></circle>`;
        }).join("")}
      </svg>
      <div class="chart-axis">${labels.map((label) => `<span>${escapeHtml(label)}</span>`).join("")}</div>
      <strong class="chart-latest">${latest} ${unit}</strong>
    </div>
  `;
}

function renderCostBars() {
  const max = Math.max(...completedCostBuckets.map((item) => item.count), 1);
  return `
    <div class="cost-bars">
      ${completedCostBuckets.map((item) => `
        <div class="cost-row">
          <span>${escapeHtml(item.bucket)}</span>
          <div class="cost-track"><div class="cost-fill" style="width: ${(item.count / max) * 100}%"></div></div>
          <strong>${item.count}</strong>
          <em>${item.volume}k EUR</em>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDashboardAnalytics() {
  const labels = usageTrend.map((item) => item.month);
  const usageValues = usageTrend.map((item) => item.users);
  const durationValues = stageDurationTrend[state.analyticsStage] || stageDurationTrend.all;
  const selectedStage = state.analyticsStage === "all" ? "Alle Stages" : getStage(state.analyticsStage)?.title || "Stage";
  return `
    <section class="analytics-grid">
      <div class="panel analytics-card">
        <div class="section-heading">
          <span class="eyebrow">Nutzung</span>
          <h2>App-Nutzung im Unternehmen</h2>
          <p>Aktive Nutzer pro Monat und steigende Portfolio-Abdeckung.</p>
        </div>
        ${renderLineChart(usageValues, labels, "Nutzer")}
      </div>
      <div class="panel analytics-card">
        <div class="section-heading analytics-heading">
          <div>
            <span class="eyebrow">Durchlaufzeit</span>
            <h2>Zeit je Stage</h2>
            <p>${escapeHtml(selectedStage)} · durchschnittliche Tage im Prozess.</p>
          </div>
          <select data-analytics-stage aria-label="Stage filtern">
            <option value="all" ${state.analyticsStage === "all" ? "selected" : ""}>Alle Stages</option>
            ${stageDefinitions.filter((stage) => stage.id !== "archive").map((stage) => `
              <option value="${stage.id}" ${state.analyticsStage === stage.id ? "selected" : ""}>${stage.title}</option>
            `).join("")}
          </select>
        </div>
        ${renderLineChart(durationValues, labels, "Tage")}
      </div>
      <div class="panel analytics-card cost-card">
        <div class="section-heading">
          <span class="eyebrow">Abschluss</span>
          <h2>Abgeschlossene Projekte nach Kosten</h2>
          <p>Projektgroesse nach Kostenklasse und abgeschlossenem Volumen.</p>
        </div>
        ${renderCostBars()}
      </div>
    </section>
  `;
}

function renderDashboard() {
  const projects = state.data.projects.slice().sort((a, b) => b.priority - a.priority);
  const gateOpen = projects.filter((project) => project.stage.startsWith("gate")).length;
  const agentTasks = projects.reduce((sum, project) => sum + (project.agentTasks?.length || 0), 0);
  const avgProgress = projects.length
    ? Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)
    : 0;
  return `
    ${renderTodayFocus(projects)}
    <section class="kpi-grid">
      ${renderKpi(projects.length, "aktive Projekte")}
      ${renderKpi(gateOpen, "Gate-Entscheidungen offen")}
      ${renderKpi(agentTasks, "aktive Agentenaufgaben")}
      ${renderKpi(`${avgProgress}%`, "Portfolio-Informationsgrad")}
    </section>
    ${renderDashboardAnalytics()}
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
            <button data-agent-action="accept">Übernehmen</button>
            <button data-agent-action="edit">Bearbeiten</button>
            <button data-agent-action="reject">Ablehnen</button>
          </div>
        </div>
        <div class="panel decision-brief">
          <span class="eyebrow">Entscheidung heute</span>
          <h3>Gate 2 fuer Pflanzenkohle</h3>
          <p class="meta">Empfehlung: Go in Stage 3. Begruendung: 100% Pflichtinformationen, klarer Public Value und pruefbarer Pilotpfad.</p>
          <button class="primary-btn" data-open-gate="pyrolysis">Entscheidungsansicht oeffnen</button>
        </div>
        ${renderAuditLog()}
      </div>
    </section>
  `;
}

function renderKpi(value, label) {
  return `<div class="kpi"><div class="value">${value}</div><div class="label">${label}</div></div>`;
}

function renderProjectRow(project) {
  const stage = getStage(project.stage);
  const taskCount = project.agentTasks?.length || 0;
  return `
    <article class="project-row">
      <div>
        <h3>${escapeHtml(project.name)}</h3>
        <div class="badge-row">
          <span class="badge blue">${stage?.title || "Stage"}</span>
          <span class="badge ${project.progress === 100 ? "green" : "warning"}">${project.progress}% Pflichtinformationen</span>
          ${taskCount ? `<span class="badge blue">${taskCount} Agentenaufgabe${taskCount === 1 ? "" : "n"}</span>` : ""}
          <span class="badge">${project.nextDecision}</span>
        </div>
        <p class="meta">${escapeHtml(project.summary)}</p>
        ${renderProjectMeta(project)}
      </div>
      <button class="primary-btn" data-open-project="${project.id}">Öffnen</button>
    </article>
  `;
}

function renderAuditLog() {
  const items = state.data.auditLog.slice(0, 4);
  return `
    <div class="panel audit-panel">
      <span class="eyebrow">Audit Trail</span>
      <div class="timeline">
        ${items.map((item) => `
          <div class="timeline-item">
            <strong>${escapeHtml(item.action)}</strong>
            <span>${escapeHtml(item.project)}</span>
            <p class="meta">${escapeHtml(item.detail)}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderKanban() {
  return `
    <section class="stage-index" aria-label="Stage-Gate-Index">
      ${stageDefinitions.map((stage) => `
        <button class="stage-index-item ${stage.id === "archive" ? "archive" : ""}" data-stage-index="${stage.id}" title="${escapeHtml(`${stage.title}: ${stage.subtitle}`)}">
          <span>${stageIndexLabel(stage)}</span>
        </button>
      `).join("")}
    </section>
    <section class="kanban">
      ${stageDefinitions.map((stage) => renderStageColumn(stage)).join("")}
    </section>
  `;
}

function stageIndexLabel(stage) {
  if (stage.id === "archive") return "A";
  const [, number] = stage.title.split(" ");
  return stage.title.startsWith("Gate") ? `G${number}` : `S${number}`;
}

function focusStage(stageId) {
  if (stageId === "archive") {
    setScreen("archive");
    return;
  }
  const column = document.querySelector(`[data-stage-column="${stageId}"]`);
  column?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
}

function renderStageColumn(stage) {
  const projects = stage.id === "archive"
    ? state.data.archived
    : state.data.projects.filter((project) => project.stage === stage.id);
  return `
    <section class="stage-column" data-stage-column="${stage.id}">
      <header class="stage-head">
        <button class="stage-menu" data-screen="settings" aria-label="Stage-Einstellungen öffnen">☰</button>
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
  const taskCount = project.agentTasks?.length || 0;
  const hasUpdates = Boolean(project.changeHighlight || taskCount || project.decisions?.length || project.departmentMessages?.length);
  return `
    <button class="project-card ${hasUpdates ? "has-updates" : ""}" ${archived ? `data-screen="archive"` : `data-open-project="${project.id}"`}>
      ${hasUpdates ? `<span class="update-marker">Update</span>` : ""}
      <h3>${escapeHtml(project.name)}</h3>
      <div class="meta">${escapeHtml(project.owner)} · ${escapeHtml(project.field)}</div>
      ${renderProjectMeta(project)}
      ${renderProgress(project.progress)}
      <div class="badge-row">
        <span class="badge ${project.progress === 100 ? "green" : "warning"}">${project.progress === 100 ? "Gate-ready" : "Nachweise offen"}</span>
        ${hasUpdates ? `<span class="badge blue">Änderung</span>` : ""}
        ${taskCount ? `<span class="badge blue">${taskCount} Agent Task${taskCount === 1 ? "" : "s"}</span>` : ""}
        <span class="badge">${escapeHtml(project.nextDecision || project.archiveReason || "Review")}</span>
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
  const evidenceList = project.stage === "stage-3" ? project.stage3Evidence : project.evidence;
  const missing = evidenceList.filter((item) => item.required && !item.done);
  const tasks = project.agentTasks || [];
  return `
    <div class="drawer-backdrop" data-action="close-drawer"></div>
    <aside class="drawer">
      <header class="drawer-head">
        <div>
          <span class="eyebrow">${stage?.title || "Projekt"} · ${stage?.subtitle || ""}</span>
          <h2>${escapeHtml(project.name)}</h2>
          <p class="meta">${escapeHtml(project.summary)}</p>
          ${renderProjectMeta(project)}
        </div>
        <button class="close-btn" data-action="close-drawer">X</button>
      </header>
      ${renderProgress(project.progress)}
      <div class="panel agent-panel">
        <span class="eyebrow">Prozessassistent</span>
        <p><strong>Nächster Schritt:</strong> ${project.stage === "gate-2" ? "Gate-2-Entscheidung im Management vorbereiten." : "Pflichtnachweise vervollstaendigen."}</p>
        <div class="button-row">
          <button class="secondary-btn" data-agent-action="accept">Übernehmen</button>
          <button class="quiet-btn" data-agent-action="edit">Bearbeiten</button>
          <button class="quiet-btn" data-agent-action="reject">Ablehnen</button>
        </div>
      </div>
      <div class="panel">
        <h3>Pflichtnachweise</h3>
        ${renderEvidenceCards(evidenceList)}
      </div>
      <div class="panel">
        <h3>Agentenaufgaben</h3>
        <div class="task-list">
          ${tasks.length ? tasks.map((task) => `
            <div class="task-row">
              <div><strong>${escapeHtml(task.label)}</strong><br /><span class="meta">${escapeHtml(task.owner)} · ${escapeHtml(task.status)}</span></div>
              <span class="badge blue">kontrolliert</span>
            </div>
          `).join("") : `<div class="empty">Noch keine Agentenaufgaben fuer dieses Projekt.</div>`}
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
        <h2>${escapeHtml(project.name)}</h2>
        <p class="meta">Entscheidung ueber Pilotbudget, Betreiberstruktur und Ueberfuehrung in Stage 3.</p>
        ${renderProjectMeta(project)}
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
          <span class="eyebrow">BD-Experte der EGLV</span>
          <p><strong>Empfehlung: Go.</strong> Die Pflichtinformationen sind vollstaendig. Der Pilotpfad ist belastbar genug, um Stage 3 als Reallabor zu starten.</p>
          <div class="api-note">Nach Dokumentation: <strong>POST /api/decisions</strong> und Audit Trail.</div>
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
            <textarea data-gate-comment>Freigabe fuer Stage 3, Pilotierung an EGLV-Anlage vorbereiten.</textarea>
          </div>
          <button class="primary-btn" data-action="decide-gate2">Entscheidung dokumentieren</button>
        </div>
        <div class="panel">
          <h3>Entscheidungshistorie</h3>
          ${renderDecisionHistory(project)}
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

function projectTodoItems(project) {
  const evidence = project.stage === "stage-3" ? project.stage3Evidence : project.evidence;
  const missingEvidence = evidence.filter((item) => item.required && !item.done).map((item) => ({
    id: `evidence-${item.id}`,
    evidenceId: item.id,
    label: item.label,
    meta: `${item.owner} · ${item.dueDate}`,
    status: item.status || "offen",
    source: item.source
  }));
  const agentTasks = (project.agentTasks || []).map((task) => ({
    id: task.id,
    label: task.label,
    meta: `${task.owner} · ${task.status}`,
    status: "Agent",
    source: "Agentenaufgabe"
  }));
  return [...missingEvidence, ...agentTasks];
}

function renderTodoList(project) {
  const items = projectTodoItems(project);
  if (!items.length) return `<div class="empty">Keine offenen To-dos. Das Projekt ist fuer die naechste Entscheidung vorbereitet.</div>`;
  return `
    <div class="todo-list">
      ${items.map((item) => `
        <article class="todo-item">
          ${project.stage === "stage-3" && item.evidenceId ? `<input type="checkbox" data-stage3-evidence="${item.evidenceId}" />` : `<span class="todo-dot"></span>`}
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <span class="meta">${escapeHtml(item.meta)}</span>
            <span class="meta">Quelle: ${escapeHtml(item.source)}</span>
          </div>
          <span class="badge ${item.status === "Agent" ? "blue" : "warning"}">${escapeHtml(item.status)}</span>
        </article>
      `).join("")}
    </div>
  `;
}

function renderProjectChangeFeed(project) {
  const changes = state.data.auditLog.filter((item) => item.project === project.name || item.project === "Stage-Gate-Prozess").slice(0, 5);
  if (!changes.length) return `<div class="empty">Noch keine Änderungen fuer dieses Projekt.</div>`;
  return `
    <div class="change-feed">
      ${changes.map((item) => `
        <article class="change-item">
          <strong>${escapeHtml(item.action)}</strong>
          <span class="meta">${escapeHtml(item.detail)}</span>
        </article>
      `).join("")}
    </div>
  `;
}

function renderDepartmentMessages(project) {
  const messages = project.departmentMessages || [];
  if (!messages.length) return `<div class="empty">Noch keine Abteilungsnachrichten gesendet.</div>`;
  return `
    <div class="message-list">
      ${messages.map((message) => `
        <article class="message-item">
          <strong>${escapeHtml(message.department)}</strong>
          <span class="meta">${escapeHtml(message.message)}</span>
          <span class="badge green">${escapeHtml(message.status)}</span>
        </article>
      `).join("")}
    </div>
  `;
}

function renderStage3() {
  const selected = getProject();
  const project = selected?.stage === "stage-3" ? selected : state.data.projects.find((item) => item.stage === "stage-3") || getFocusProject();
  if (!project) {
    return `<div class="empty">Noch kein aktives Projekt fuer To-dos und Änderungen.</div>`;
  }
  state.selectedProjectId = project.id;
  return `
    <section class="two-col">
      <div class="panel">
        <span class="eyebrow">Arbeitsliste</span>
        <h2>${escapeHtml(project.name)}</h2>
        <p class="meta">Offene To-dos, fehlende Pflichtnachweise und Agentenaufgaben fuer den naechsten Projektfortschritt.</p>
        ${renderProjectMeta(project)}
        ${renderProgress(project.progress)}
        ${renderTodoList(project)}
        <div class="todo-actions">
          <button class="secondary-btn" data-action="agent-collect">Agentenaufgaben fuer offene Punkte erstellen</button>
        </div>
      </div>
      <div>
        <div class="panel agent-panel">
          <span class="eyebrow">Änderungen</span>
          <h3>Projekt-Updates</h3>
          ${renderProjectChangeFeed(project)}
        </div>
        <div class="panel">
          <h3>Abteilung informieren</h3>
          <form data-form="department-message">
            <div class="field">
              <label>Abteilung</label>
              <select name="department">
                <option>Betrieb</option>
                <option>EHS / Genehmigung</option>
                <option>Controlling</option>
                <option>Strategie</option>
                <option>IT / Datenmanagement</option>
              </select>
            </div>
            <div class="field">
              <label>Nachricht</label>
              <textarea name="message" placeholder="Kurzes Update oder Bitte um Rueckmeldung"></textarea>
            </div>
            <button class="primary-btn" type="submit">Nachricht senden</button>
          </form>
          ${renderDepartmentMessages(project)}
        </div>
        <div class="panel">
          <h3>Gate-3-Pruefung</h3>
          <p class="meta">Wenn Skalierung und Betriebsreife nicht ausreichen, wird das Projekt kontrolliert archiviert.</p>
          <button class="danger-btn" data-action="fail-gate3">Stop in Gate 3 dokumentieren</button>
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
              <h3>${escapeHtml(project.name)}</h3>
              <p class="meta">${escapeHtml(project.archiveReason)}<br />Archiviert am ${new Date(project.archivedAt).toLocaleString("de-DE")}</p>
              <div class="field">
                <label>Erinnerung setzen</label>
                <input type="date" value="${project.reminderAt || ""}" data-reminder="${project.id}" />
              </div>
            </div>
            <span class="badge danger">archiviert</span>
          </article>
        `).join("") : `<div class="empty">Noch keine archivierten Projekte.</div>`}
      </div>
    </section>
  `;
}

function renderSettings() {
  return `
    <section class="admin-console panel">
      <div>
        <span class="eyebrow">Admin-Konsole</span>
        <h2>Enterprise-Einstellungen</h2>
        <p class="meta">Der Demo-Zugang ist als Admin freigeschaltet. Deshalb sind Rollen, Rechte, Prozessdefinition, API-Fit und Audit-Funktionen sichtbar.</p>
      </div>
      <div class="admin-tile-grid">
        <div class="admin-tile">
          <span class="admin-icon">A</span>
          <strong>Admin</strong>
          <small>Vollzugriff auf Prozess, Rollen und Regeln</small>
        </div>
        <div class="admin-tile">
          <span class="admin-icon">R</span>
          <strong>Rollen & Rechte</strong>
          <small>Management, BD-Team, Fachbereich und Gastzugang</small>
        </div>
        <div class="admin-tile">
          <span class="admin-icon">P</span>
          <strong>Prozess ändern</strong>
          <small>Stages, Gates, KO-Kriterien und Softkriterien versionieren</small>
        </div>
        <div class="admin-tile">
          <span class="admin-icon">L</span>
          <strong>Audit Log</strong>
          <small>Entscheidungen, API-Events und Regeländerungen nachvollziehen</small>
        </div>
      </div>
    </section>
    <section class="settings-grid">
      <div>
        <div class="panel">
          <span class="eyebrow">Admin-Prozesseditor</span>
          <h2>Stages, Gates und Regeln</h2>
          <p class="meta">Admins koennen Prozessdefinitionen veraendern. Management und Business Development folgen dem freigegebenen Stage-Gate-Modell.</p>
          <div class="card-stack">
            ${stageDefinitions.filter((stage) => stage.id !== "archive").map((stage) => `
              <div class="integration-row">
                <div>
                  <strong>${stage.title}: ${stage.subtitle}</strong><br />
                  <span class="meta">${stage.description}</span>
                </div>
                <div class="criteria-badges">
                  <span class="badge danger">KO ${stageCriteriaSummary[stage.id]?.ko || 0}</span>
                  <span class="badge blue">Soft ${stageCriteriaSummary[stage.id]?.soft || 0}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <span class="eyebrow">Rechteverwaltung</span>
          <h3>Rollenmodell</h3>
          <p class="meta">Admins sehen alle Konfigurationsoptionen. Andere Rollen folgen dem freigegebenen Prozess und koennen nur im erlaubten Umfang bearbeiten oder entscheiden.</p>
          <div class="role-matrix">
            ${[
              ["Admin", "Prozess ändern, Rollen verwalten, Regeln aktivieren"],
              ["Management", "Gate-Entscheidungen treffen und begruenden"],
              ["Business Development", "Informationen pflegen und Agentenaufgaben steuern"],
              ["Fachbereich", "Nachweise liefern und Kommentare beantworten"]
            ].map(([role, permissions]) => `
              <div class="role-row">
                <strong>${role}</strong>
                <span>${permissions}</span>
                <span class="badge green">aktiv</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <h3>Neue Regel hinzufuegen</h3>
          <form data-form="rule">
            <div class="field">
              <label>Regeltyp</label>
              <select name="ruleType">
                <option value="ko-criterion">KO-Kriterium</option>
                <option value="soft-criterion">Softkriterium / Hinweis</option>
              </select>
            </div>
            <div class="field">
              <label>Regel</label>
              <input name="rule" placeholder="z. B. Projektkosten duerfen nicht groesser als 250.000 Euro sein" />
            </div>
            <button class="primary-btn" type="submit">Regel speichern</button>
          </form>
          <div class="card-stack">
            ${state.data.rules.map((rule) => `
              <div class="integration-row">
                <div>
                  <strong>${escapeHtml(rule.label)}</strong><br />
                  <span class="meta">${escapeHtml(rule.type)} · ${escapeHtml(rule.appliesTo)}</span>
                </div>
                <span class="badge ${rule.active ? "green" : "warning"}">${escapeHtml(rule.scope)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
      <div>
        <div class="panel">
          <span class="eyebrow">APIs und Infrastruktur</span>
          <h2>Microsoft-Fit</h2>
          <p class="meta">Alle Bausteine passen in eine Microsoft-orientierte Zielarchitektur.</p>
          <div class="architecture-flow">
            <span>Entra ID</span>
            <span>Static Web App</span>
            <span>Functions API</span>
            <span>SharePoint + Power BI</span>
          </div>
          <div class="architecture-map">
            ${microsoftIntegrations.map(([name, description]) => `
              <div class="integration-row">
                <div><strong>${escapeHtml(name)}</strong><br /><span class="meta">${escapeHtml(description)}</span></div>
                <span class="badge green">vorhanden</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel api-contracts">
          <span class="eyebrow">API Blueprint</span>
          <h2>Backend-Schnittstellen</h2>
          <div class="api-table">
            ${apiContracts.map(([method, path, purpose, target]) => `
              <div class="api-row">
                <span class="method">${method}</span>
                <code>${path}</code>
                <span>${escapeHtml(purpose)}</span>
                <span class="badge blue">${escapeHtml(target)}</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel agent-api-panel">
          <span class="eyebrow">Agent API Matrix</span>
          <h2>Menschliche BD-Arbeit als API-Aktionen</h2>
          <p class="meta">Der Agent bekommt keine offene Freiheit, sondern arbeitet entlang dieser kontrollierten Calls: lesen, empfehlen, Aufgaben anlegen, Entscheidungen dokumentieren und erinnern.</p>
          <div class="api-table agent-api-table">
            ${agentApiCalls.map(([method, path, purpose, humanWork]) => `
              <div class="api-row agent-api-row">
                <span class="method">${method}</span>
                <code>${path}</code>
                <span>${escapeHtml(purpose)}</span>
                <span class="meta">${escapeHtml(humanWork)}</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <span class="eyebrow">Letzte API-Events</span>
          <div class="timeline">
            ${state.data.apiEvents.slice(0, 5).map((event) => `
              <div class="timeline-item">
                <strong>${escapeHtml(event.method)} ${escapeHtml(event.path)}</strong>
                <p class="meta">${escapeHtml(event.entity)} · ${new Date(event.createdAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            `).join("")}
          </div>
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
              <span class="eyebrow">Zugang freischalten</span>
              <h2>Software weiter ausprobieren</h2>
              <p class="meta">Fuer den weiteren Zugriff ist eine E-Mail-Adresse erforderlich. Die Freischaltung gilt 24 Stunden.</p>
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
              <span>Ich bin damit einverstanden, dass meine E-Mail-Adresse zur Kontaktaufnahme gespeichert wird. Eine Benachrichtigung geht an ${leadRecipient}.</span>
            </label>
            <button class="primary-btn" type="submit">Zugang fuer 24 Stunden freischalten</button>
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
            <div class="field"><label>Risiko</label><select name="risk"><option value="mittel">mittel</option><option value="hoch">hoch</option><option value="niedrig">niedrig</option></select></div>
            <div class="field"><label>Budgetrahmen</label><input name="budget" placeholder="z. B. 150.000 EUR" /></div>
            <div class="field"><label>Faelligkeit</label><input name="dueDate" type="date" /></div>
            <div class="field"><label>Public Value / Nutzenwirkung</label><textarea name="impact" placeholder="Welchen Nutzen erzeugt das Vorhaben fuer Verband, Kommunen oder Umwelt?"></textarea></div>
            <div class="field"><label>Kurzbeschreibung</label><textarea name="summary" placeholder="Worum geht es fachlich?"></textarea></div>
            <button class="primary-btn" type="submit">Projekt in Stage 0 anlegen</button>
          </form>
        </section>
      </div>
    `;
  }
  if (state.modal === "agent-business-case") {
    const draft = state.agentDraft;
    return `
      <div class="modal-backdrop">
        <section class="modal agent-chat-modal">
          <div class="modal-head">
            <div>
              <span class="eyebrow">BD Agent</span>
              <h2>Business Case im Dialog erstellen</h2>
              <p class="meta">Beschreibe die Idee. Der Agent strukturiert daraus einen Stage-0-Entwurf und sammelt offene Fragen.</p>
            </div>
            <button class="close-btn" data-action="close-modal">X</button>
          </div>
          <div class="agent-chat">
            <div class="chat-message agent-message">
              <strong>Agent</strong>
              <p>Welches Problem, welcher Nutzen und welche erste Annahme stehen hinter dem Business Case?</p>
            </div>
            <form data-form="agent-business-case">
              <div class="field">
                <label>Business Case beschreiben</label>
                <textarea name="businessCase" placeholder="z. B. Wir wollen Reststoffe aus Anlagen nutzen, CO2 binden und einen Pilotpfad mit Betrieb und Controlling pruefen.">${draft ? escapeHtml(draft.summary) : ""}</textarea>
              </div>
              <button class="secondary-btn" type="submit">Business Case strukturieren</button>
            </form>
            ${draft ? `
              <div class="agent-draft">
                <span class="eyebrow">Entwurf fuer Stage 0</span>
                <h3>${escapeHtml(draft.name)}</h3>
                <p class="meta">${escapeHtml(draft.summary)}</p>
                <div class="question-list">
                  ${draft.questions.map((question, index) => `
                    <div class="question-item">
                      <span>${index + 1}</span>
                      <strong>${escapeHtml(question)}</strong>
                    </div>
                  `).join("")}
                </div>
                <div class="button-row">
                  <button class="primary-btn" data-action="agent-add-stage0">In Stage 0 anlegen</button>
                  <button class="quiet-btn" data-action="agent-edit-draft">Weiter bearbeiten</button>
                </div>
              </div>
            ` : ""}
          </div>
        </section>
      </div>
    `;
  }
  if (state.modal === "process-gate") {
    const gate = getStage(state.selectedProcessGateId);
    const project = getFocusProject();
    const options = [
      ["continue", "Weiter", "Projekt erfuellt die Kriterien und geht in die naechste Stage."],
      ["hold", "Halt", "Projekt bleibt offen, weil Informationen oder Abstimmungen fehlen."],
      ["decline", "Ablehnen", "Projekt wird beendet, weil KO-Kriterien oder Nutzen nicht tragen."]
    ];
    return `
      <div class="modal-backdrop">
        <section class="modal gate-decision-modal">
          <div class="modal-head">
            <div>
              <span class="eyebrow">Management-Gate</span>
              <h2>${escapeHtml(gate?.title || "Gate")} entscheiden</h2>
              <p class="meta">${escapeHtml(project?.name || "Projekt")} · ${escapeHtml(gate?.subtitle || "Entscheidung")}</p>
            </div>
            <button class="close-btn" data-action="close-modal">X</button>
          </div>
          <form data-form="process-gate-decision">
            <div class="gate-choice-grid">
              ${options.map(([id, label, help]) => `
                <button type="button" class="${state.processGateDecision === id ? "selected" : ""}" data-process-decision="${id}">
                  <span>${escapeHtml(label)}</span>
                  <small>${escapeHtml(help)}</small>
                </button>
              `).join("")}
            </div>
            <div class="field">
              <label>Kurze Argumentation</label>
              <textarea name="rationale" placeholder="Warum geht das Projekt weiter, wird gehalten oder abgelehnt?"></textarea>
            </div>
            <button class="primary-btn" type="submit">Gate-Entscheidung speichern</button>
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
  document.querySelectorAll("[data-flow-screen]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.flowScreen === "gate") {
        openGate("pyrolysis");
        return;
      }
      setScreen(button.dataset.flowScreen);
    });
  });
  document.querySelectorAll("[data-process-stage]").forEach((button) => {
    button.addEventListener("click", () => openProcessStage(button.dataset.processStage));
  });
  document.querySelectorAll("[data-process-gate]").forEach((button) => {
    button.addEventListener("click", () => openProcessGate(button.dataset.processGate));
  });
  document.querySelectorAll("[data-process-decision]").forEach((button) => {
    button.addEventListener("click", () => selectProcessGateDecision(button.dataset.processDecision));
  });
  document.querySelector("[data-form='login']")?.addEventListener("submit", handleLogin);
  document.querySelector("[data-action='mfa']")?.addEventListener("click", handleMfa);
  document.querySelector("[data-action='new-project']")?.addEventListener("click", () => {
    state.modal = "project";
    render();
  });
  document.querySelector("[data-action='agent-business-case']")?.addEventListener("click", () => {
    state.modal = "agent-business-case";
    render();
  });
  document.querySelector("[data-action='close-modal']")?.addEventListener("click", () => {
    state.modal = null;
    render();
  });
  document.querySelector("[data-action='agent-add-stage0']")?.addEventListener("click", addAgentBusinessCaseToStage0);
  document.querySelector("[data-action='agent-edit-draft']")?.addEventListener("click", () => {
    showToast("Beschreibe den Business Case weiter im Textfeld und strukturiere erneut.");
  });
  document.querySelectorAll("[data-open-project]").forEach((button) => {
    button.addEventListener("click", () => openProject(button.dataset.openProject));
  });
  document.querySelectorAll("[data-open-gate]").forEach((button) => {
    button.addEventListener("click", () => openGate(button.dataset.openGate));
  });
  document.querySelectorAll("[data-stage-index]").forEach((button) => {
    button.addEventListener("click", () => {
      focusStage(button.dataset.stageIndex);
    });
  });
  document.querySelector("[data-analytics-stage]")?.addEventListener("change", (event) => {
    state.analyticsStage = event.currentTarget.value;
    render();
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
  document.querySelectorAll("[data-action='agent-collect']").forEach((button) => {
    button.addEventListener("click", assignAgentCollection);
  });
  document.querySelectorAll("[data-agent-action]").forEach((button) => {
    button.addEventListener("click", () => handleAgentAction(button.dataset.agentAction));
  });
  document.querySelector("[data-form='lead']")?.addEventListener("submit", submitLead);
  document.querySelector("[data-form='project']")?.addEventListener("submit", addProject);
  document.querySelector("[data-form='rule']")?.addEventListener("submit", addRule);
  document.querySelector("[data-form='department-message']")?.addEventListener("submit", sendDepartmentMessage);
  document.querySelector("[data-form='agent-business-case']")?.addEventListener("submit", structureBusinessCase);
  document.querySelector("[data-form='process-gate-decision']")?.addEventListener("submit", submitProcessGateDecision);
}

render();

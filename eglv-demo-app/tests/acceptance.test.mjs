import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const staticRoot = join(root, "public");

const files = {
  html: await readFile(join(staticRoot, "index.html"), "utf8"),
  app: await readFile(join(staticRoot, "client.js"), "utf8"),
  css: await readFile(join(staticRoot, "styles.css"), "utf8"),
  bg: await readFile(join(staticRoot, "eglv-life-bg.svg"), "utf8"),
  packageJson: await readFile(join(root, "package.json"), "utf8"),
  vercel: await readFile(join(root, "vercel.json"), "utf8"),
  readme: await readFile(join(root, "README.md"), "utf8"),
  agentApiDoc: await readFile(join(dirname(root), "eglv-app-development", "agent-api-calls.md"), "utf8")
};

const checks = [];

function check(name, condition, detail = "") {
  checks.push({ name, passed: Boolean(condition), detail });
}

function contains(file, text) {
  return files[file].includes(text);
}

function containsAll(file, values) {
  return values.every((value) => contains(file, value));
}

check("app files exist", ["index.html", "client.js", "styles.css"].every((file) => existsSync(join(staticRoot, file))) && existsSync(join(root, "scripts", "dev-server.mjs")) && existsSync(join(root, "vercel.json")));
check("index loads app assets", containsAll("html", ["./styles.css", "./client.js", "EGLV Business Development Demo"]));
check("npm test is wired", contains("packageJson", "\"test\": \"node tests/acceptance.test.mjs\""));
check("vercel static output is configured", containsAll("vercel", ["\"outputDirectory\": \"public\"", "\"buildCommand\": \"npm test\"", "\"source\": \"/(.*)\"", "\"destination\": \"/index.html\""]));
check("package does not expose browser app as node start", !contains("packageJson", "\"start\":"));

check("demo login is defined", containsAll("app", ["management@eglv-demo.de", "handleLogin", "handleMfa"]));
check("mfa is represented", containsAll("app", ["MFA bestaetigen", "Zwei-Faktor-Authentifizierung", "mfaVerified"]));
check("management dashboard exists", containsAll("app", ["Business Development Dashboard", "Management-Fokus", "Agentenbriefing"]));
check("branding uses uppercase EGLV and visual background", containsAll("app", ["EGLV Business Development", "EGLV BD Agent"]) && containsAll("css", ["eglv-life-bg.svg", ".river-mark::before", ".river-mark::after"]) && containsAll("bg", ["Abstract blue green water", "#003da5", "#00873e"]));
check("agent business case chat exists", containsAll("app", ["agent-business-case", "Business Case im Dialog erstellen", "Business Case strukturieren", "In Stage 0 anlegen", "structureBusinessCase", "addAgentBusinessCaseToStage0"]));
check("agent business case collects questions", containsAll("app", ["Welches EGLV-Handlungsfeld", "Welches KO-Kriterium", "Welche Softkriterien", "Agenten-Dialog", "/api/recommendations"]));
check("sidebar uses actionable todos navigation", containsAll("app", ["[\"stage3\", \"To-dos\"]", "To-dos und Änderungen", "Offene Aufgaben, Projektänderungen und Nachrichten"]));
check("dashboard has today management focus", containsAll("app", ["renderTodayFocus", "Heute entscheiden", "KI empfiehlt eine Managemententscheidung", "Entscheidungsansicht oeffnen"]));
check("topbar does not expose reset or delete controls", !contains("app", "data-action=\"reset\"") && !contains("app", "resetDemo") && !contains("app", "localStorage.removeItem"));
check("new project action is a compact plus button", containsAll("app", ["icon-toolbar-btn", "data-action=\"new-project\"", "aria-label=\"Neues Projekt anlegen\"", ">+</button>"]) && containsAll("css", [".icon-toolbar-btn", "place-items: center"]));
check("dashboard analytics charts exist", containsAll("app", ["renderDashboardAnalytics", "App-Nutzung im Unternehmen", "Zeit je Stage", "data-analytics-stage", "Abgeschlossene Projekte nach Kosten", "renderLineChart", "renderCostBars"]));
check("dashboard stage duration data exists", containsAll("app", ["usageTrend", "stageDurationTrend", "completedCostBuckets", "100-250k", "Tage", "Nutzer"]));
check("dashboard does not include presenter script copy", !contains("app", "Demo Script") && !contains("app", "Kanban oeffnen und Pflanzenkohle bei Gate 2 zeigen"));
check("process rail uses compact selectable stages and gates", containsAll("app", ["compact-process-rail", "compact-stage-flow", "compact-step", "data-process-stage", "data-process-gate", "stage-step", "gate-step", "openProcessStage", "openProcessGate"]));
check("gate decision modal has three management outcomes", containsAll("app", ["process-gate", "Weiter", "Halt", "Ablehnen", "Kurze Argumentation", "submitProcessGateDecision", "processGateDecisionText"]));
check("settings expose enterprise admin controls", containsAll("app", ["Admin-Konsole", "Enterprise-Einstellungen", "Rechteverwaltung", "Rollenmodell", "Admin", "Management", "Business Development", "Fachbereich", "Prozess ändern", "Audit Log"]));
check("settings skip the normal process rail", containsAll("app", ["state.screen === \"settings\" ? \"\" : renderProcessRail()"]));
check("kanban stage-gate overview exists", containsAll("app", ["Stage-Gate Kanban", "stageDefinitions", "renderKanban", "renderStageColumn"]));
check("kanban uses compact stage gate index", containsAll("app", ["stageIndexLabel", "data-stage-index", "Stage-Gate-Index", "G${number}", "S${number}", "focusStage"]));
check("pyrolysis seed project starts at gate 2", containsAll("app", ["Pflanzenkohle / Pyrolyse", "stage: \"gate-2\"", "progress: 100"]));
check("drawer guided process exists", containsAll("app", ["renderDrawer", "Nächster Schritt", "Zur Gate-2-Entscheidung"]));
check("drawer shows controlled agent task queue", containsAll("app", ["Agentenaufgaben", "assignAgentCollection", "/api/agent-tasks", "kontrolliert"]));
check("evidence cards show owner source and due date", containsAll("app", ["renderEvidenceCards", "Owner:", "Quelle:", "Faelligkeit:", "owner", "source", "dueDate"]));
check("gate 2 decision options exist", containsAll("app", ["Gate 2 · Invest + Rechtsform", "go", "stop", "hold", "pivot", "decideGate2"]));
check("gate decisions persist management comment", containsAll("app", ["data-gate-comment", "comment", "decidedBy", "Kommentar:", "renderDecisionHistory"]));
check("go transitions to stage 3", containsAll("app", ["project.stage = \"stage-3\"", "Projekt wurde in Stage 3 ueberfuehrt"]));
check("todo and changes workspace exists", containsAll("app", ["renderTodoList", "Projekt-Updates", "data-form=\"department-message\"", "Nachricht senden", "data-stage3-evidence"]));
check("department notifications are recorded", containsAll("app", ["sendDepartmentMessage", "/api/notifications", "Abteilung informiert", "departmentMessages"]));
check("kanban highlights changed projects", containsAll("app", ["has-updates", "update-marker", "Änderung", "changeHighlight"]));
check("gate 3 failure archives project", containsAll("app", ["failGate3", "Stop in Gate 3", "archiveProject"]));
check("archive reminder exists", containsAll("app", ["renderArchive", "Erinnerung setzen", "data-reminder"]));
check("new project creation exists", containsAll("app", ["Neues Projekt", "addProject", "Projekt in Stage 0 anlegen"]));
check("admin rules support ko and soft criteria", containsAll("app", ["ko-criterion", "soft-criterion", "KO-Kriterium", "Softkriterium / Hinweis", "ruleEvidenceFromRule", "buildInitialEvidence"]));
check("lead modal blocks after 30 seconds", containsAll("app", ["scheduleLeadGate", "30000", "Zugang fuer 24 Stunden freischalten", "submitLead"]));
check("lead capture persists useful lead info", containsAll("app", ["js090168@fh-muenster.de", "viewedProject", "latestDecisionPath", "projectCount", "unlockedUntil"]));
check("settings show microsoft architecture", containsAll("app", ["Microsoft-Fit", "Azure Static Web Apps", "Microsoft Entra ID", "SharePoint", "Power BI"]));
check("settings include api-based backend blueprint", containsAll("app", ["apiContracts", "/api/projects", "/api/decisions", "/api/process-definition", "Backend-Schnittstellen"]));
check("settings include agent api matrix", containsAll("app", ["agentApiCalls", "Agent API Matrix", "/api/portfolio/briefing", "/api/notifications", "/api/audit-events"]));
check("audit and api events are recorded", containsAll("app", ["recordAudit", "recordApiEvent", "Audit Trail", "Letzte API-Events"]));
check("agent actions are limited", containsAll("app", ["Übernehmen", "Bearbeiten", "Ablehnen"]));
check("dynamic user input is escaped before rendering", containsAll("app", ["escapeHtml", "&amp;", "&#39;"]));

check("responsive CSS exists", containsAll("css", ["@media (max-width: 980px)", "@media (max-width: 620px)"]));
check("no negative letter spacing", !files.css.match(/letter-spacing:\\s*-/));
check("cards have stable radius", contains("css", "border-radius: 8px"));
check("new management components are styled", containsAll("css", [".process-rail", ".compact-process-rail", ".compact-stage-flow", ".step-shape", ".gate-choice-grid", ".admin-console", ".admin-tile-grid", ".role-row", ".criteria-row", ".today-focus", ".analytics-grid", ".chart-line", ".cost-bars", ".stage-index", ".todo-item", ".has-updates", ".agent-chat-modal", ".agent-api-row"]));
check("reel/demo script documented", containsAll("readme", ["Demo-Flow", "Lead-Gate", "Entwicklungsorchestrierung"]));
check("agent api documentation exists", containsAll("agentApiDoc", ["# Agent API Calls", "/api/portfolio/briefing", "/api/recommendations", "/api/decisions", "/api/process-definition/rules", "Least-Privilege"]));

const failed = checks.filter((item) => !item.passed);

for (const item of checks) {
  const marker = item.passed ? "PASS" : "FAIL";
  console.log(`${marker} ${item.name}${item.detail ? ` - ${item.detail}` : ""}`);
}

if (failed.length) {
  console.error(`\n${failed.length} acceptance check(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${checks.length} acceptance checks passed.`);

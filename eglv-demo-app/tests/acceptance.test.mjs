import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const files = {
  html: await readFile(join(root, "index.html"), "utf8"),
  app: await readFile(join(root, "app.js"), "utf8"),
  css: await readFile(join(root, "styles.css"), "utf8"),
  packageJson: await readFile(join(root, "package.json"), "utf8"),
  vercel: await readFile(join(root, "vercel.json"), "utf8"),
  readme: await readFile(join(root, "README.md"), "utf8")
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

check("app files exist", ["index.html", "app.js", "styles.css", "server.mjs", "vercel.json"].every((file) => existsSync(join(root, file))));
check("index loads app assets", containsAll("html", ["./styles.css", "./app.js", "eGLV Business Development Demo"]));
check("npm test is wired", contains("packageJson", "\"test\": \"node tests/acceptance.test.mjs\""));
check("vercel static rewrite exists", containsAll("vercel", ["\"source\": \"/(.*)\"", "\"destination\": \"/index.html\""]));

check("demo login is defined", containsAll("app", ["management@eglv-demo.de", "handleLogin", "handleMfa"]));
check("visual mfa is represented", containsAll("app", ["MFA visuell bestaetigen", "Zwei-Faktor-Authentifizierung", "mfaVerified"]));
check("management dashboard exists", containsAll("app", ["Business Development Dashboard", "Management-Fokus", "Agentenbriefing"]));
check("dashboard includes presenter demo script", containsAll("app", ["Demo Script", "Kanban oeffnen", "Gate 3 scheitern lassen", "Microsoft-Fit"]));
check("demo rail guides presenter flow", containsAll("app", ["demoFlow", "Demo-Regie", "data-demo-screen", "Schritt"]));
check("kanban stage-gate overview exists", containsAll("app", ["Stage-Gate Kanban", "stageDefinitions", "renderKanban", "renderStageColumn"]));
check("pyrolysis seed project starts at gate 2", containsAll("app", ["Pflanzenkohle / Pyrolyse", "stage: \"gate-2\"", "progress: 100"]));
check("drawer guided process exists", containsAll("app", ["renderDrawer", "Nächster Schritt", "Zur Gate-2-Entscheidung"]));
check("drawer shows controlled agent task queue", containsAll("app", ["Agentenaufgaben", "assignAgentCollection", "/api/agent-tasks", "kontrolliert"]));
check("gate 2 decision options exist", containsAll("app", ["Gate 2 · Invest + Rechtsform", "go", "stop", "hold", "pivot", "decideGate2"]));
check("go transitions to stage 3", containsAll("app", ["project.stage = \"stage-3\"", "Projekt wurde in Stage 3 ueberfuehrt"]));
check("stage 3 checklist exists", containsAll("app", ["Stage 3 · Pilotierung / Reallabor", "data-stage3-evidence", "Pilotbudget finalisieren"]));
check("gate 3 failure archives project", containsAll("app", ["failGate3", "Stop in Gate 3", "archiveProject"]));
check("archive reminder exists", containsAll("app", ["renderArchive", "Erinnerung setzen", "data-reminder"]));
check("new project creation exists", containsAll("app", ["Neues Projekt", "addProject", "Projekt in Stage 0 anlegen"]));
check("lead modal blocks after 30 seconds", containsAll("app", ["scheduleLeadGate", "30000", "Demo fuer 24 Stunden freischalten", "submitLead"]));
check("lead capture persists useful lead info", containsAll("app", ["js090168@fh-muenster.de", "viewedProject", "latestDecisionPath", "projectCount", "unlockedUntil"]));
check("settings show microsoft architecture", containsAll("app", ["Microsoft-Fit", "Azure Static Web Apps", "Microsoft Entra ID", "SharePoint", "Power BI"]));
check("settings include api-based backend blueprint", containsAll("app", ["apiContracts", "/api/projects", "/api/decisions", "/api/process-definition", "Backend-Schnittstellen"]));
check("audit and api events are recorded", containsAll("app", ["recordAudit", "recordApiEvent", "Audit Trail", "Letzte API-Events"]));
check("agent actions are limited", containsAll("app", ["Übernehmen", "Bearbeiten", "Ablehnen"]));
check("dynamic user input is escaped before rendering", containsAll("app", ["escapeHtml", "&amp;", "&#39;"]));

check("responsive CSS exists", containsAll("css", ["@media (max-width: 980px)", "@media (max-width: 620px)"]));
check("no negative letter spacing", !files.css.match(/letter-spacing:\\s*-/));
check("cards have stable radius", contains("css", "border-radius: 8px"));
check("new management components are styled", containsAll("css", [".demo-rail", ".timeline", ".task-row", ".api-row", ".architecture-flow"]));
check("reel/demo script documented", containsAll("readme", ["Demo-Flow", "Lead-Gate", "Entwicklungsorchestrierung"]));

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

---
name: frontend-eglv-app
description: Use when designing or implementing the frontend for the eGLV Business Development Agent App, including dashboard, stage workflows, gate decisions, settings, agent panel, and the eGLV-derived visual system.
---

# Frontend eGLV App Skill

## Mission

Build a work-focused frontend for the eGLV Business Development Agent App. The UI must make project status, Stage-Gate progress, missing evidence, management decisions, and agent support immediately visible.

## Design Rules

- Treat the app as an operational tool, not a landing page.
- Use eGLV cues: Arial, white workspace, dark text, `#003DA5` blue, `#00873E` green, restrained grey lines.
- Keep information dense but scan-friendly.
- Every project screen must answer: Where is the project? What is missing? Who decides next? What can the agent prepare?
- Do not hard-code process language in components when it should come from the API.

## Required Screens

- Dashboard with project pipeline, filters, stage counts, gate alerts, and agent hints.
- Project detail page with stage status, evidence, tasks, risks, owner, timeline, and agent panel.
- Stage workflow page showing goals, checklist, missing evidence, outputs, and completion conditions.
- Gate review page with criteria, evidence status, decision options, recommendation, and management protocol.
- Settings page for editing Stage-Gate definitions, criteria, roles, templates, and process versions.
- Agent workspace for briefings, summaries, stakeholder questions, business-case drafts, and lessons learned.

## Component Grammar

- Stage pipeline: stages and gates as connected workflow elements.
- Evidence checklist: clear status per item.
- Decision panel: criteria, recommendation, decision, rationale, follow-up tasks.
- Agent side panel: concise suggestions with accept/reject/edit actions.
- Definition editor: sortable stages, gate placement, criterion editor, version preview.

## Demo Data

Use Pflanzenkohle/Pyrolyse as the primary example project. Show it progressing through Business Case, Gate 2, Pilotierung, and Gate 3 where useful.

## QA Checklist

- Text does not overflow on mobile or desktop.
- Users can understand project status without reading long paragraphs.
- Every button has a clear action.
- The Stage-Gate definition screen proves configurability.
- The agent is visibly supportive, not authoritative.


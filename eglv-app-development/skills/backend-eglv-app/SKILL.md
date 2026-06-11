---
name: backend-eglv-app
description: Use when designing or implementing the backend, API, data model, process engine, agent orchestration, or persistence layer for the eGLV Business Development Agent App.
---

# Backend eGLV App Skill

## Mission

Build an API-first backend that treats the eGLV Stage-Gate process as configurable, versioned domain data. The backend must support frontend screens, agent tasks, auditability, and later integrations.

## Core Domain Objects

- `ProcessDefinition`: versioned Stage-Gate process.
- `StageDefinition`: stage name, purpose, tasks, evidence, roles, completion conditions.
- `GateDefinition`: gate criteria, required evidence, decision options, management roles.
- `Project`: concrete business development initiative.
- `ProjectStage`: project-specific stage status and progress.
- `GateReview`: project-specific gate preparation and decision.
- `Evidence`: document, link, note, interview, scoring, business-case artifact.
- `BusinessCaseVariant`: one of 2-3 comparable case variants.
- `AgentRun`: recorded agent task, context, output, assumptions, feedback.
- `KnowledgeItem`: reusable lessons learned and decision knowledge.

## API Principles

- Frontend and agent must use the same API resources.
- Never hard-code the eGLV process in endpoints; load process definitions.
- Version process definitions instead of overwriting them.
- Gate decisions require audit events.
- Agent outputs must store assumptions and source context.

## Required Services

- `ProcessService`
- `ProjectService`
- `EvidenceService`
- `GateService`
- `AgentService`
- `KnowledgeService`
- `AuditService`

## Agent Guardrails

- The agent prepares, summarizes, structures, and flags gaps.
- The agent never makes management decisions.
- Missing facts must be marked as missing.
- Recommendations must reference available project evidence.

## Demo Guardrails

- Use seeded demo data only.
- Avoid confidential or personal data.
- Mark demo agent outputs clearly.
- Keep a reset path for presentations.

## Backend QA Checklist

- Stages and gates can be changed without code changes.
- A project can be tied to a specific process version.
- Gate decisions are traceable.
- Missing evidence can be computed from process definitions.
- Agent runs are reproducible enough to explain what context was used.


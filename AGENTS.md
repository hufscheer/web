# AGENTS.md

## Project Overview

This repository is a Turborepo-based monorepo where operator and spectator apps share common packages.

- apps/spectator: App for spectators. Provides real-time viewing information such as scores and game progress.
- apps/manager: Mobile dashboard for operators. Updates game progress and scores in real time.
- packages/api-base: Shared API utilities. Manages base URL, headers, fetcher, and query client settings.
- packages/icons: Shared icon package.
- packages/style: Shared style package.
- packages/ui: Shared UI component package.

## Agent Working Principles

- Keep changes within the requested domain only. Do not modify unrelated files.
- Keep app-specific logic under apps/_, and promote reusable logic to packages/_.
- If logic is needed by both spectator and manager, first evaluate extracting it into packages/\*.
- Follow packages/api-base and each app's src/api layer conventions for API calls.
- Prefer packages/style for design tokens and shared styles; minimize hardcoded values.
- Add reusable components to packages/ui, and compose app-specific screens in apps/\*.

## Path-Based Guide

### apps/spectator

- Focus on spectator UX, read-oriented information display, and real-time updates.
- Do not add operator/admin-style management features.

### apps/manager

- Focus on game state transitions, score input/edits, and operator workflows.
- Avoid over-mixing spectator-only read-optimization features.

### packages/api-base

- Own shared network policy only (auth headers, error handling, common fetcher).
- Do not include app-screen dependent logic.

### packages/icons

- Manage icon sources and wrapper components.
- Avoid temporary app-specific icon definitions.

### packages/style

- Define shared CSS variables, utility styles, and themes.

### packages/ui

- Build reusable UI primitives and composed components.
- Avoid app-specific business copy/domain-dependent props.

## Working Checklist

- Maintain type safety: avoid overusing any and unsafe assertions.
- Follow existing naming and folder conventions.
- Consider empty, loading, and error states for new features.
- Handle real-time score/quarter data defensively for missing values.
- Remove unnecessary console.log statements.

## Local Validation Commands

Run from repository root:

- Full build: `pnpm build`
- Full lint: `pnpm lint`
- Spectator build: `pnpm build:spectator`
- Manager build: `pnpm build:manager`
- Spectator dev server: `pnpm dev:spectator`
- Manager dev server: `pnpm dev:manager`

## Recommended Pre-Commit Checks

- Run at least one build or lint for the changed app/package.
- When shared packages are modified, verify impact on both spectator and manager.
- For UX-impacting UI changes, verify mobile layout as well.

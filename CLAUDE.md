# Project: Automation Exercise — QA / E2E Test Suite

## What this project is
Public e-commerce demo site ([automationexercise.com](https://www.automationexercise.com/)) used as a Playwright practice target. Tests cover login, cart, checkout, product search, subscriptions, and related flows based on the site's published test cases.

## Agentic QA framework
This repo includes a multi-agent pipeline for planning, generating, triaging, and healing tests:

| Agent | Definition | Purpose |
|-------|------------|---------|
| orchestrator | `.claude/agents/orchestrator.md` | End-to-end workflow coordinator |
| planner | `.claude/agents/planner.md` | Test plans → `qa/plans/` |
| generator | `.claude/agents/generator.md` | Plans → Playwright code |
| triage | `.claude/agents/triage.md` | Classify failures before healing |
| healer | `.claude/agents/healer.md` | Fix test maintenance issues |

Cursor skill: `.cursor/skills/agentic-qa/SKILL.md`

**Typical workflow:** plan → generate → run → triage → heal

## Tech stack
- Framework: Playwright (TypeScript, ESM)
- Test runner: `pnpm exec playwright test`
- App under test: `https://www.automationexercise.com` (external, no local server)
- CI: GitHub Actions — `.github/workflows/playwright.yml`
- Self-healing CI (optional): `.github/workflows/e2e-with-healer.yml`
- Reporting: HTML + JUnit (`test-results/test-results.xml`)

## Directory structure
```
tests/              # spec files, one per feature/flow
src/pages/          # Page Object Model classes
src/fixtures/       # auth fixture, sample files
src/constants/      # static test data (users, products)
src/data/           # JSON test data
src/helpers/        # utilities
src/setup/          # global setup (auth state)
qa/plans/           # agent-generated test plans
qa/reports/         # triage/heal reports, failure JSON
scripts/            # qa helpers (collect-failures.mjs)
playwright.config.ts
```

## Conventions Claude must follow
- **Locators:** Prefer `getByRole`, `getByLabel`, `getByText`. Only fall back to `data-testid` if no accessible locator exists. Never use brittle CSS/XPath selectors.
- **Structure:** Follow Page Object Model — page interactions live in `src/pages/`, specs stay thin and readable.
- **Naming:** Spec files as `feature-name.spec.ts`. Test titles describe behavior, not implementation ("shows error on invalid login", not "test login function").
- **Assertions:** Use web-first assertions (`await expect(locator).toBeVisible()`), never manual waits/sleeps.
- **Independence:** Every test must run in isolation — no dependency on test execution order.
- **Auth:** Reuse stored auth state from `src/.auth/user.json` via `src/fixtures/auth.fixture.ts` where possible instead of logging in per test.

## What Claude should do automatically
- When asked to add coverage for a feature, run the orchestrator workflow (plan → generate → run → triage → heal).
- Check `src/pages/` for an existing Page Object before creating a new one.
- Run the new/changed spec locally (`pnpm exec playwright test path/to/spec.ts`) and confirm it passes before considering the task done.
- If a locator can't be found, inspect the DOM (via Playwright MCP or `--debug`) rather than guessing selectors.
- Flag flaky tests (pass/fail inconsistently across 3 runs) instead of silently retrying and moving on.
- On CI/local failures, run `pnpm run qa:failures` before triaging.

## What Claude should NOT do
- Don't modify `playwright.config.ts` or CI workflow files without flagging the change first.
- Don't delete or skip existing tests to make a run pass — report the failure instead.
- Don't add arbitrary `waitForTimeout` calls to fix flakiness — find the real race condition.
- Don't heal tests classified as app bugs.

## How to run things
- All tests: `pnpm test`
- Single file: `pnpm exec playwright test tests/correct-login.spec.ts`
- Debug mode: `pnpm exec playwright test --debug`
- Collect failures for agents: `pnpm run qa:failures`
- Full QA run + failure collection: `pnpm run qa:run`

## Useful context
- Test cases reference: https://www.automationexercise.com/test_cases
- Valid login: see `src/constants/valid-user-login.ts`
- Known flaky areas: ad/tracker popups — auth fixture blocks common ad routes

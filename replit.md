# Tawsel

An Arabic-first food, grocery, and pharmacy delivery experience built for Khartoum.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/tawsel-app` — the web experience, including the shared app shell, routes, local catalog data, and theme.
- `artifacts/tawsel-mobile` — the native mobile companion with the same Tawsel discovery and ordering surface.
- `artifacts/api-server` — the shared Express API service.
- `lib/api-spec/openapi.yaml` — the API contract source of truth.
- `lib/db/src/schema` — the Drizzle database schema.

## Architecture decisions

- The web app uses Wouter with a shared shell so desktop navigation and the mobile bottom bar stay consistent across routes.
- Arabic and English copy live beside the local catalog data, and the active language controls document direction at the app root.
- Cart and favorites persist in local storage so the preview remains useful without an account or backend seed data.

## Product

Tawsel helps people in Khartoum discover nearby restaurants, groceries, and pharmacy essentials, save favorite places, build a basket, preview checkout, track active orders, and manage language and notification preferences.

## User preferences

No additional preferences recorded.

## Gotchas

- The web artifact's Vite config expects `PORT` and `BASE_PATH` from its managed workflow; use the Tawsel web workflow for runtime verification.
- If API contracts change, regenerate the clients with `pnpm --filter @workspace/api-spec run codegen` before consuming new hooks.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

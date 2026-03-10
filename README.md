# AWS Meetup Demo — Amplify Gen2 Todo App

A full-stack Todo application built with AWS Amplify Gen2, React, TypeScript, and Tailwind CSS v4. Features Cognito-based email authentication and a real-time DynamoDB-backed GraphQL API with per-user (owner) authorization.

## Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS v4, TypeScript 5.7
- **Backend**: AWS Amplify Gen2 (code-first), Cognito User Pools, AppSync GraphQL, DynamoDB
- **Auth**: Email/password via `@aws-amplify/ui-react` Authenticator component
- **CI/CD**: AWS Amplify Hosting (`amplify.yml`)

## Prerequisites

- Node.js (v18+)
- npm
- AWS account with Amplify access
- AWS CLI configured (for sandbox)

## Getting Started

```bash
# Install dependencies
npm install

# Start the Amplify cloud sandbox (deploys backend resources)
npx ampx sandbox

# In another terminal, start the dev server
npm run dev
```

The sandbox generates `amplify_outputs.json` with your backend configuration. This file is gitignored and must be generated locally.

## Scripts

| Command              | Description                              |
|----------------------|------------------------------------------|
| `npm run dev`        | Start Vite dev server                    |
| `npm run build`      | Typecheck + production build             |
| `npm run preview`    | Preview production build locally         |
| `npx ampx sandbox`  | Start Amplify cloud sandbox              |
| `npx ampx sandbox delete` | Tear down sandbox resources        |

## Project Structure

```
├── amplify/              # Amplify Gen2 backend (code-first)
│   ├── auth/resource.ts  # Cognito auth config (email login)
│   ├── data/resource.ts  # GraphQL schema (Todo model)
│   └── backend.ts        # Backend entry point
├── src/                  # React frontend
│   ├── main.tsx          # App entry, Amplify config, Authenticator wrapper
│   ├── App.tsx           # Todo CRUD UI with real-time subscriptions
│   └── index.css         # Tailwind v4 imports + theme tokens
├── amplify.yml           # CI/CD build spec for Amplify Hosting
└── amplify_outputs.json  # Generated backend config (gitignored)
```

## Design

See [DESIGN.md](DESIGN.md) for the design system — colors, typography, spacing, and component patterns.

## Deployment

Push to a connected branch in AWS Amplify Hosting. The `amplify.yml` buildspec handles both backend (`ampx pipeline-deploy`) and frontend (`npm run build`) builds automatically.

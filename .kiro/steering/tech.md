# Tech Stack

## Frontend

- React 18 with TypeScript 5.7
- Vite 6 (build tool and dev server)
- Tailwind CSS v4 (utility-first styling)
- AWS Amplify UI React (authentication components)

## Backend

- AWS Amplify Gen2 (code-first backend definition)
- Amazon Cognito (user authentication)
- AWS AppSync (GraphQL API)
- Amazon DynamoDB (data storage)

## Key Libraries

- `aws-amplify` v6 - AWS service integration
- `@aws-amplify/ui-react` v6 - Pre-built auth UI components
- `@aws-amplify/backend` v1 - Backend resource definitions

## Build System

Vite 6 with TypeScript compilation. No webpack or custom config needed.

## Common Commands

```bash
# Development
npm install              # Install dependencies
npx ampx sandbox         # Start Amplify cloud sandbox (deploys backend)
npm run dev              # Start Vite dev server (http://localhost:5173)

# Production
npm run build            # TypeScript check + Vite production build
npm run preview          # Preview production build locally

# Sandbox Management
npx ampx sandbox delete  # Tear down sandbox resources
```

## Important Notes

- Always run `npx ampx sandbox` before `npm run dev` to generate `amplify_outputs.json`
- The sandbox deploys real AWS resources to your account
- `amplify_outputs.json` is gitignored and must be generated locally
- TypeScript strict mode is enabled
- Tailwind v4 uses `@theme` in CSS files instead of `tailwind.config.js`

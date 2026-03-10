# Project Structure

## Root Layout

```
├── amplify/              # Backend definitions (code-first)
├── src/                  # Frontend React application
├── dist/                 # Build output (gitignored)
├── node_modules/         # Dependencies (gitignored)
├── amplify_outputs.json  # Generated backend config (gitignored)
├── amplify.yml           # CI/CD build specification
├── index.html            # Vite entry point
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

## Backend (`amplify/`)

Code-first backend definitions using Amplify Gen2.

- `backend.ts` - Entry point, imports and registers auth + data resources
- `auth/resource.ts` - Cognito configuration (email login)
- `data/resource.ts` - GraphQL schema and authorization rules
- `package.json` - Backend-specific dependencies
- `tsconfig.json` - Backend TypeScript config

## Frontend (`src/`)

React application with minimal file structure.

- `main.tsx` - App entry point, Amplify configuration, Authenticator wrapper
- `App.tsx` - Main todo UI with CRUD operations and real-time subscriptions
- `index.css` - Tailwind v4 imports and custom theme tokens
- `vite-env.d.ts` - Vite type definitions

## Key Patterns

### Backend Resource Definition

Resources are defined using `define*` functions from `@aws-amplify/backend`:

```typescript
// amplify/auth/resource.ts
export const auth = defineAuth({ ... });

// amplify/data/resource.ts
export const data = defineData({ schema, ... });

// amplify/backend.ts
defineBackend({ auth, data });
```

### GraphQL Schema

Uses Amplify's `a.schema()` builder pattern:

```typescript
const schema = a.schema({
  ModelName: a.model({ field: a.string() })
    .authorization((allow) => [allow.owner()])
});
```

### Frontend Data Access

Uses generated client from schema:

```typescript
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

// CRUD operations
client.models.Todo.create({ content: "..." });
client.models.Todo.delete({ id: "..." });

// Real-time subscriptions
client.models.Todo.observeQuery().subscribe({ ... });
```

### Styling

Tailwind v4 with custom theme tokens in `src/index.css`:

```css
@theme {
  --color-primary: #047d95;
  --color-primary-dark: #036b80;
}
```

Use tokens via Tailwind classes: `bg-primary`, `hover:bg-primary-dark`

## File Naming Conventions

- React components: PascalCase (e.g., `App.tsx`)
- Backend resources: lowercase with `.ts` extension (e.g., `resource.ts`)
- Config files: lowercase with appropriate extension (e.g., `vite.config.ts`)
- CSS files: lowercase (e.g., `index.css`)

## Import Patterns

- Amplify backend imports: `@aws-amplify/backend`
- Amplify client imports: `aws-amplify/data`, `aws-amplify/auth`
- UI components: `@aws-amplify/ui-react`
- Local schema types: `../amplify/data/resource`

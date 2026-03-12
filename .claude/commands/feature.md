# /feature — Test-Driven Feature Development

You are implementing a new feature using strict Test-Driven Development. Follow this process exactly.

## Input

The user will describe a feature: $ARGUMENTS

## Step 1: Understand the Feature

Read relevant existing code to understand:
- Where this feature fits in the current architecture
- What components/functions need to be created or modified
- What the user-visible behavior should be

## Step 2: RED — Write Failing Tests First

**Before writing ANY production code:**

1. Create or update the test file (e.g., `ComponentName.test.tsx`)
2. Write tests that describe the desired behavior:
   - What the component/function should render or return
   - How it should respond to user interactions
   - Edge cases and error states
3. Use React Testing Library patterns:
   - Query by role, label, or text — never by test ID
   - Simulate real user interactions with `userEvent`
   - Assert on visible behavior, not implementation details
4. Run `npm test` to confirm tests **FAIL** for the right reason
5. Show the user the failing test output

**STOP HERE.** Ask the user: "Tests are written and failing. Ready to implement?"

## Step 3: GREEN — Minimum Implementation

1. Write the minimum production code to make all tests pass
2. Run `npm test` to confirm all tests **PASS**
3. Run `npm run build` to confirm TypeScript compiles
4. Show the user the passing test output

## Step 4: REFACTOR (if valuable)

1. Look for improvements: duplication, naming, extraction
2. Only refactor if it genuinely improves the code
3. Run `npm test` after every change to ensure tests still pass

## Rules

- **NEVER skip Step 2** — the test file must exist and fail before any production code
- **NEVER write production code and tests simultaneously** — tests come first, always
- Test behavior (what the user sees), not implementation (how code works internally)
- One test file per component/module, colocated with the source file
- If the feature needs multiple components, repeat the RED→GREEN cycle for each

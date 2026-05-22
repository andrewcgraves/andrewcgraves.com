# Dev Workflow

## Package scripts
Run all linting, formatting, building, and testing through the scripts defined in `package.json`. Do not invoke tools like `eslint`, `prettier`, `vitest`, or `next` directly.

Available scripts:
- `yarn dev` — start dev server
- `yarn build` — production build
- `yarn lint` / `yarn lint:fix` — ESLint
- `yarn format` / `yarn format:check` — Prettier
- `yarn test` / `yarn test:watch` / `yarn test:coverage` — Vitest

## Package manager
Always use **yarn**. Never use `npm` or `npx`.

## Before pushing
Before pushing any branch or creating a PR, always run the following in order and fix any failures before proceeding:

1. `yarn lint` — fix any ESLint errors (use `yarn lint:fix` to auto-fix)
2. `yarn format:check` — fix any formatting issues (use `yarn format` to auto-fix)
3. `yarn test` — confirm all tests pass
4. `yarn build` — confirm the production build succeeds

Do not push if any of these commands fail.

## Branch naming
Branches must follow the pattern: `<type>/<3-5 word kebab-case description>`

Valid types: `feature`, `chore`, `fix`

Examples:
- `feature/add-ceramics-gallery`
- `fix/logo-icon-extension`
- `chore/update-dependencies`

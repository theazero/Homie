# Homie

Homie helps a household track chores, compare time spent, and keep shared work visible.

## Run Locally

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: start the Vite web app
- `npm run build`: create a production build
- `npm test`: run domain tests

## Structure

- `src/app`: app composition
- `src/components`: reusable React UI components
- `src/domain`: shared household, summary, and workload map logic
- `src/data`: task definitions and design tokens for future mobile reuse
- `src/styles`: web style entry point

The current visual design is intentionally preserved while the app is now structured so the domain logic and design tokens can be reused in a future Expo/React Native mobile app.

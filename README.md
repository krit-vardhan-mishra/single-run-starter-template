# Single Run Starter

A minimal starter that runs server + Vite client in one command. Includes Vite + Tailwind preconfigured.

Commands:

- `npm ci`
- `npm run dev` — runs `server/index.ts` which attaches Vite dev server (single process)
- `npm run build` — builds the client and bundles the server to `dist/`
- `npm start` — runs the bundled server in production

Notes:
- Edit the project `package.json` to add your own dependencies
- The dev server mounts the Vite middleware so you get HMR for client code while the server handles API routes

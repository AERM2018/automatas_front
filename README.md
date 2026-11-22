# Automata exercises

A small React app that shows the transition table and graph of three DFAs and lets you test whether a word is accepted.

Built with [React](https://react.dev), [React Router](https://reactrouter.com) and [Vite](https://vite.dev).

## Run locally (requires Node.js 20.19+ or 22.12+)

```bash
npm install
npm run dev       # dev server at http://localhost:3000 with hot reload
npm run build     # production build into dist/
npm run preview   # serve the dist/ build locally to check it
```

## Run with Docker

```bash
docker build -t automatas-front .
docker run -p 8080:80 automatas-front
# open http://localhost:8080
```

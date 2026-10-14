# RipePick

RipePick is an AI-first healthy-eating decision assistant centered on fruits. It helps users turn a current eating situation or goal into a practical fruit and breakfast pairing.

The project is currently in its MVP stage. It provides general healthy-eating guidance and does not provide medical diagnosis or treatment.

## Repository structure

```text
RipePick/
├── frontend/   # Expo and React Native application
├── backend/    # Go and Gin API
├── product/    # Product flows, prototypes, and design artifacts
├── PRODUCT.md
└── MVP_BRIEF.md
```

## Frontend

Requirements: Node.js and npm.

```bash
cd frontend
npm install
npm start
```

From the Expo development server, press `i` for iOS, `a` for Android, or `w` for web.

Verification:

```bash
npm run lint
npx tsc --noEmit
```

## Backend

Requirements: Go 1.26 or a version compatible with `backend/go.mod`.

```bash
cd backend
go run .
```

The current API health endpoint is available at `GET /api/v1/ping`.

Verification:

```bash
go test ./...
go vet ./...
```

## Product scope

See [MVP_BRIEF.md](product/MVP_BRIEF.md) for the current implementation boundary and [PRODUCT.md](product/PRODUCT.md) for the longer-term product direction. Product prototypes and their inventory are in [`product/`](product/).

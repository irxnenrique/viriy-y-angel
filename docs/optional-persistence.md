# Optional persistence layer

The starter intentionally ships without a database. Static invitations that confirm through
WhatsApp do not need one.

When RSVP records, uploads, guest access, or an admin panel become necessary, extend the existing
Express server using the same stack as `maloba.mx`:

- `better-sqlite3` for SQLite.
- `express-session` for authenticated sessions.
- `bcryptjs` for password hashing.
- `multer` for local image uploads.
- `helmet` and `express-rate-limit` for HTTP hardening.
- `dotenv` for local-only environment variables.

Use `STORAGE_ROOT` exactly as the portfolio does. On Railway, attach one persistent volume at
`/app/storage`; store the database under `/app/storage/data/` and uploads under
`/app/storage/uploads/`. Keep one replica while SQLite is used.

Suggested future folders:

```text
server/
  database.js
  index.js
  migrations/
  routes/
    admin.js
    invitations.js
    rsvp.js
src/
  pages/admin-page/
  hooks/use-rsvp.ts
  types/rsvp.ts
```

Do not install these dependencies until the feature is actually needed. If invitations grow into
a multi-tenant service, prefer PostgreSQL and object storage rather than sharing one SQLite volume
between replicas.

# To-Do List — Full-Stack (MERN)

A full-stack task management app with complete, properly-implemented
authentication — not just CRUD behind a login form, but real JWT session
handling with refresh token rotation and server-side revocation.

## Features

**Auth**
- Register / login with hashed passwords (bcrypt)
- JWT access tokens (short-lived, 15 min) + refresh tokens (7 days, httpOnly
  cookie) — separate signing secrets for each
- Refresh tokens are hashed before being stored, so a database leak alone
  can't be used to impersonate a user
- Logout actually revokes the session server-side (clears the stored hash),
  not just a client-side cookie clear
- Silent session restore on page load, with a frontend interceptor that
  auto-refreshes an expired access token and retries the original request
- Protected and public-only routes (React Router guards)

**Tasks**
- Full CRUD, scoped per-user — each user only ever sees their own tasks
- Inline editing, due-date tracking with overdue highlighting
- Search and sort
- Toast feedback on every action, loading states on every async operation
- Dark mode

## Stack
**Frontend:** React 19 · React Router · Tailwind CSS · Axios · shadcn/ui ·
Vite
**Backend:** Node.js · Express · MongoDB (Mongoose) · JWT · bcrypt ·
rate limiting (Upstash Redis)

## Deployment notes
Frontend and backend are deployed separately on Vercel. Since browsers treat
each `*.vercel.app` project subdomain as a distinct "site" (Vercel is on the
Public Suffix List), a Vercel rewrite proxies `/api/*` requests through the
frontend's own domain — avoiding third-party cookie restrictions that would
otherwise break session persistence across page reloads.

## Live demo
https://to-do-list-mern-md.vercel.app/
# Employee Management System (React + Vite)

## Requirements
- Node.js (LTS)
- VS Code or another code editor

## Setup
1. Extract the ZIP.
2. Open the `employee-management-system` folder in VS Code.
3. Open Terminal in that folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL shown by Vite (normally http://localhost:5173).

## Demo accounts
| Role | Username | Password |
|---|---|---|
| Admin | admin | admin123 |
| HR | hr | hr123 |
| Manager | manager | manager123 |
| Employee | employee | emp123 |

## Notes
- Data is stored in the browser's localStorage under `emsData`.
- To reset demo data, open browser DevTools > Application > Local Storage, delete `emsData`, and refresh.
- This is a front-end academic/demo project. Passwords and role checks are not secure for production. A real system needs a backend, database, and server-side authorization.
- The implementation is split into components, pages, contexts, services, data, and utility files as requested.

# Free Deployment Guide

This project has:

- `frontend`: React / Create React App
- `backend`: PHP API with MySQL
- `backend/bbd/bbd.sql`: database schema/data

Recommended free setup:

- Frontend: Vercel Hobby or Netlify Free
- Backend: Render Free Web Service using Docker, or InfinityFree if uploaded files must persist
- Database: Aiven MySQL Free Tier

Important: the backend stores uploaded justificatif files in `backend/uploads`. Render Free has an ephemeral filesystem, so uploads can be lost after a redeploy, restart, or sleep cycle. If those uploads are important, use InfinityFree for the PHP backend and its MySQL database, or move uploads to external storage.

## 1. Database on Aiven

1. Create an Aiven MySQL free service.
2. Open the service connection details.
3. Import `backend/bbd/bbd.sql` into the Aiven database.
4. Keep these values for the backend environment variables:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_DATABASE`
   - `DB_USERNAME`
   - `DB_PASSWORD`

## 2. Backend on Render

1. Push this repository to GitHub.
2. In Render, create a new Web Service.
3. Select the repository.
4. Set:
   - Root Directory: `backend`
   - Runtime/Language: `Docker`
   - Instance Type: `Free`
5. Add the environment variables from `backend/.env.example`.
6. Deploy.

Your API URL will look like:

```text
https://your-backend-name.onrender.com/api
```

Important: Render Free services sleep after inactivity, so the first request can take about a minute.

## 3. Frontend on Vercel

1. In Vercel, import the same GitHub repository.
2. Set:
   - Root Directory: `frontend`
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
3. Add this environment variable:

```text
REACT_APP_API_BASE_URL=https://your-backend-name.onrender.com/api
```

4. Deploy.

## Alternative

You can use InfinityFree for PHP + MySQL, but use its own MySQL database and import `backend/bbd/bbd.sql` there. It is less convenient with this project because the current database setup points to an external Aiven MySQL service on a non-default port.

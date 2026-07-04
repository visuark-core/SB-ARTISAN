# SB Artisan Jodhpur — Restructured Production-Ready Repository

This repository has been restructured into two completely independent projects: `frontend` (React + Vite) and `backend` (Node.js + Express + PostgreSQL). This structure is designed to optimize deployment on AWS:
- **Frontend**: Deployed to **Amazon S3** and distributed via **Amazon CloudFront** CDN.
- **Backend API**: Hosted on **Amazon EC2**.
- **Database**: **PostgreSQL** installed and configured on the **EC2 instance** (or migrated to Amazon RDS).

---

## Final Project Structure

```text
sb-artisan/
├── frontend/                     # React Frontend (Vite + TS + Tailwind)
│   ├── components/               # Showroom & Admin UI components
│   ├── lib/                      # Helper utilities (cn, API client configuration)
│   ├── public/                   # Static assets
│   ├── src/                      # React application source code (App, index, etc.)
│   ├── .env                      # Local development environment settings
│   ├── .env.example              # Template for frontend environment variables
│   ├── index.html                # Entry HTML page
│   ├── package.json              # Frontend dependencies and scripts
│   ├── postcss.config.js         # PostCSS configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── tsconfig.json             # TypeScript configuration
│   └── vite.config.ts            # Vite configuration
│
└── backend/                      # Node.js API (Express + PostgreSQL)
    ├── config/                   # Database pool and connection manager
    ├── controllers/              # Request handlers for products, blogs, inquiries, etc.
    ├── middleware/               # Auth validator, error handlers
    ├── models/                   # DB queries & PostgreSQL tables mappings
    ├── pgdata/                   # Local PostgreSQL data files (ignored by git)
    ├── routes/                   # API routing tables (/api/products, /api/auth, etc.)
    ├── scripts/                  # Seed, migration, and DB setup utilities
    ├── .env                      # Local development environment settings
    ├── .env.example              # Template for backend environment variables
    ├── package.json              # Backend dependencies and scripts
    └── server.js                 # API server entrypoint
```

---

## Environment Variables

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` folder:
```ini
# Backend API base URL (Vite matches VITE_* prefix)
VITE_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)
Create a `.env` file in the `backend` folder:
```ini
PORT=5000
DB_USER=tony
DB_PASSWORD=123456
DB_HOST=localhost
DB_NAME=sb_artisan
DB_PORT=5433
DB_SSL=false
JWT_SECRET=sb_artisan_golden_key_2026
JWT_EXPIRE=24h
NODE_ENV=development

# URL of the running frontend application for CORS policy
FRONTEND_URL=http://localhost:3000

# Cloudinary parameters for uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Local Development Execution

### 1. Running the Backend
From the root workspace, navigate to the `backend` directory, install dependencies, and start the development server:
```bash
cd backend
npm install
npm run dev
```
*Note: The backend features an auto-start script that starts the local PostgreSQL database service (if pgdata is present) on port `5433`.*

### 2. Running the Frontend
In another terminal, navigate to the `frontend` directory, install dependencies, and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
By default, the Vite dev server will run on `http://localhost:3000`.

---

## Production AWS Deployment Architecture

```text
       Internet
          │
          ▼
    Amazon CloudFront  (CDN HTTPS caching)
          │
          ▼
      Amazon S3        (Frontend Static Website Hosting)
          │
          ▼ API Requests
      Amazon EC2       (Node.js API inside systemd process / PM2)
          │
          ▼ Local Connections
     PostgreSQL        (Installed locally on EC2, port 5432, secured by pg_hba.conf)
```

### Frontend Deployment (S3 + CloudFront)
1. **Build the assets**:
   ```bash
   cd frontend
   npm run build
   ```
   This will output a `dist/` directory containing static HTML, JS, and CSS files.
2. **Upload to S3**:
   Create an S3 bucket configured for static website hosting and upload the contents of the `dist/` directory.
3. **Configure CloudFront**:
   Set up a CloudFront distribution pointing to the S3 bucket as its origin. Enable custom domains, SSL/TLS certificates via AWS Certificate Manager (ACM), and set the default root object to `index.html`. Configure custom error responses to route all 403/404 errors back to `/index.html` (since this is a Single Page Application using client-side routing).

### Backend Deployment (EC2 + PostgreSQL)
1. **Launch EC2 Instance**:
   Create an Ubuntu/Amazon Linux EC2 instance. Associate an Elastic IP and configure Security Groups to allow ports:
   - `22` (SSH)
   - `80` / `443` (HTTP/HTTPS)
   - `5000` (API backend, or proxy through Nginx on port `80`)
2. **Install Node.js & PM2**:
   Install Node.js and PM2 globally to keep the Express app running in the background.
3. **Install & Setup PostgreSQL**:
   - Install PostgreSQL: `sudo apt install postgresql postgresql-contrib`
   - Adjust `postgresql.conf` and `pg_hba.conf` to configure local access.
   - Run setup and migrations: `npm run db:setup` and `npm run seed`.
4. **Environment configuration**:
   Add the production `.env` file on the server with production database parameters, JWT secret, and the frontend domain as the `FRONTEND_URL` for CORS restriction.
5. **Nginx Reverse Proxy**:
   Configure Nginx to listen on port `80` and reverse proxy `/api` traffic to `http://localhost:5000`.

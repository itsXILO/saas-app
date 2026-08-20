# CreatorHub - AI-Powered Content Creation Platform

A full-stack SaaS application that empowers content creators with AI-powered tools for article writing, blog title generation, image creation, background removal, object removal, and PDF summarization. Built with a freemium model, community features, and subscription-based monetization.

**Live Demo (Vercel):** [https://creatorhub-ebon.vercel.app/](https://creatorhub-ebon.vercel.app/)

> **EC2 Deployment:** The app is also deployed on AWS EC2 with Docker + CI/CD. The EC2 instance may not be running at all times to manage costs. When active, it's accessible at `http://ec2-13-60-237-198.eu-north-1.compute.amazonaws.com:5173`

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [Deployment](#deployment)
- [Docker Setup](#docker-setup)

---

## Features

### AI-Powered Tools

| Tool | Description | Free Limit |
|------|-------------|------------|
| **Write Article** | Generate full articles (500-1200+ words) from a topic prompt | 10 uses |
| **Blog Titles** | Generate 5 blog titles with selectable tone (Professional, Casual, Witty, Informative) | 10 uses |
| **Generate Images** | Text-to-image generation with 8 style options (Realistic, Ghibli, Cyberpunk, Watercolor, etc.) | 3 uses |
| **Remove Background** | Upload an image and remove its background using AI | 10 uses |
| **Remove Objects** | Upload an image and remove specific objects by name | 5 uses |
| **Summarize PDF** | Upload a PDF and get an AI-generated summary | 3 uses |

### Platform Features

- **Freemium Model** - Free tier with usage limits, Premium tier ($4/mo Student, $19/mo Pro) with unlimited access
- **Community Gallery** - Browse and like publicly shared creations from all users
- **Creation History** - All AI outputs saved to database, accessible from dashboard
- **Public/Private Toggle** - Users choose which creations to share publicly
- **Like System** - Like/unlike community creations
- **Responsive Design** - Works seamlessly on desktop and mobile devices

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite 8 | Build tool and dev server |
| TailwindCSS v4 | Utility-first CSS styling |
| React Router DOM 7 | Client-side routing |
| Clerk (`@clerk/react`) | Authentication & subscription management |
| Axios | HTTP client |
| React Markdown | Rendering AI-generated content |
| Lucide React | Icon library |

### Backend

| Technology | Purpose |
|------------|---------|
| Express 5 | Web framework |
| Clerk (`@clerk/express`) | Authentication middleware |
| OpenAI SDK | Client for Google Gemini API (OpenAI-compatible) |
| Cloudinary | Image hosting, background removal, object removal |
| Multer | File upload handling |
| Neon DB (PostgreSQL) | Serverless database |
| pdf2json | PDF text extraction |

### External Services

| Service | Purpose |
|---------|---------|
| Google Gemini (`gemini-3.1-flash-lite`) | Text generation (articles, titles, summaries) |
| ClipDrop API | Text-to-image generation |
| Cloudinary | Image hosting + AI transformations |
| Clerk | Authentication, user management, subscriptions |
| Neon DB | Serverless PostgreSQL database |

### DevOps

| Technology | Purpose |
|------------|---------|
| Docker | Containerization with multi-stage builds |
| Docker Compose | Multi-service orchestration |
| GitHub Actions | CI/CD pipeline (lint, build, deploy) |
| AWS EC2 | Production deployment |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Vercel)                        │
│  React + Vite + TailwindCSS + Clerk Auth                    │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │
│  │  Home   │ │ Dashboard│ │ AI Tools │ │   Community    │  │
│  │(Public) │ │(Protected)│ │(6 tools) │ │   (Gallery)    │  │
│  └─────────┘ └──────────┘ └──────────┘ └────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS (Bearer Token)
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVER (Vercel)                           │
│  Express 5 + Clerk Middleware + Auth                        │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │   AI Routes      │  │   User Routes    │                 │
│  │  /api/ai/*       │  │  /api/user/*     │                 │
│  └────────┬─────────┘  └────────┬─────────┘                 │
│           │                     │                           │
│           ▼                     ▼                           │
│  ┌──────────────────────────────────────────┐               │
│  │          External Services               │               │
│  │  ┌─────────┐ ┌──────────┐ ┌───────────┐ │               │
│  │  │ Gemini  │ │ ClipDrop │ │ Cloudinary│ │               │
│  │  │  (AI)   │ │ (Images) │ │  (Image)  │ │               │
│  │  └─────────┘ └──────────┘ └───────────┘ │               │
│  └──────────────────────────────────────────┘               │
│           │                                                  │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │    Neon DB       │                                       │
│  │  (PostgreSQL)    │                                       │
│  └──────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
saas-app/
├── .dockerignore                     # Docker build context exclusions
├── docker-compose.yml                # Multi-service orchestration
├── .github/workflows/ci.yml          # CI/CD pipeline
├── client/                          # Frontend (React + Vite)
│   ├── Dockerfile                   # Multi-stage: Node build → serve
│   ├── src/
│   │   ├── main.jsx                 # App entry: ClerkProvider + Router
│   │   ├── index.css                # TailwindCSS config
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Top navigation with auth buttons
│   │   │   ├── Sidebar.jsx          # App navigation sidebar
│   │   │   ├── Hero.jsx             # Landing page hero section
│   │   │   ├── AiTools.jsx          # AI tools grid showcase
│   │   │   ├── Testimonial.jsx      # Auto-scrolling testimonials
│   │   │   ├── Plan.jsx             # Pricing section
│   │   │   ├── Footer.jsx           # Site footer
│   │   │   └── CreationItem.jsx     # Expandable creation card
│   │   └── pages/
│   │       ├── Home.jsx             # Public landing page
│   │       ├── Layout.jsx           # Protected route wrapper
│   │       ├── Dashboard.jsx        # User dashboard
│   │       ├── WriteArticle.jsx     # AI article generation
│   │       ├── BlogTitles.jsx       # AI blog title generation
│   │       ├── GenerateImages.jsx   # AI image generation
│   │       ├── RemoveBg.jsx         # Background removal
│   │       ├── RemoveObjects.jsx    # Object removal
│   │       ├── SummarizePdf.jsx     # PDF summarization
│   │       └── Community.jsx        # Public creations gallery
│   └── vite.config.js
│
├── server/                          # Backend (Express)
│   ├── Dockerfile                   # Single-stage: node server.js
│   ├── server.js                    # Express entry point
│   ├── configs/
│   │   ├── db.js                    # Neon DB connection
│   │   ├── cloudinary.js            # Cloudinary setup
│   │   └── multer.js                # File upload config
│   ├── middlewares/
│   │   └── auth.js                  # Clerk auth + plan checking
│   ├── controllers/
│   │   ├── aiControllers.js         # AI tool handlers
│   │   └── userController.js        # User creation handlers
│   └── routes/
│       ├── aiRouters.js             # AI route definitions
│       └── userRoutes.js            # User route definitions
```

---

## Getting Started

### Prerequisites

- Node.js >= 22.12.0
- npm or yarn
- Accounts for: Clerk, Google Gemini, ClipDrop, Cloudinary, Neon DB

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/saas-app.git
cd saas-app

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Environment Variables

**Client (`client/.env`)**

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

**Server (`server/.env`)**

```env
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLIPDROP_API_KEY=your_clipdrop_api_key
DATABASE_URL=your_neon_database_url
```

### Running Locally

```bash
# Start server (port 3000)
cd server
npm run dev

# Start client (port 5173) - in a new terminal
cd client
npm run dev
```

---

## API Endpoints

### AI Routes (`/api/ai`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ai/generate-article` | Generate article from topic + length |
| `POST` | `/api/ai/generate-blog-title` | Generate 5 blog titles from topic + tone |
| `POST` | `/api/ai/generate-image` | Generate image from prompt + style |
| `POST` | `/api/ai/remove-image-background` | Remove background from uploaded image |
| `POST` | `/api/ai/remove-image-object` | Remove named object from uploaded image |
| `POST` | `/api/ai/summarize-pdf` | Summarize uploaded PDF content |

### User Routes (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user/get-user-creations` | Get authenticated user's creations |
| `GET` | `/api/user/get-published-creations` | Get all public creations |
| `POST` | `/api/user/toggle-like-creation` | Like/unlike a creation |

---

## Database Schema

**Table: `creations`**

```sql
CREATE TABLE creations (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    prompt TEXT NOT NULL,
    content TEXT,
    type TEXT NOT NULL,          -- 'article', 'blog-title', 'image', 'text'
    publish BOOLEAN DEFAULT false,
    likes TEXT[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Note:** Usage tracking (free_usage, image_usage, etc.) is stored in Clerk's `privateMetadata`, not in the database.

---

## Authentication & Authorization

The app uses **Clerk** for complete auth management:

1. **Client-side:** `ClerkProvider` wraps the app; `SignInButton`, `SignUpButton`, `UserButton` handle UI; `useAuth()` provides `getToken()` for API calls
2. **Server-side:** `clerkMiddleware()` validates JWTs; custom `auth` middleware extracts userId and checks subscription plan
3. **Plan System:** Free users have per-feature usage limits; Premium users get unlimited access
4. **Protected Routes:** All `/ai/*` routes require authentication (both client and server-side)

---

## Deployment

### EC2 + Docker (Production)

Both client and server run as Docker containers on an AWS EC2 instance.

**Quick overview:**
- Client uses a multi-stage Dockerfile (build with Node, serve with `serve` on port 5173)
- Server uses a single-stage Dockerfile with `node server.js` on port 3000
- `docker-compose.yml` orchestrates both services

**CI/CD (GitHub Actions):**
On every push to `home-page` → lint → build → Docker build → SSH into EC2 → `docker compose up --build -d`

**Manual commands on EC2:**
```bash
cd ~/saas-app
docker compose up --build -d
```

### Vercel (Alternative)

- **Client:** Static SPA with `vercel.json` rewrites for client-side routing
- **Server:** Serverless functions using `@vercel/node` builder

```bash
# Deploy client
cd client && vercel deploy

# Deploy server
cd server && vercel deploy
```

---

## Docker Setup

Each service has its own `Dockerfile`:

- **Client:** Multi-stage build — Vite builds static files in a Node 22 stage, final stage uses `serve` to host on port 5173
- **Server:** Single-stage build — installs production deps only (`--omit=dev`), runs `node server.js` on port 3000

A root `.dockerignore` excludes `node_modules`, `.git`, and `.env` files from the build context.

---

## Key Technical Decisions

1. **Gemini via OpenAI SDK** - Uses OpenAI's SDK configured to hit Google's Gemini API endpoint, leveraging the OpenAI-compatible interface
2. **Cloudinary as AI Service** - Not just for hosting; uses Cloudinary's `background_removal` and `gen_remove` transformations for AI-powered image editing
3. **Usage Tracking in Clerk Metadata** - Stores usage counters in Clerk's `privateMetadata` instead of a separate database table
4. **Express 5** - Uses the latest major version with native async error handling
5. **Custom Neon DB Connection** - Implements raw HTTPS POST to Neon's SQL endpoint with tagged template literals for parameterized queries

---

## License

This project is open source and available under the [MIT License](LICENSE).

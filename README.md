# Blog App

A clean, modern blogging platform where you can create, read, edit, and delete posts. Built with React and styled with Tailwind CSS.

![React](https://img.shields.io/badge/React-19-blue) ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-teal)

---

## What Can You Do?

| Action | Description |
|--------|-------------|
| **Browse Posts** | Scroll through all blog posts in a nice card layout |
| **Read Full Posts** | Click any card to read the complete article |
| **Write New Posts** | Share your thoughts with title, content, author & category |
| **Edit Your Posts** | Made a typo? Update any post anytime |
| **Delete Posts** | Remove posts you no longer need |
| **Like Posts** | Show appreciation for content you enjoy |
| **Search & Filter** | Find posts by keyword or filter by category |
| **Dark Mode** | Easy on the eyes at night |

---

## Quick Start

Get up and running in under 2 minutes:

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm run dev

# 3. Open your browser
# → http://localhost:5173
```

That's it! The app comes with sample posts so you can start exploring right away.

---

## Project Structure (The Important Parts)

```
src/
├── components/          ← Reusable UI pieces
│   ├── blog/           ← BlogCard, BlogForm, SearchBar
│   ├── layout/         ← Header, Footer
│   └── ui/             ← Notifications, Icons
├── pages/              ← Full page views
│   ├── HomePage        ← Main feed with all posts
│   ├── PostDetailPage  ← Single post view
│   ├── CreatePostPage  ← Write a new post
│   └── EditPostPage    ← Modify existing post
├── store/              ← Redux state (posts, search, filters)
└── context/            ← Theme & Notifications
```

---

## How State Management Works

We use **two tools** for managing state, each for a different purpose:

### Redux → For Blog Data
All the core stuff lives here:
- All blog posts
- Likes count
- Search queries
- Category filters

*Why Redux?* It's great for complex data that changes often and needs to be accessed from many places.

### Context API → For UI Stuff  
Simple preferences that affect the whole app:
- Dark/Light theme toggle
- Toast notifications

*Why Context?* It's simpler and perfect for UI state that doesn't need Redux's power.

---

## Available Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check code quality |

---

## Deploy with Docker

If you prefer containers:

```bash
# Build and run
docker-compose up --build

# Access at http://localhost:3000
```
## Live Application URL

## Public URL:
[https://yellow-sea-0f3adae00.7.azurestaticapps.net](https://yellow-sea-0f3adae00.7.azurestaticapps.net)

---

---

## Deploy to the Cloud

### Azure Static Web Apps (Easiest)
1. Create a Static Web App in Azure Portal
2. Connect your GitHub repo
3. Set output location to `dist`
4. Done! Azure handles the rest with auto-deployments.
---

---
## ⚠️ Assumptions Made

* This project is built as part of **Module 2 Frontend assignment**
* The application is **single-user only** (no authentication system)
* All data is stored in **browser localStorage**
* No backend or database is used
* Data is **not shared across devices or browsers**
* Internet is only required for loading external images (if used)
* The app assumes a modern browser with JavaScript enabled
* State persistence depends on local browser storage (clearing cache will remove data)
---
### Quick Alternatives
```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy --prod
```

---

## Good to Know

- **No backend needed** — Posts are saved in your browser's localStorage
- **Single browser = single user** — No login system, data stays in your browser
- **Cover images** — Paste any image URL when creating posts
- **Works everywhere** — Responsive design from mobile to desktop

---

## Tech Used

- **React 19** — UI components
- **Redux Toolkit** — State management
- **React Router v7** — Page navigation
- **Tailwind CSS v4** — Styling
- **Vite** — Fast builds
- **Docker** — Container deployment

---

*Built as a React + Redux learning project.*

## 👨‍💻 Author

**[Sreyansh Srivastava]**

---

## 📌 Assignment Checklist

- [x] Display list of blog posts
- [x] View blog post details
- [x] Add a new blog post
- [x] Edit an existing blog post
- [x] Delete a blog post
- [x] Like the blog post
- [x] React for UI development
- [x] Redux for global state management
- [x] Context API for cross-cutting concerns
- [x] Tailwind CSS styling
- [x] Data maintained locally (localStorage)
- [x] Docker configuration
- [x] Deployment configuration (Azure Static Web Apps, Docker)
- [x] Complete README.md with:
  - [x] Local setup steps
  - [x] Redux vs Context usage explanation
  - [x] Deployment steps
  - [x] Public URL placeholder
  - [x] Assumptions made

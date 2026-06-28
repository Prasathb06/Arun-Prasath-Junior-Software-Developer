# 🚀 Arun Prasath B — Junior Software Developer Portfolio

A modern, high-performance portfolio with dark/light mode, admin panel, and MongoDB backend.

---

## 📁 Project Structure

```
portfolio/
├── frontend/        → React + Vite + Tailwind CSS
└── backend/         → Node.js + Express + MongoDB
```

---

## ⚡ Quick Start

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev        # Runs at http://localhost:5173
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Fill in your values
npm run dev             # Runs at http://localhost:5000
```

---

## 🔧 Environment Variables (backend/.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@youremail.com
ADMIN_PASSWORD=Admin@123

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your.gmail@gmail.com
MAIL_PASS=your_gmail_app_password    # Gmail App Password (not your login password)
MAIL_TO=arunprasath@email.com

FRONTEND_URL=http://localhost:5173
```

---

## 🛠️ Customization Checklist

### Replace Placeholders

- [ ] **Profile Photo** → Put your photo at `frontend/src/assets/profile.jpg` and uncomment the `<img>` in `HeroSection.jsx`
- [ ] **Resume PDF** → Put your resume at `frontend/public/resume.pdf`
- [ ] **GitHub link** → Search `yourusername` and replace with your GitHub username
- [ ] **LinkedIn link** → Search `yourusername` and replace with your LinkedIn username
- [ ] **Email** → Replace `arunprasath@email.com` with your actual email
- [ ] **College name** → Update `AboutSection.jsx`
- [ ] **Demo projects** → Update `ProjectsSection.jsx` with your real projects

---

## 🔐 Admin Panel Setup

### Step 1 — Create Admin Account (ONE TIME ONLY)

After starting the backend, run this once:

```bash
curl -X POST http://localhost:5000/api/admin/setup
```

This uses the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your `.env` to create the admin.

### Step 2 — Login

Visit: `http://localhost:5173/admin/login`

### Step 3 — Use Dashboard

- `/admin/dashboard` → Add/Edit/Delete projects & view contact messages

---

## 🚀 Deployment

### Frontend → Vercel

1. Push `frontend/` to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Framework: **Vite**
4. Add environment variable: `VITE_API_URL=https://your-render-api.onrender.com`

### Backend → Render

1. Push `backend/` to GitHub
2. Create **Web Service** on [render.com](https://render.com)
3. Build: `npm install`, Start: `npm start`
4. Add all environment variables from `.env.example`
5. After deploy, update `FRONTEND_URL` to your Vercel URL

### Database → MongoDB Atlas

1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Whitelist `0.0.0.0/0` in Network Access
3. Copy connection string to `MONGODB_URI`

---

## 📧 Gmail App Password Setup

1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords → Generate for "Mail"
4. Use the 16-character code as `MAIL_PASS`

---

## 🎨 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Email | Nodemailer |
| Deploy | Vercel + Render + Atlas |

---

## 📡 API Endpoints

```
GET    /api/health              → Server health check
GET    /api/projects            → Get all projects (public)
POST   /api/projects            → Add project (admin)
PUT    /api/projects/:id        → Edit project (admin)
DELETE /api/projects/:id        → Delete project (admin)
POST   /api/contact             → Submit contact form (public)
GET    /api/admin/messages      → View messages (admin)
POST   /api/admin/login         → Admin login
POST   /api/admin/setup         → Create admin (one-time)
```

---

Built with ❤️ by **Arun Prasath B**

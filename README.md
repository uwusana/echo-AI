<div align="center">

# 🎙️ EchoAI
### AI-Powered Meeting Intelligence Platform

Upload meeting recordings, automatically generate intelligent summaries, extract action items, identify key decisions, and gain actionable insights using AI.

---

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/Status-In%20Development-orange)

</div>

---

# 📌 Overview

EchoAI is a full-stack AI-powered meeting intelligence platform that helps teams organize, analyze, and extract meaningful insights from meeting recordings.

Instead of manually reviewing long recordings, users can upload audio or video meetings and receive AI-generated summaries, action items, key decisions, sentiment analysis, and productivity insights.

The project is currently under active development and is being built using the MERN stack with a scalable architecture for AI processing.

---

# ✨ Features

## Current

- Responsive Landing Page
- Modern SaaS Dashboard
- Meeting Management System
- Recording Upload Workflow
- Secure File Uploads
- Automatic Media Metadata Extraction
- Reusable Component Architecture
- Responsive Data Tables
- Pagination
- Meeting Details Page
- RESTful Backend APIs
- MongoDB Integration
- Processing Status Workflow
- Clean Empty & Loading States

---

## Coming Soon

- AI Meeting Summaries
- Automatic Speech-to-Text Transcription
- Google Gemini Integration
- Whisper-based Language Detection
- Action Item Extraction
- Key Decision Detection
- Sentiment Analysis
- Productivity Scoring
- Smart Meeting Search
- Google Meet Integration
- Authentication
- Cloud Storage

---

# 🖼️ Screenshots

> Screenshots and demo GIFs will be added soon.

---

# 🏗️ Tech Stack

## Frontend

- React.js
- Tailwind CSS v4
- Shadcn/UI
- Framer Motion
- React Router
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer

## AI (Planned)

- Google Gemini
- Whisper
- Faster-Whisper

---

# 📂 Project Structure

```
EchoAI
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── lib
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── uploads
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/uwusana/echo-AI.git

cd echo-AI
```

---

## Install Frontend

```bash
cd client
npm install
npm run dev
```

---

## Install Backend

```bash
cd server
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_api_key
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /health | Server Health Check |
| GET | /api/meetings | Fetch All Meetings |
| GET | /api/meetings/:id | Fetch Single Meeting |
| POST | /api/meetings | Upload Meeting |
| DELETE | /api/meetings/:id | Delete Meeting |

---

# 🧠 Architecture

```
Upload Recording
        │
        ▼
Store Recording
        │
        ▼
Extract Metadata
        │
        ▼
Save Meeting
        │
        ▼
Processing Queue
        │
        ▼
Whisper (Planned)
        │
        ▼
Gemini (Planned)
        │
        ▼
Meeting Summary
Action Items
Key Decisions
Insights
```

---

# 🎯 Goals

EchoAI aims to become an end-to-end AI meeting assistant capable of:

- Summarizing meetings
- Tracking tasks
- Detecting decisions
- Measuring meeting effectiveness
- Supporting multiple meeting platforms

---

# 📈 Future Improvements

- Google Meet Bot
- Zoom Integration
- Microsoft Teams Support
- Real-time Meeting Assistant
- Live Transcription
- Team Collaboration
- Calendar Integration
- Email Summaries
- Meeting Analytics Dashboard
- Role-Based Authentication

---

# 🤝 Contributing

Contributions, suggestions, and feedback are always welcome.

Feel free to fork the repository and open a Pull Request.

---

# 👩‍💻 Author

**Upasana Mukherjee**

GitHub: https://github.com/uwusana

LinkedIn: https://www.linkedin.com/in/upasana-mukherjee05/

---

⭐ If you found this project interesting, consider giving it a star!

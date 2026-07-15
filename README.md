# StadiumOps AI 🏟️🤖

**A GenAI-powered Match Operations Command Center for FIFA World Cup 2026**

![StadiumOps AI](https://Madhavan23-byte.github.io/fifa_Ai_Model/favicon.svg)

## Overview
StadiumOps AI is an intelligent, real-time operations platform designed to help organizers, volunteers, and fans make smarter decisions during major football tournaments. Built specifically for the scale of FIFA World Cup 2026.

## Features
- **Organizers (Command Center):** Real-time crowd intelligence, predictive risk analysis, and an AI Operations Copilot that serves as a live decision-support agent.
- **Volunteers (On-the-ground):** Smart dashboards to rapidly triage incidents and execute streamlined emergency workflows.
- **Fans (Experience):** A context-aware, multilingual AI assistant for live navigation, seat finding, and facility routing.

## Technology Stack
- **Frontend:** React, Vite, Tailwind CSS (Glassmorphism UI)
- **Backend:** FastAPI (Python), Motor (Async MongoDB)
- **AI Engine:** Google Gemini 2.5 Flash
- **Database:** MongoDB Atlas

## Architecture Highlights
- **Decoupled Architecture:** Strict separation between the Vite SPA frontend and the FastAPI backend.
- **Resilient Fallbacks:** The backend gracefully boots and processes AI requests even if the MongoDB connection drops, ensuring zero downtime during match day.
- **Strong Typing:** Pydantic models enforce strict schema validation for all API inputs and Gemini AI structured outputs.

## Setup Instructions

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file in the `backend/` directory:
```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_atlas_connection_string
CORS_ORIGINS=http://localhost:5173
```
Run the backend:
```bash
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:8000
```
Run the frontend:
```bash
npm run dev
```

## Deployment

### Frontend (GitHub Pages)
The frontend is pre-configured for GitHub Pages. Simply run:
```bash
cd frontend
npm run deploy
```

### Backend (Render)
A `render.yaml` file is included in the root directory for 1-click deployment on Render.
1. Connect this repository to Render.
2. Select "Blueprint".
3. Add your `GEMINI_API_KEY` and `MONGODB_URI` environment variables.

## License
MIT License

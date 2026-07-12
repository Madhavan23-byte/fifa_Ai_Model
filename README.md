# StadiumOps AI

> **A GenAI-powered Match Operations & Fan Experience Platform for FIFA World Cup 2026**

![StadiumOps AI Theme](https://img.shields.io/badge/Hackathon-Prompt_Wars_Virtual_Challenge_4-00a854?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In_Development-fbbf24?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📖 Short Description
**StadiumOps AI** is an intelligent Match Operations Command Center built for the operational needs of FIFA World Cup 2026 stadiums. It leverages Google Gemini AI to help organizers, volunteers, and fans through AI-powered navigation, multilingual assistance, crowd intelligence, emergency support, and operational decision support.

---

## 🛑 Problem Statement
Managing mega sporting events like the World Cup requires seamless coordination across thousands of staff members and tens of thousands of fans in real-time. Traditional stadium management systems are highly fragmented, leading to communication bottlenecks, slow emergency response times, and poor fan experiences due to language barriers and complex stadium layouts.

## 💡 Solution Overview
StadiumOps AI provides a unified, AI-driven platform tailored to three core personas: **Organizers, Volunteers, and Fans**. By deeply integrating Generative AI (Google Gemini) into the stadium's operational workflows, the platform provides predictive crowd intelligence, intelligent task delegation, and contextual multilingual fan support, ensuring a safe and premium match-day experience.

---

## ✨ Key Features
- **Role-Based Workspaces**: Tailored glassmorphism dashboards for Fans, Volunteers, and Organizers.
- **Operations Copilot (GenAI)**: An AI decision-support agent that analyzes live stadium situations, prioritizes risks, and recommends operational actions to Organizers.
- **AI Fan Assistant (GenAI)**: A multilingual, context-aware chatbot helping fans navigate the stadium, locate seats, and get live match information.
- **Crowd Intelligence**: Real-time monitoring and analytics for gate wait times, parking capacities, and crowd density.
- **Emergency & Safety**: Incident reporting, emergency contact routing, and stadium-wide broadcast alerts.
- **Stadium Navigation**: Wayfinding assistance for facilities, food stalls, and points of interest.

---

## 🛠 Technology Stack

### Frontend
- **Framework:** React + Vite
- **Routing:** React Router
- **Styling:** Tailwind CSS (Vanilla CSS for Glassmorphism & custom animations)
- **Icons:** Lucide React

### Backend
- **Framework:** FastAPI (Python)
- **AI Integration:** Google Gemini API (`google-genai` SDK)
- **Database:** MongoDB
- **Validation:** Pydantic

### Deployment
- **Frontend:** Vercel
- **Backend:** Render

---

## 🏗 Project Architecture
The project utilizes a decoupled Client-Server architecture:
1. **Frontend SPA**: A highly responsive, single-page application built with React and Tailwind, featuring a premium dark-theme UI. It communicates with the backend via Axios.
2. **FastAPI Backend**: A modular Python API serving robust endpoints for navigation, emergency, match data, and AI interactions.
3. **AI Service Layer**: Google Gemini acts as the core reasoning engine, implemented as a singleton service in the backend to provide structured JSON recommendations (Operations Copilot) and conversational assistance (Fan Assistant).

---

## 📂 Folder Structure (Brief)

```text
stadiumops-ai/
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI application entry point
│   │   ├── config.py          # Environment & settings configuration
│   │   ├── routes/            # API endpoints (copilot, emergency, navigation, etc.)
│   │   └── services/          # Business logic & Gemini AI integration
│   ├── requirements.txt       # Python dependencies
│   └── .env.example           # Environment variables template
│
└── frontend/
    ├── src/
    │   ├── components/        # Reusable UI (Buttons, Cards, AI ChatBubbles)
    │   ├── features/          # Domain-specific components (Dashboard Widgets)
    │   ├── pages/             # Route-level components
    │   ├── router/            # React Router configuration
    │   ├── services/          # Axios API clients
    │   ├── store/             # React Context (Auth/Role Management)
    │   └── styles/            # Global CSS & Tailwind layers
    ├── tailwind.config.js     # Tailwind design tokens
    └── vite.config.js         # Vite bundler configuration
```

---

## 🚀 Installation Steps

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- Google Gemini API Key
- MongoDB URI

### 1. Clone the repository
```bash
git clone https://github.com/your-username/stadiumops-ai.git
cd stadiumops-ai
```

### 2. Setup the Backend
```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY and MONGODB_URI

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```
*The backend API and Swagger Docs will be available at `http://localhost:8000/docs`*

### 3. Setup the Frontend
```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
*The application will be available at `http://localhost:5173`*

---

## 🔮 Future Enhancements
- **IoT Sensor Integration**: Live ingestion of data from physical turnstiles and thermal cameras for real-time crowd heatmaps.
- **Digital Ticketing Verification**: In-app QR code verification for seamless stadium entry.
- **AR Wayfinding**: Augmented Reality overlays to guide fans directly to their seats using their smartphone cameras.
- **Predictive Restocking**: AI predicting when food & beverage stalls will run out of stock based on match events and crowd flow.

---

## 👥 Contributors
- **[Your Name/Team Name]** - *Lead Engineer / Architect*

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Disclaimer: This is a hackathon project built for Prompt Wars Virtual - Challenge 4. It is not an official FIFA application, and uses no official FIFA or EA FC copyrighted assets.*

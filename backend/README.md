# StadiumOps AI — Backend

FastAPI + Google Gemini backend for the StadiumOps AI platform.

## Quick Start

```bash
# 1. Create virtual environment
python -m venv venv

# Windows PowerShell
venv\Scripts\Activate.ps1

# macOS / Linux
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set up environment variables
copy .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 4. Run the development server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/health/version` | Version info |
| POST | `/api/v1/copilot/chat` | Operations Copilot (Gemini AI) |
| POST | `/api/v1/navigation/directions` | Stadium wayfinding |
| GET | `/api/v1/navigation/pois` | Points of interest |
| GET | `/api/v1/match/live` | Live match data |
| GET | `/api/v1/match/{id}/summary` | AI match summary |
| POST | `/api/v1/emergency/report` | Report an incident |
| GET | `/api/v1/emergency/contacts` | Emergency contacts |

## Project Structure

```
backend/
├── app/
│   ├── main.py          # FastAPI app, CORS, router registration
│   ├── config.py        # Pydantic-settings (reads .env)
│   ├── routes/
│   │   ├── health.py
│   │   ├── copilot.py   # Gemini-powered decision support
│   │   ├── navigation.py
│   │   ├── match.py
│   │   └── emergency.py
│   └── services/
│       └── gemini_service.py  # Singleton Gemini model wrapper
├── requirements.txt
├── .env.example
└── README.md
```

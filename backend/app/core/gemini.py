import logging
from typing import Dict, Any, Optional
from google import genai
from google.genai.errors import APIError

from app.config import get_settings

logger = logging.getLogger(__name__)

# Singleton instance of the Gemini Client
_gemini_client: Optional[genai.Client] = None

def get_gemini_client() -> Optional[genai.Client]:
    """
    Returns the singleton instance of the Gemini client.
    Initializes the client on the first call if the API key is available.
    """
    global _gemini_client
    if _gemini_client is not None:
        return _gemini_client

    settings = get_settings()
    if not settings.gemini_api_key:
        logger.warning("Gemini API key is not configured. Client initialization skipped.")
        return None

    try:
        # Initialize the official Google GenAI client
        _gemini_client = genai.Client(api_key=settings.gemini_api_key)
        return _gemini_client
    except Exception as e:
        logger.error(f"Failed to initialize Gemini Client: {str(e)}")
        return None

def is_gemini_available() -> Dict[str, Any]:
    """
    Lightweight utility to validate Gemini connection and configuration status.
    Returns a status dictionary without crashing the application on failure.
    """
    settings = get_settings()
    
    if not settings.gemini_api_key:
        return {
            "available": False,
            "reason": "API key missing in environment configuration."
        }
        
    client = get_gemini_client()
    if not client:
        return {
            "available": False,
            "reason": "Client initialization failed."
        }
        
    try:
        # Perform a lightweight validation by listing models or making a tiny request
        # Note: the new google-genai SDK handles models via client.models
        models = list(client.models.list())
        if not models:
             return {
                 "available": False,
                 "reason": "Successfully connected but no models were returned."
             }
        
        return {
            "available": True,
            "reason": "Connected and authenticated successfully."
        }
    except APIError as e:
        # Handle authentication/invalid key errors gracefully
        return {
            "available": False,
            "reason": f"API Error: {str(e)}"
        }
    except Exception as e:
        # Handle generic network or SDK errors
        return {
            "available": False,
            "reason": f"Unexpected network or SDK error: {str(e)}"
        }

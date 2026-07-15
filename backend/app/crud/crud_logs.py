import logging
from datetime import datetime, timezone
from app.core.db import (
    get_incident_reports_collection,
    get_volunteer_logs_collection,
    get_ai_query_logs_collection
)

logger = logging.getLogger(__name__)

async def log_ai_query(role: str, query: str, success: bool, priority: str = None) -> None:
    collection = get_ai_query_logs_collection()
    if collection is None:
        return
    
    doc = {
        "timestamp": datetime.now(timezone.utc),
        "role": role,
        "query": query,
        "success": success,
        "priority": priority
    }
    
    try:
        await collection.insert_one(doc)
    except Exception as e:
        logger.warning(f"Failed to log AI query to MongoDB: {e}")

async def create_incident_report(report_data: dict) -> None:
    collection = get_incident_reports_collection()
    if collection is None:
        return
    try:
        report_data["timestamp"] = datetime.now(timezone.utc)
        await collection.insert_one(report_data)
    except Exception as e:
        logger.warning(f"Failed to create incident report in MongoDB: {e}")

async def create_volunteer_log(log_data: dict) -> None:
    collection = get_volunteer_logs_collection()
    if collection is None:
        return
    try:
        log_data["timestamp"] = datetime.now(timezone.utc)
        await collection.insert_one(log_data)
    except Exception as e:
        logger.warning(f"Failed to create volunteer log in MongoDB: {e}")

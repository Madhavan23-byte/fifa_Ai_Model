import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import get_settings

logger = logging.getLogger(__name__)

class DatabaseManager:
    client: AsyncIOMotorClient = None
    db = None

db_manager = DatabaseManager()

async def connect_to_mongo():
    """Create a MongoDB connection."""
    settings = get_settings()
    logger.info("Connecting to MongoDB...")
    try:
        # Prevent blocking if the server is unreachable
        db_manager.client = AsyncIOMotorClient(
            settings.mongodb_uri,
            serverSelectionTimeoutMS=2000
        )
        # Attempt to fetch server info to verify connection
        await db_manager.client.server_info()
        # The database name is typically extracted from the URI or explicitly set.
        # Based on config.py, the URI is something like mongodb://localhost:27017/stadiumops
        # get_database() without args defaults to the DB in the URI
        db_manager.db = db_manager.client.get_database() 
        logger.info("Successfully connected to MongoDB.")
    except Exception as e:
        logger.warning(f"Could not connect to MongoDB: {e}")
        logger.warning("The application will continue running without database capabilities.")
        db_manager.client = None
        db_manager.db = None

async def close_mongo_connection():
    """Close the MongoDB connection."""
    if db_manager.client:
        logger.info("Closing MongoDB connection...")
        db_manager.client.close()
        logger.info("MongoDB connection closed.")

def get_db():
    """Helper to get the current database instance."""
    return db_manager.db

def get_collection(collection_name: str):
    """Helper to get a specific collection."""
    db = get_db()
    if db is not None:
        return db[collection_name]
    return None

# Collection helpers (preparing for future use)
def get_incident_reports_collection():
    return get_collection("incident_reports")

def get_volunteer_logs_collection():
    return get_collection("volunteer_logs")

def get_ai_query_logs_collection():
    return get_collection("ai_query_logs")

"""
Opens the connection to the database and provides a session for database operations. 
It also defines the base class for the ORM models.
"""

# The os is needed to know information about the computer eg where the folder is in the hard drive, etc.
import os

# sqlachemy needs to create the connection to the database engine, and to create the session and a base class for database tables.
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# load environment variables from .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL") or "sqlite:///./test.db"  
# Default to SQLite if .env is missing or DATABASE_URL is not set


# Create the connection to the database engine
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

# Create a session - handshake between the application and the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Every table we create eg Member, Contribution will know that they are part of the same database and will be able to interact with each other.
Base = declarative_base()# import in all models. 

# Creates a connection, then gives a user a session to interact with the database. It ensures that the session is properly closed after use, preventing potential memory leaks or connection issues.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
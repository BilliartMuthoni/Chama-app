from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.routers import auth
from app.routers import contribution, loan, notification, role

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Chama API",
    description="Backend API for Chama investment group management",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(contribution.router)
app.include_router(loan.router)
app.include_router(notification.router)
app.include_router(role.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Chama API is running"}
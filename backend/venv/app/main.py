from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import text_utils, templates, translate

app = FastAPI(
    title="UrduMate AI API",
    description="Backend services for text utilities and templates.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(text_utils.router, prefix="/api/text", tags=["Text Utilities"])
app.include_router(templates.router, prefix="/api/templates", tags=["Templates"])
app.include_router(translate.router, prefix="/api/translate", tags=["Translation"])

@app.get("/", tags=["System"])
def root():
    return {
        "status": "online",
        "message": "Welcome to UrduMate AI Backend API",
        "documentation": "/docs"
    }

@app.get("/health", tags=["System"])
def health_check():
    return {"status": "ok", "message": "UrduMate AI Backend is healthy."}
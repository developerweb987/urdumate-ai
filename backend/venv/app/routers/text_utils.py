from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import re

router = APIRouter()

class TextRequest(BaseModel):
    text: str

class TextResponse(BaseModel):
    original_length: int
    cleaned_text: str
    word_count: int
    char_count: int

@router.post("/clean", response_model=TextResponse)
def clean_text(request: TextRequest):
    if len(request.text) > 10000:
        raise HTTPException(status_code=400, detail="Text exceeds maximum allowed length (10,000 chars).")
    
    text = request.text
    # Remove duplicate blank lines
    text = re.sub(r'\n\s*\n', '\n\n', text)
    # Remove extra spaces
    text = re.sub(r'[ \t]+', ' ', text).strip()
    
    words = len(text.split()) if text else 0
    chars = len(text)
    
    return {
        "original_length": len(request.text),
        "cleaned_text": text,
        "word_count": words,
        "char_count": chars
    }
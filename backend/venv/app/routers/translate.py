from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import urllib.request
import urllib.parse
import json

router = APIRouter()

class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

class TranslationResponse(BaseModel):
    translated_text: str
    source_lang: str
    target_lang: str

def gtx_translate(text: str, sl: str, tl: str) -> str:
    """Fast, direct Google GTX translation without scraping rate-limits."""
    encoded_text = urllib.parse.quote(text)
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={sl}&tl={tl}&dt=t&q={encoded_text}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=8) as response:
        data = json.loads(response.read().decode("utf-8"))
        if data and data[0]:
            return "".join([part[0] for part in data[0] if part and part[0]])
    return ""

@router.post("/", response_model=TranslationResponse)
def translate_text(request: TranslationRequest):
    raw_text = request.text.strip()
    if not raw_text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    if len(raw_text) > 5000:
        raise HTTPException(status_code=400, detail="Text exceeds limit of 5,000 characters.")

    # Standardize language codes ('en' for English, 'ur' for Urdu)
    s_lang = "en" if "eng" in request.source_lang.lower() or request.source_lang == "en" else "ur"
    t_lang = "ur" if "urd" in request.target_lang.lower() or request.target_lang == "ur" else "en"

    # Step 1: Direct Fast Engine (GTX)
    try:
        translated = gtx_translate(raw_text, s_lang, t_lang)
        if translated:
            return {
                "translated_text": translated,
                "source_lang": s_lang,
                "target_lang": t_lang
            }
    except Exception as e:
        print(f"Primary GTX translation error: {e}")

    # Step 2: Fallback to MyMemory if Google is blocked
    try:
        from deep_translator import MyMemoryTranslator
        fallback_translated = MyMemoryTranslator(source=s_lang, target=t_lang).translate(raw_text)
        if fallback_translated:
            return {
                "translated_text": fallback_translated,
                "source_lang": s_lang,
                "target_lang": t_lang
            }
    except Exception as e:
        print(f"Fallback translation error: {e}")

    raise HTTPException(status_code=503, detail="Translation service temporarily unavailable. Please try again.")
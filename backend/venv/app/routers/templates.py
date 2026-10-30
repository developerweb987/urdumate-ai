from fastapi import APIRouter

router = APIRouter()

TEMPLATES = [
    {
        "id": "sick_leave",
        "category": "Office",
        "title": "Sick Leave Application",
        "content": "Dear [Manager Name],\n\nI am writing to inform you that I am feeling unwell and will be unable to attend work today, [Date]. I will keep you updated on my situation.\n\nBest regards,\n[Your Name]"
    },
    {
        "id": "job_application",
        "category": "Career",
        "title": "Standard Job Application",
        "content": "Dear Hiring Manager,\n\nI am writing to express my interest in the [Job Title] position at [Company Name]. With my background in [Your Field], I am confident in my ability to contribute effectively to your team.\n\nPlease find my resume attached.\n\nSincerely,\n[Your Name]"
    }
]

@router.get("/")
def get_templates():
    return {"templates": TEMPLATES}
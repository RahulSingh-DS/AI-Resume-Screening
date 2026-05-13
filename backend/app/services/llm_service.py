from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)


def local_feedback(score, matched_skills, missing_skills):
    return f"""
Candidate Summary:
Fallback local evaluation.

Strengths:
- Matched skills: {", ".join(matched_skills[:5]) if matched_skills else "Basic alignment"}

Weaknesses:
- Missing skills: {", ".join(missing_skills[:5]) if missing_skills else "Minimal gaps"}

Hiring Recommendation:
{"Shortlist" if score >= 75 else "Review" if score >= 50 else "Reject"}

Interview Questions:
1. Explain your strongest technical project.
2. Which ML models have you worked with?
3. How would you solve a real-world data problem?
"""


def generate_feedback(
    resume_text,
    job_description,
    match_score,
    matched_skills,
    missing_skills
):
    try:
        prompt = f"""
You are a senior ATS recruiter and HR evaluator.

Analyze this candidate professionally.

Resume:
{resume_text[:3500]}

Job Description:
{job_description[:1500]}

Match Score: {match_score}%

Matched Skills:
{matched_skills}

Missing Skills:
{missing_skills}

Return ONLY in this format:

Candidate Summary:
<short summary>

Strengths:
- point
- point
- point

Weaknesses:
- point
- point
- point

Hiring Recommendation:
Shortlist / Review / Reject

Interview Questions:
1.
2.
3.
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert HR recruiter and ATS evaluator."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.4,
            max_tokens=900
        )

        return response.choices[0].message.content

    except Exception as e:
        print("Groq error:", e)
        return local_feedback(match_score, matched_skills, missing_skills)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

model = None

COMMON_SKILLS = [
    "python",
    "sql",
    "machine learning",
    "deep learning",
    "nlp",
    "fastapi",
    "flask",
    "django",
    "react",
    "next.js",
    "docker",
    "aws",
    "kubernetes",
    "pandas",
    "numpy",
    "scikit-learn",
    "tensorflow",
    "pytorch",
    "power bi",
    "tableau",
    "excel",
    "mongodb",
    "postgresql",
]


def get_model():
    global model

    if model is None:
        from sentence_transformers import SentenceTransformer
        model = SentenceTransformer("all-MiniLM-L6-v2")

    return model


def calculate_tfidf_score(resume_text, jd_text):
    docs = [resume_text, jd_text]

    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform(docs)

    score = cosine_similarity(matrix[0:1], matrix[1:2])[0][0]
    return score * 100


def calculate_embedding_score(resume_text, jd_text):
    model = get_model()

    embeddings = model.encode([resume_text, jd_text])

    score = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
    return score * 100


def extract_skills(text):
    text = text.lower()
    found = []

    for skill in COMMON_SKILLS:
        if skill in text:
            found.append(skill)

    return found


def analyze_resume(resume_text, jd_text):
    tfidf_score = calculate_tfidf_score(resume_text, jd_text)
    embedding_score = calculate_embedding_score(resume_text, jd_text)

    final_score = (0.3 * tfidf_score) + (0.7 * embedding_score)

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    matched_skills = list(set(resume_skills) & set(jd_skills))
    missing_skills = list(set(jd_skills) - set(resume_skills))

    return {
        "match_score": round(final_score, 2),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
    }
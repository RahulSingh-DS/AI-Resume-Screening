import pdfplumber
import fitz
import docx2txt

def parse_pdf(file_path: str):
    text = ""

    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
    except:
        pass

    if not text:
        doc = fitz.open(file_path)
        for page in doc:
            text += page.get_text()

    return text


def parse_docx(file_path: str):
    return docx2txt.process(file_path)
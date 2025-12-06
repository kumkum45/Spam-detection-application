import joblib
from pathlib import Path
from models.phishing_features import extract_phishing_features

# Load model
phishing_model_path = Path("models/phishing_model.pkl")
if not phishing_model_path.exists():
    raise RuntimeError("Phishing model not found. Please place it in /models.")

phishing_model = joblib.load(phishing_model_path)

# Threshold for detecting phishing
PHISHING_THRESHOLD = 0.7  # adjust based on your validation

def is_phishing_message(text: str):
    """
    Only run phishing detection if the text looks like a URL or email.
    Otherwise, return False immediately.
    """
    # Quick check: if no URL-like pattern and no email, return False
    if not ("http" in text or "." in text or "@" in text):
        return False, 0.0

    X = extract_phishing_features(text)

    # Reorder columns to match model
    try:
        X = X[phishing_model.feature_names_in_]
    except KeyError as e:
        raise RuntimeError(f"Feature columns do not match model: {e}")

    proba = phishing_model.predict_proba(X)[0][1]
    is_phishing = proba >= PHISHING_THRESHOLD

    return is_phishing, float(proba)


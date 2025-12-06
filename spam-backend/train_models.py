# train_models.py
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import joblib
from pathlib import Path
import re

# Paths
DATA_PATH = Path("data/spam.csv")
MODELS_DIR = Path("models")
MODELS_DIR.mkdir(exist_ok=True)
MODEL_PATH = MODELS_DIR / "spam_model.pkl"
VECTORIZER_PATH = MODELS_DIR / "vectorizer.pkl"

print("📥 Loading dataset...")
df = pd.read_csv(DATA_PATH)

# --- Text Cleaning Function ---
def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+|https\S+", "", text)  # remove links
    text = re.sub(r"[^a-z\s]", "", text)  # keep only alphabets
    text = re.sub(r"\s+", " ", text).strip()  # remove extra spaces
    return text

print("🧹 Cleaning text...")
df["message"] = df["message"].apply(clean_text)

# --- Train/Test Split ---
X_train, X_test, y_train, y_test = train_test_split(
    df["message"], df["label"], test_size=0.2, random_state=42, stratify=df["label"]
)

# --- Vectorization ---
print("🔢 Converting text to TF-IDF features...")
vectorizer = TfidfVectorizer(max_features=3000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# --- Model Training ---
print("🤖 Training Logistic Regression model...")
model = LogisticRegression(max_iter=1000)
model.fit(X_train_vec, y_train)

# --- Evaluation ---
y_pred = model.predict(X_test_vec)
print("\n📊 Model Evaluation:")
print(classification_report(y_test, y_pred))
print(f"✅ Accuracy: {accuracy_score(y_test, y_pred):.4f}")

# --- Save Model & Vectorizer ---
print(f"💾 Saving model to {MODEL_PATH}")
joblib.dump(model, MODEL_PATH)

print(f"💾 Saving vectorizer to {VECTORIZER_PATH}")
joblib.dump(vectorizer, VECTORIZER_PATH)

print("🎉 Training complete!")

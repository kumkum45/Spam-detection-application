import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib
from pathlib import Path

DATA_PATH = Path("data/phishing.csv")
MODEL_PATH = Path("models/phishing_model.pkl")
MODEL_PATH.parent.mkdir(exist_ok=True)

print(f"Loading phishing dataset from {DATA_PATH}...")
df = pd.read_csv(DATA_PATH)

print(f"Dataset shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")

# Drop unnecessary 'Index' column if present
if "Index" in df.columns:
    df = df.drop(columns=["Index"])

# Ensure label column is consistent
if "class" in df.columns:
    df.rename(columns={"class": "label"}, inplace=True)
elif "Result" in df.columns:
    df.rename(columns={"Result": "label"}, inplace=True)
else:
    raise ValueError("Dataset must contain a 'class' or 'Result' column for labels.")

# Features = all numeric columns except label
X = df.drop(columns=["label"])
y = df["label"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train Logistic Regression
print("Training Logistic Regression model...")
model = LogisticRegression(max_iter=1000, solver="liblinear")
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model trained. Accuracy: {accuracy:.4f}")

# Save model
joblib.dump(model, MODEL_PATH)
print(f"✅ Model saved to {MODEL_PATH}")

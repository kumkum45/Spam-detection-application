import pandas as pd
import zipfile, io, requests
from pathlib import Path

DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

print("Downloading SMS Spam Collection dataset from UCI...")
url = "https://archive.ics.uci.edu/ml/machine-learning-databases/00228/smsspamcollection.zip"
r = requests.get(url)
z = zipfile.ZipFile(io.BytesIO(r.content))
z.extractall(DATA_DIR)

# The file is named "SMSSpamCollection"
df = pd.read_csv(DATA_DIR / "SMSSpamCollection", sep="\t", names=["label", "message"])
df["label"] = df["label"].map({"ham": 0, "spam": 1})
df.to_csv(DATA_DIR / "spam.csv", index=False)
print(f"Saved {len(df)} rows to {DATA_DIR / 'spam.csv'}")
print(df.head())

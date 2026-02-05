import os, json
import numpy as np
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, roc_auc_score, average_precision_score,
    confusion_matrix
)

# --- import your functions ---
from feature import normalize_url, extract_url_features  # FAST URL-only

# -----------------------------
# Config
# -----------------------------
CSV_PATH = "URL_dataset.csv"   # change if needed
TEST_SIZE = 0.2
RANDOM_STATE = 42

# Choose thresholds you want to save for deployment
RF_THRESHOLD = 0.50
LR_THRESHOLD = 0.50

# -----------------------------
# Helpers
# -----------------------------
def evaluate(model, X_test, y_test, name, threshold=0.5):
    proba = model.predict_proba(X_test)[:, 1]
    pred = (proba >= threshold).astype(int)

    acc = accuracy_score(y_test, pred)
    prec = precision_score(y_test, pred, zero_division=0)
    rec = recall_score(y_test, pred, zero_division=0)
    f1 = f1_score(y_test, pred, zero_division=0)
    roc = roc_auc_score(y_test, proba)
    ap = average_precision_score(y_test, proba)
    cm = confusion_matrix(y_test, pred)

    print(f"\n=== {name} (thr={threshold}) ===")
    print(f"Accuracy:  {acc:.4f}")
    print(f"Precision: {prec:.4f}")
    print(f"Recall:    {rec:.4f}")
    print(f"F1:        {f1:.4f}")
    print(f"ROC-AUC:   {roc:.4f}")
    print(f"PR-AUC:    {ap:.4f}")
    print("Confusion matrix:\n", cm)


def threshold_sweep(model, X, y, name, thresholds=None):
    if thresholds is None:
        thresholds = np.linspace(0.05, 0.95, 19)

    print(f"\n=== Threshold sweep: {name} ===")
    proba = model.predict_proba(X)[:, 1]
    for t in thresholds:
        pred = (proba >= t).astype(int)
        prec = precision_score(y, pred, zero_division=0)
        rec = recall_score(y, pred, zero_division=0)
        f1 = f1_score(y, pred, zero_division=0)
        print(f"t={t:.2f} | prec={prec:.3f} rec={rec:.3f} f1={f1:.3f}")


# -----------------------------
# 1) Load dataset
# -----------------------------
df = pd.read_csv(CSV_PATH)  # columns: url, type
df["label"] = (df["type"].astype(str).str.lower() == "phishing").astype(int)

# -----------------------------
# 2) Feature extraction (FAST)
# -----------------------------
print("Extracting features...")
feature_rows = df["url"].astype(str).map(lambda u: extract_url_features(normalize_url(u)))
feat_df = pd.DataFrame(list(feature_rows))
feat_df["label"] = df["label"].values
feat_df["url"] = df["url"].astype(str).values  # optional debug

# -----------------------------
# 3) X/y
# -----------------------------
X = feat_df.drop(columns=["label", "url"], errors="ignore")
y = feat_df["label"]

# Save raw schema (used by predict.py to align columns)
os.makedirs("models", exist_ok=True)
with open("models/raw_feature_columns.json", "w") as f:
    json.dump(list(X.columns), f, indent=2)

# -----------------------------
# 4) Preprocess (all numeric)
# -----------------------------
# If you later add categorical columns, they’ll be handled automatically.
possible_cats = ["registrar", "ssl_issuer"]
categorical = [c for c in possible_cats if c in X.columns]
numerical = [c for c in X.columns if c not in categorical]

# Fill missing values
if categorical:
    X[categorical] = X[categorical].fillna("unknown")
X[numerical] = X[numerical].fillna(0)

preprocess = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore", min_frequency=10), categorical),
        ("num", "passthrough", numerical),
    ],
    remainder="drop"
)

# -----------------------------
# 5) Train/test split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
    stratify=y
)

# -----------------------------
# 6) Models
# -----------------------------
rf_pipeline = Pipeline(steps=[
    ("preprocess", preprocess),
    ("classifier", RandomForestClassifier(
        n_estimators=400,
        random_state=RANDOM_STATE,
        n_jobs=-1,
        class_weight="balanced_subsample",
        min_samples_leaf=2
    ))
])

lr_pipeline = Pipeline(steps=[
    ("preprocess", preprocess),
    ("classifier", LogisticRegression(
        max_iter=2000,
        class_weight="balanced"
    ))
])

# -----------------------------
# 7) Train + evaluate
# -----------------------------
rf_pipeline.fit(X_train, y_train)
evaluate(rf_pipeline, X_test, y_test, "RandomForest", threshold=0.5)
threshold_sweep(rf_pipeline, X_test, y_test, "RandomForest")

lr_pipeline.fit(X_train, y_train)
evaluate(lr_pipeline, X_test, y_test, "LogisticRegression", threshold=0.5)
threshold_sweep(lr_pipeline, X_test, y_test, "LogisticRegression")

# -----------------------------
# 8) Save bundles (model + threshold)
# -----------------------------
joblib.dump(
    {"model": rf_pipeline, "threshold": RF_THRESHOLD},
    "models/phishing_rf_with_threshold.pkl"
)
print(f"\nSaved: models/phishing_rf_with_threshold.pkl (thr={RF_THRESHOLD})")

joblib.dump(
    {"model": lr_pipeline, "threshold": LR_THRESHOLD},
    "models/phishing_lr_with_threshold.pkl"
)
print(f"Saved: models/phishing_lr_with_threshold.pkl (thr={LR_THRESHOLD})")

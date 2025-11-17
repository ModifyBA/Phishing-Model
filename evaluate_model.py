import pandas as pd
import joblib
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report

# Load dataset and model
df = pd.read_csv("phishing_features_dataset.csv")
model = joblib.load("phishing_detector_model.pkl")

# Prepare the data
X = df.drop(["label", "url"], axis=1)
y = df["label"]

# Predict using the trained model
pred = model.predict(X)

# Compute metrics
accuracy = accuracy_score(y, pred)
precision = precision_score(y, pred)
recall = recall_score(y, pred)
f1 = f1_score(y, pred)
cm = confusion_matrix(y, pred)

print("🔍 MODEL EVALUATION RESULTS")
print("------------------------------")
print(f"Accuracy:  {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall:    {recall:.4f}")
print(f"F1 Score:  {f1:.4f}")
print("\nConfusion Matrix:")
print(cm)
print("\nClassification Report:")
print(classification_report(y, pred))

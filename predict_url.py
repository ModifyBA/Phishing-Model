import pandas as pd
import joblib
from Feature_Extraction_Engine import extract_features

def classify_new_url(url):
    model = joblib.load("phishing_detector_model.pkl")
    feats = extract_features(url)
    df = pd.DataFrame([feats])
    prediction = model.predict(df)[0]

    return "Phishing" if prediction == 1 else "Safe"

# Quick test
if __name__ == "__main__":
    test_url = input("Enter a URL to classify: ")
    print(classify_new_url(test_url))

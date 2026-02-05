# predict.py
# Usage:
#   python predict.py --model rf
#   python predict.py --model lr
#   python predict.py --both
#   python predict.py --both --url "https://example.com/login"
#   python predict.py --both --suspicious 0.30

import argparse
import json
import joblib
import pandas as pd

from feature import normalize_url, extract_url_features


def load_train_cols():
    with open("models/raw_feature_columns.json", "r") as f:
        cols = json.load(f)
    if not isinstance(cols, list) or not cols:
        raise ValueError("models/raw_feature_columns.json is missing or invalid")
    return cols


def load_bundle(model_choice: str):
    model_choice = model_choice.lower().strip()
    if model_choice == "rf":
        path = "models/phishing_rf_with_threshold.pkl"
    elif model_choice == "lr":
        path = "models/phishing_lr_with_threshold.pkl"
    else:
        raise ValueError("model must be 'rf' or 'lr'")
    return joblib.load(path), path


def make_X(url: str, train_cols: list[str]) -> pd.DataFrame:
    feats = extract_url_features(normalize_url(url))
    X = pd.DataFrame([feats])

    # add missing cols expected by the trained model
    for c in train_cols:
        if c not in X.columns:
            X[c] = 0

    # drop extras + enforce training-time order
    X = X[train_cols]
    return X


def verdict_from_prob(p: float, threshold: float, suspicious_cutoff: float) -> str:
    if p >= threshold:
        return "phishing"
    if p >= suspicious_cutoff:
        return "suspicious"
    return "legitimate"


def predict_with_bundle(url: str, bundle: dict, train_cols: list[str], suspicious_cutoff: float):
    model = bundle["model"]
    threshold = float(bundle["threshold"])

    X = make_X(url, train_cols)
    p = float(model.predict_proba(X)[0, 1])

    verdict = verdict_from_prob(p, threshold, suspicious_cutoff)
    return verdict, p, threshold


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", choices=["rf", "lr"], default="rf", help="Which model to use (ignored if --both)")
    parser.add_argument("--both", action="store_true", help="Run BOTH rf and lr and print both results")
    parser.add_argument("--url", default=None, help="URL to classify (if omitted, prompts input)")
    parser.add_argument("--suspicious", type=float, default=0.20, help="Cutoff for 'suspicious' zone")
    args = parser.parse_args()

    train_cols = load_train_cols()

    url = args.url
    if not url:
        url = input("Enter URL: ").strip()

    if args.both:
        rf_bundle, rf_path = load_bundle("rf")
        lr_bundle, lr_path = load_bundle("lr")

        rf_verdict, rf_p, rf_thr = predict_with_bundle(url, rf_bundle, train_cols, args.suspicious)
        lr_verdict, lr_p, lr_thr = predict_with_bundle(url, lr_bundle, train_cols, args.suspicious)

        print(f"URL: {url}\n")

        print(f"RF  ({rf_path})")
        print(f"{rf_verdict} | prob={rf_p:.4f} | thr={rf_thr:.2f} | suspicious_cutoff={args.suspicious:.2f}\n")

        print(f"LR  ({lr_path})")
        print(f"{lr_verdict} | prob={lr_p:.4f} | thr={lr_thr:.2f} | suspicious_cutoff={args.suspicious:.2f}")

    else:
        bundle, bundle_path = load_bundle(args.model)
        verdict, p, thr = predict_with_bundle(url, bundle, train_cols, args.suspicious)

        print(f"Model: {args.model} ({bundle_path})")
        print(f"{verdict} | prob={p:.4f} | thr={thr:.2f} | suspicious_cutoff={args.suspicious:.2f}")


if __name__ == "__main__":
    main()

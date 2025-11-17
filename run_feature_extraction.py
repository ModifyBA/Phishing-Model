import pandas as pd
from data_loader import load_url_file
from Feature_Extraction_Engine import extract_features

def process_file(input_file):
    df = load_url_file(input_file)

    # Attempt to find the correct column name
    url_col = None
    for col in df.columns:
        if col.lower() in ["url", "urls", "link", "website"]:
            url_col = col
            break

    if url_col is None:
        raise ValueError("Could not find a column named URL, Url, Link, or Website.")

    all_rows = []

    for _, row in df.iterrows():
        url = row[url_col]

        print(f"Extracting features for: {url}")

        try:
            feats = extract_features(url)
            feats["url"] = url

            # include label if present
            if "label" in df.columns:
                feats["label"] = row["label"]

            all_rows.append(feats)

        except Exception as e:
            print(f"❌ Error extracting {url}: {e}")

    # Convert to DataFrame
    feature_df = pd.DataFrame(all_rows)

    # Save result
    output_file = "extracted_features.csv"
    feature_df.to_csv(output_file, index=False)

    print("\n🎉 Feature extraction finished!")
    print(f"➡ Saved to {output_file}")

if __name__ == "__main__":
    process_file("data_bal.xlsx")  # ← change this to your file name

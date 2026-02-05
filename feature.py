from urllib import response
import re
import ipaddress

from urllib.parse import urlparse as _urlparse

def safe_urlparse(url: str):
    """urlparse that never throws on malformed bracketed hosts."""
    try:
        return _urlparse(url)
    except ValueError:
        # return an empty parse result-like object
        return _urlparse("")

def have_IP(url):
    try:
        host = safe_urlparse(url).hostname or ""
        if host in {"", ".", ".."}:
            return 0
        ipaddress.ip_address(host)
        return 1
    except Exception:
        return 0

def have_a(url):
    try:
        return 1 if "@" in url else 0
    except Exception:
        return 0

def length_url(url):
    try:
        return 1 if len(url) >= 54 else 0
    except Exception:
        return 0
    
def subdomain_url(url):
    try:
        hostname = safe_urlparse(url).hostname
        if not hostname:
            return 1
        if hostname.startswith("www."):
            hostname = hostname[4:]
        return 0 if hostname.count(".") <= 1 else 1
    except Exception:
        return 1

def redirection(url):
    try:
        path = safe_urlparse(url).path or ""
        return 1 if "//" in path else 0
    except Exception:
        return 1

def http_check(url):
    try:
        scheme = (safe_urlparse(url).scheme or "").lower()
        return 0 if scheme == "https" else 1
    except Exception:
        return 1


def prefixSuffix(url):
    try:
        netloc = safe_urlparse(url).netloc or ""
        return 1 if "-" in netloc else 0
    except Exception:
        return 1


shortening_services = r"bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|" \
                      r"yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|" \
                      r"short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|" \
                      r"doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.co|lnkd\.in|db\.tt|" \
                      r"qr\.ae|adf\.ly|goo\.gl|bitly\.com|cur\.lv|tinyurl\.com|ow\.ly|bit\.ly|ity\.im|q\.gs|is\.gd|" \
                      r"po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|x\.co|" \
                      r"prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|" \
                      r"tr\.im|link\.zip\.net"
   
def tinyURL(url):
    match=re.search(shortening_services,url)
    if match:
        return 1
    else:
        return 0


 
import re
from bs4 import BeautifulSoup
import whois
import urllib
import urllib.request
from datetime import datetime

from datetime import datetime

def domainAge(domain_name):
    try:
        creation_date = domain_name.creation_date

        if isinstance(creation_date, list):
            creation_date = creation_date[0]

        if isinstance(creation_date, str):
            creation_date = datetime.strptime(creation_date, "%Y-%m-%d")

        if creation_date is None:
            return 1

        age_in_days = (datetime.now() - creation_date).days

        if age_in_days < 180:
            return 1
        else:
            return 0
    except:
        return 1

from datetime import datetime

def domainEnd(domain_name):
    try:
        expiration_date = domain_name.expiration_date

        if isinstance(expiration_date, list):
            expiration_date = expiration_date[0]

        if isinstance(expiration_date, str):
            expiration_date = datetime.strptime(expiration_date, "%Y-%m-%d")

        if expiration_date is None:
            return 1

        remaining_days = (expiration_date - datetime.now()).days

        # expired or expiring soon
        if remaining_days < 180:
            return 1
        else:
            return 0
    except:
        return 1

import requests

def iframe(response):
  if response == "" or response is None:
    return 1
  return 1 if re.search(r"<\s*iframe\b", response.text, re.IGNORECASE) else 0
     
def mouseOver(response): 
    if response == "" or response is None:
        return 1
    return 1 if re.search(r"onmouseover\s*=", response.text, re.IGNORECASE) else 0

    
def rightClick(response):
    if response == "" or response is None:
        return 1
    return 1 if re.search(r"event\.button\s*==\s*2", response.text) else 0


def forwarding(response):
    if response == "" or response is None:
        return 1
    return 1 if len(response.history) > 2 else 0

#Function to extract features

def normalize_url(url: str) -> str:
    url = str(url).strip().lower()
    if url in {"", "nan", "none", "null", "'", ".", ".."}:
        return ""
    if not re.match(r"^[a-zA-Z][a-zA-Z0-9+\-.]*://", url):
        url = "http://" + url
    return url

import math
from collections import Counter

# OLD list (kept)
SUSP_WORDS = (
    "login", "signin", "sign-in", "verify", "verification", "account", "update",
    "password", "secure", "security", "confirm", "billing", "invoice", "payment",
    "bank", "wallet", "support", "unlock", "reset"
)

# NEW additions
SUSP_WORDS_PATH = (
    "login","signin","sign-in","verify","verification","account","update",
    "password","secure","confirm","billing","invoice","payment","bank",
    "support","unlock","reset","sso","oauth","authorize","session","token"
)

BRAND_WORDS = (
    "paypal","apple","microsoft","office","onedrive","google","gmail","amazon",
    "netflix","instagram","facebook","meta","bankofamerica","wellsfargo","chase"
)

SUSP_EXTS = (".php", ".asp", ".aspx", ".jsp", ".html", ".htm", ".exe", ".zip", ".rar")


def shannon_entropy(s: str) -> float:
    if not s:
        return 0.0
    counts = Counter(s)
    n = len(s)
    return -sum((c/n) * math.log2(c/n) for c in counts.values())


def extract_url_features(url: str) -> dict:
    url = normalize_url(url)
    p = safe_urlparse(url)

    host = (p.hostname or "")
    netloc = (p.netloc or "")
    path = (p.path or "")
    query = (p.query or "")

    lower_url = url.lower()
    lower_path_query = (path + "?" + query).lower()

    # invalid URL fallback (KEEP KEYS CONSISTENT!)
    if not url or not host:
        return {
            # original
            "has_ip": 0,
            "has_at": 0,
            "url_length_ge_54": 0,
            "has_many_subdomains": 1,
            "has_redirection_marker": 0,
            "non_https": 1,
            "is_shortener": 0,
            "has_prefix_suffix": 0,

            # numeric/lexical
            "url_len": 0,
            "host_len": 0,
            "path_len": 0,
            "query_len": 0,
            "num_dots": 0,
            "num_hyphens": 0,
            "num_digits": 0,
            "num_special": 0,
            "num_params": 0,
            "has_susp_words": 0,
            "entropy_url": 0.0,
            "entropy_host": 0.0,

            # new stronger ones
            "has_susp_words_path": 0,
            "has_brand_words": 0,
            "num_path_segments": 0,
            "has_susp_ext": 0,
            "num_slashes": 0,
            "num_equals": 0,
            "num_ampersand": 0,
            "num_percent": 0,
        }

    # cheap counts
    num_digits = sum(ch.isdigit() for ch in lower_url)
    num_hyphens = netloc.count("-") + path.count("-")
    num_dots = host.count(".")
    num_params = query.count("&") + (1 if query else 0)
    num_special = sum(ch in "@%_+~" for ch in lower_url)

    num_slashes = lower_url.count("/")
    num_equals = lower_url.count("=")
    num_ampersand = lower_url.count("&")
    num_percent = lower_url.count("%")

    num_path_segments = len([seg for seg in path.split("/") if seg])
    has_susp_ext = int(any(lower_path_query.endswith(ext) for ext in SUSP_EXTS))

    return {
        # original features
        "has_ip": have_IP(url),
        "has_at": have_a(url),
        "url_length_ge_54": length_url(url),
        "has_many_subdomains": subdomain_url(url),
        "has_redirection_marker": redirection(url),
        "non_https": http_check(url),
        "is_shortener": tinyURL(url),
        "has_prefix_suffix": prefixSuffix(url),

        # numeric/lexical (old + new)
        "url_len": len(url),
        "host_len": len(host),
        "path_len": len(path),
        "query_len": len(query),
        "num_dots": num_dots,
        "num_hyphens": num_hyphens,
        "num_digits": num_digits,
        "num_special": num_special,
        "num_params": num_params,
        "has_susp_words": int(any(w in lower_url for w in SUSP_WORDS)),
        "entropy_url": shannon_entropy(lower_url),
        "entropy_host": shannon_entropy(host.lower()),

        # stronger phishing cues
        "has_susp_words_path": int(any(w in lower_path_query for w in SUSP_WORDS_PATH)),
        "has_brand_words": int(any(b in lower_url for b in BRAND_WORDS)),
        "num_path_segments": num_path_segments,
        "has_susp_ext": has_susp_ext,
        "num_slashes": num_slashes,
        "num_equals": num_equals,
        "num_ampersand": num_ampersand,
        "num_percent": num_percent,
    }


def extract_features(url: str) -> dict:
    url = normalize_url(url)
    feats = extract_url_features(url)

    # WHOIS / HTML only if URL is valid
    if not url or safe_urlparse(url).hostname is None:
        return feats

    # WHOIS (optional)
    try:
        domain_name = whois.whois(safe_urlparse(url).netloc)
        feats["dns_fail"] = 0
        feats["domain_age_lt_180d"] = domainAge(domain_name)
        feats["domain_exp_lt_180d"] = domainEnd(domain_name)
    except:
        feats["dns_fail"] = 1
        feats["domain_age_lt_180d"] = 1
        feats["domain_exp_lt_180d"] = 1

    # HTML/JS (optional)
    try:
        resp = requests.get(url, timeout=5, headers={"User-Agent": "Mozilla/5.0"})
    except:
        resp = None

    feats["has_iframe"] = iframe(resp)
    feats["has_onmouseover"] = mouseOver(resp)
    feats["has_rightclick_block"] = rightClick(resp)
    feats["has_many_redirects"] = forwarding(resp)

    return feats
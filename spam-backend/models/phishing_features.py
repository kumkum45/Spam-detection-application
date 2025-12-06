import pandas as pd
import re
from urllib.parse import urlparse

def extract_phishing_features(url_or_text: str) -> pd.DataFrame:
    """
    Extracts phishing features from a URL or text.
    Corrected to avoid always-high probabilities.
    """
    url = url_or_text.strip()
    parsed = urlparse(url if "://" in url else "http://" + url)

    features = {
        "UsingIP": 1 if re.search(r"\b\d{1,3}(?:\.\d{1,3}){3}\b", url) else 0,
        "LongURL": 1 if len(url) > 75 else 0,
        "ShortURL": 1 if any(short in url for short in ["bit.ly", "tinyurl", "goo.gl", "t.co"]) else 0,
        "Symbol@": 1 if "@" in url else 0,
        "Redirecting//": 1 if url.count("//") > 1 else 0,
        "PrefixSuffix-": 1 if "-" in parsed.netloc else 0,
        "SubDomains": 1 if parsed.netloc.count(".") > 2 else 0,
        "HTTPS": 1 if parsed.scheme == "https" else 0,
        "DomainRegLen": 1 if len(parsed.netloc.split(".")) <= 2 else 0,
        "Favicon": 0,
        "NonStdPort": 1 if parsed.port not in [80, 443, None] else 0,
        "HTTPSDomainURL": 1 if "https" in parsed.netloc else 0,
        "RequestURL": 0,
        "AnchorURL": 1 if "#" in url else 0,
        "LinksInScriptTags": 0,
        "ServerFormHandler": 0,
        "InfoEmail": 1 if re.search(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", url) else 0,
        "AbnormalURL": 1 if parsed.netloc not in url else 0,
        "WebsiteForwarding": 0,
        "StatusBarCust": 0,
        "DisableRightClick": 0,
        "UsingPopupWindow": 0,
        "IframeRedirection": 0,
        "AgeofDomain": 0,       # safe default
        "DNSRecording": 0,      # safe default
        "WebsiteTraffic": 0,
        "PageRank": 0,
        "GoogleIndex": 0,       # safe default
        "LinksPointingToPage": 0,
        "StatsReport": 0,
    }

    return pd.DataFrame([features])

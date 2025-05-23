import os
import requests
from dotenv import load_dotenv

load_dotenv()
SERPER_API_KEY = os.getenv("SERPER_API_KEY")

HEADERS = {
    "X-API-KEY": SERPER_API_KEY,
    "Content-Type": "application/json"
}

def fetch_news(symbol):
    query = f"{symbol} stock news India"
    url = "https://google.serper.dev/news"
    payload = {
        "q": query,
        "num": 3
    }

    try:
        response = requests.post(url, headers=HEADERS, json=payload)
        data = response.json()
        results = data.get("news", [])

        articles = []
        for item in results:
            articles.append({
                "title": item.get("title", "No title"),
                "summary": item.get("snippet", ""),
                "url": item.get("link", "")
            })

        return articles

    except Exception as e:
        print(f"[ERROR] Serper.dev news fetch failed for {symbol}: {e}")
        return []

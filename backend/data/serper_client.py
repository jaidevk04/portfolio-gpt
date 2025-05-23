import os
import requests
from dotenv import load_dotenv

load_dotenv()
SERPER_API_KEY = os.getenv("SERPER_API_KEY")

def search_news(query, num_results=3):
    url = "https://google.serper.dev/news"
    headers = { "X-API-KEY": SERPER_API_KEY }
    data = { "q": query, "num": num_results }

    try:
        response = requests.post(url, headers=headers, json=data)
        items = response.json().get("news", [])
        return [{
            "title": item["title"],
            "summary": item.get("snippet", ""),
            "url": item["link"]
        } for item in items]
    except Exception as e:
        print(f"[ERROR] Serper failed: {e}")
        return []

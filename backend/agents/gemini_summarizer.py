import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("models/gemini-1.5-flash")

def summarize_news(symbol, articles):
    if not articles:
        return f"No recent news found for {symbol}."

    content = "\n\n".join([f"Title: {a['title']}\nSummary: {a['summary']}" for a in articles[:3]])

    prompt = (
        f"You are a financial reasoning assistant. Based on the recent news for {symbol}, "
        f"summarize in 1–2 sentences why the stock may have gone up or down recently. "
        f"Be concise, factual, and include any macro/geopolitical reasons if mentioned.\n\n"
        f"News Articles:\n{content}\n\n"
        f"Answer:"
    )

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"[ERROR] Gemini failed: {e}"

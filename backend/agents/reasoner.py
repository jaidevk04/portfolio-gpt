# backend/agents/reasoner.py

from backend.portfolio.zerodha import get_holdings
from backend.data.price_fetcher import fetch_yfinance_price
from backend.data.news_fetcher import fetch_news
from backend.agents.gemini_summarizer import summarize_news

def analyze_portfolio_data(as_dict=False):
    holdings = get_holdings()

    stocks = []
    total_invested = 0
    total_current = 0

    for stock in holdings:
        symbol = stock["symbol"]
        qty = stock["quantity"]
        avg_price = stock["avg_price"]

        current_price = fetch_yfinance_price(symbol)
        if current_price is None:
            continue

        invested = avg_price * qty
        current_value = current_price * qty
        gain = current_value - invested

        news = fetch_news(symbol)
        insight = summarize_news(symbol, news)

        stocks.append({
            "symbol": symbol,
            "quantity": qty,
            "avg_price": avg_price,
            "current_price": current_price,
            "invested": invested,
            "current_value": current_value,
            "gain": gain,
            "insight": insight
        })

        total_invested += invested
        total_current += current_value

    result = {
        "total_invested": total_invested,
        "total_current": total_current,
        "net_gain": total_current - total_invested,
        "stocks": stocks
    }

    return result if as_dict else result
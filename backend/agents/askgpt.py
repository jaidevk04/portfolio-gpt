from backend.agents.reasoner import analyze_portfolio_data
from backend.agents.gemini_summarizer import summarize_news
from backend.data.news_fetcher import fetch_news

# Answer any question with Gemini + smart fallback
def answer_query(question: str) -> str:
    portfolio = analyze_portfolio_data(as_dict=True)

    # Try matching a stock symbol in the question
    symbols = [stock['symbol'] for stock in portfolio['stocks']]
    target_symbol = next((s for s in symbols if s.lower() in question.lower()), None)

    if target_symbol:
        news = fetch_news(target_symbol)
        summary = summarize_news(target_symbol, news)
        return f"Here's what I found about {target_symbol}:\n{summary}"

    # If no symbol found, return a market summary
    top_gainers = sorted(portfolio['stocks'], key=lambda x: x['gain'], reverse=True)[:2]
    top_losers = sorted(portfolio['stocks'], key=lambda x: x['gain'])[:2]

    gainers_text = ", ".join([f"{s['symbol']} (+{s['gain']:.2f})" for s in top_gainers])
    losers_text = ", ".join([f"{s['symbol']} ({s['gain']:.2f})" for s in top_losers])

    return (
        f"Today’s top performers: {gainers_text}.\n"
        f"Biggest declines: {losers_text}.\n"
        f"Ask me about any stock for more details."
    )

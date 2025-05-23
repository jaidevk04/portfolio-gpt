import yfinance as yf

def fetch_yfinance_price(symbol):
    try:
        # NSE symbols must end with ".NS" for yfinance
        ticker = yf.Ticker(f"{symbol}.NS")
        price = ticker.info.get("regularMarketPrice", None)
        return price
    except Exception as e:
        print(f"[ERROR] {symbol}: {e}")
        return None

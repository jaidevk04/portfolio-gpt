from price_fetcher import fetch_yfinance_price

symbols = ["TATAMOTORS", "DRREDDY", "IDFCFIRSTB", "FEDERALBNK"]

for sym in symbols:
    price = fetch_yfinance_price(sym)
    print(f"{sym}: ₹{price}")

from news_fetcher import fetch_news

symbols = ["TATAMOTORS", "DRREDDY", "FEDERALBNK"]

for sym in symbols:
    print(f"\n📰 News for {sym}:\n")
    news = fetch_news(sym)
    for i, article in enumerate(news, 1):
        print(f"{i}. {article['title']}")
        print(f"   {article['summary']}")
        print(f"   {article['url']}\n")

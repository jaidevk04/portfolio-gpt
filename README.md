# 📊 PortfolioGPT: AI-Powered Zerodha Portfolio Assistant

**PortfolioGPT** is an open-source, full-stack application that seamlessly integrates with your Zerodha account to provide real-time, AI-driven insights and assistance on your investment portfolio. Built with **FastAPI** and a custom frontend, it leverages the power of AI to offer personalized analyses, financial news summaries, and interactive conversations with a portfolio chatbot.

---

## 🚀 Features

- **Real-Time Portfolio Analysis**: Connects directly to your Zerodha account to fetch live data on your holdings, including quantities, average prices, current market values, and gains/losses.

- **AI-Generated Insights**: Utilizes advanced language models to summarize recent news and provide contextual insights for each stock in your portfolio.

- **Conversational Portfolio Assistant**: A powerful chatbot interface allows you to ask natural language questions like "Why is my portfolio down today?" or "What’s new with DRREDDY?"

- **Top Gainers and Losers**: Automatically identifies and highlights the top-performing and worst-performing stocks in your portfolio.

- **Secure and Private**: All data processing occurs locally or on your secured server, ensuring your financial data remains confidential.

---

## 🛠️ Getting Started

### Prerequisites

- Python 3.8 or higher
- Zerodha API credentials:
  - `KITE_API_KEY`
  - `KITE_API_SECRET`
  - `KITE_ACCESS_TOKEN`

### Installation

**Clone the Repository**
```bash
git clone https://github.com/yourusername/portfolio-gpt.git
cd portfolio-gpt
```
**Create a Virtual Environment**
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```
**Install Python Dependencies**
```bash
pip install -r requirements.txt
```
**(Optional) Set Zerodha API Tokens as Environment Variables**
```bash
export KITE_API_KEY=your_api_key
export KITE_API_SECRET=your_api_secret
export KITE_ACCESS_TOKEN=your_access_token
```
**Run the Backend Server**
```bash
uvicorn backend.main:app --reload
```

**Install Frontend Dependencies (Optional)**
```bash
npm install
```

**Run PortfolioGPT **
```bash
npm run dev
```

## 🛁 API Endpoints

**GET /portfolio**  
Retrieves the current state of your portfolio with detailed metrics.

**POST /ask**  
Accepts a JSON payload with a `question` field and returns an AI-generated response.

---

## 📁 Project Structure

```bash
portfolio-gpt/
├── backend/
│   ├── agents/
│   │   ├── askgpt.py
│   │   └── reasoner.py
│   ├── data/
│   │   ├── news_fetcher.py
│   │   └── price_fetcher.py
│   ├── portfolio/
│   │   └── zerodha.py
│   └── main.py
├── frontend/
│   └── ui/  # Frontend application (if applicable)
├── .env
├── requirements.txt
└── README.md
```

---

## 🧐 How It Works

- **Data Retrieval**: Uses Zerodha's Kite Connect API to fetch real-time holdings data.
- **Data Analysis**: Computes key metrics like total investment, current value, and net P&L.
- **News Summarization**: Scrapes and summarizes the latest stock news using Gemini or Serper.
- **Conversational Q&A**: Talk to the assistant in plain English and get back smart, data-aware answers about your portfolio.

---

## 🔐 Security Considerations

- **Local Processing**: All data stays on your machine or server.
- **Environment Variables**: Sensitive tokens are managed securely.
- **Read-Only Access**: Uses only read permissions from Zerodha.

---

## 🤚🏼 Comparison with Zerodha's MCP Integration

While Zerodha's Model Context Protocol (MCP) allows integration with assistants like Claude, it has limitations:

| Feature                     | Zerodha MCP + Claude | PortfolioGPT (This Project) |
|----------------------------|----------------------|------------------------------|
| **Open Source**            | ❌ No              | ✅ Yes                   |
| **Full Customization**     | ❌ Limited         | ✅ Full control          |
| **Privacy & Local Control**| ❌ Cloud Only      | ✅ 100% local            |
| **Real-Time Price Analysis**| ❌ Delayed/static | ✅ Live with yFinance    |
| **Debug/Extend**           | ❌ Not possible    | ✅ Developer friendly     |

---

## 🧪 Future Enhancements

- ✅ Frontend dashboard with charts
- ✅ Multi-broker support (Groww, Upstox, etc.)
- ✅ Real-time sentiment analysis
- ✅ Price alert system
- ✅ Scheduled reports (daily/weekly)
- ✅ Integration with Telegram/Slack

---

## 🤝 Contributing

Pull requests, feature suggestions, and forks are welcome!  
If you find this useful, leave a ⭐ and spread the word.

---

## 📄 License

**MIT License** — free to use, fork, and build on.

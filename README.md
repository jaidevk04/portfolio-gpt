# 📊 PortfolioGPT: AI-Powered Zerodha Portfolio Analyzer

**PortfolioGPT** is an open-source, full-stack application that seamlessly integrates with your Zerodha account to provide real-time, AI-driven insights into your investment portfolio. Built with **FastAPI** and a custom frontend, it leverages the power of AI to offer personalized analyses, news summaries, and performance metrics for your holdings.

---

## 🚀 Features

- **Real-Time Portfolio Analysis**: Connects directly to your Zerodha account to fetch live data on your holdings, including quantities, average prices, current market values, and gains/losses.

- **AI-Generated Insights**: Utilizes advanced language models to summarize recent news and provide contextual insights for each stock in your portfolio.

- **Interactive Query Handling**: Ask natural language questions about your portfolio, and receive detailed, AI-generated responses.

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

```bash
# =======================================
# 🚀 Cloning PortfolioGPT Repository
# =======================================
git clone https://github.com/yourusername/portfolio-gpt.git
cd portfolio-gpt

# =======================================
# 🛠️ Setting up Virtual Environment
# =======================================
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# =======================================
# 📦 Installing Dependencies
# =======================================
pip install -r requirements.txt

# =======================================
# 🔐 Set Zerodha API Tokens (Optional .env alternative)
# =======================================
export KITE_API_KEY=your_api_key
export KITE_API_SECRET=your_api_secret
export KITE_ACCESS_TOKEN=your_access_token

# =======================================
# 🚀 Run the Backend
# =======================================
uvicorn backend.main:app --reload

# =======================================
# 🌐 Run the Frontend (Optional)
# =======================================
npm install
npm run dev

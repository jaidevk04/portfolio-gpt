# backend/main.py

import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from backend.agents.reasoner import analyze_portfolio_data
from backend.agents.askgpt import answer_query
from backend.portfolio.zerodha import set_access_token

# --- Manually set credentials for Zerodha (bypass dotenv) ---
os.environ["KITE_API_KEY"] = "c8uxq538dqnrhepm"
os.environ["KITE_API_SECRET"] = "t46a2iwqncyxeopkd5h4o13l5h7nygh4"
os.environ["KITE_ACCESS_TOKEN"] = "01fn2ltAmJL1GJhZozEjq7K4gcW3e8JQ"
set_access_token(os.environ["KITE_ACCESS_TOKEN"])

app = FastAPI()

# Enable CORS for frontend (Lovable AI, localhost, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskRequest(BaseModel):
    question: str

@app.get("/portfolio")
async def get_portfolio():
    return analyze_portfolio_data()

@app.post("/ask")
async def ask_portfolio_question(request: AskRequest):
    response = answer_query(request.question)
    return {"response": response}
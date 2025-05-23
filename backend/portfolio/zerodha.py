import os
from kiteconnect import KiteConnect
from dotenv import load_dotenv

load_dotenv()  # Loads API keys from .env file

API_KEY = os.getenv("KITE_API_KEY")
API_SECRET = os.getenv("KITE_API_SECRET")

kite = KiteConnect(api_key=API_KEY)

def generate_login_url():
    return kite.login_url()

def generate_access_token(request_token: str):
    data = kite.generate_session(request_token, api_secret=API_SECRET)
    access_token = data["access_token"]
    print("[INFO] Access Token:", access_token)
    return access_token

def set_access_token(access_token: str):
    kite.set_access_token(access_token)

def get_holdings():
    holdings = kite.holdings()
    result = []
    for h in holdings:
        result.append({
            "symbol": h["tradingsymbol"],
            "quantity": h["quantity"],
            "avg_price": h["average_price"],
            "pnl": h["pnl"]
        })
    return result


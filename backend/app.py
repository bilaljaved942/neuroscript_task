from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json

BASE_DIR = Path(__file__).resolve().parent
CONTENT_FILE = BASE_DIR / "content.json"

DEFAULT_CONTENT = {
  "announcement": "Nieuw: Lab in een doosje! Bekijk onze vernieuwde DIY Kits hier",
  "benefitsTop": [
    "✓ Verzending gratis v.a. €35,-",
    "★★★★★ 9.4 / 10 van 8000+ reviews",
    "✓ Voor 23:30 besteld, volgende werkdag in huis"
  ],
  "siteName": "NATURAL HEROES+",
  "navigation": ["SHOP", "RECEPTEN", "INFORMATIE", "COMMUNITY", "OVER ONS"],
  "product": {
    "title": "No BS Deo",
    "subtitle": "Eindelijk een natuurlijke deodorant waar je op kunt rekenen 🌿",
    "reviews": {
      "count": 85,
      "stars": 5,
      "rating": 4.8,
      "questions": 10,
      "users": "20m+"
    },
    "bullets": [
      "Vrij van Aluminium, Alcohol, Baking Soda en Parfum",
      "Beschermt 24 uur",
      "Ook geurloos verkrijgbaar",
      "Gaat tenminste 1 maand mee bij dagelijks gebruik"
    ],
    "images": [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    "volumes": [
      {
        "id": "vol-30",
        "name": "30 ml / Fresh Balance",
        "price": 12.99,
        "img": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=100&q=80"
      },
      {
        "id": "vol-50",
        "name": "50 ml / Lavender Glow",
        "price": 18.49,
        "img": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=100&q=80"
      },
      {
        "id": "vol-15",
        "name": "15 ml / Sensitive Mint",
        "price": 8.99,
        "img": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80"
      }
    ],
    "subscriptionOptions": [
      {
        "id": "sub-90",
        "title": "90-Dag Abonnement",
        "saveBadge": "BESPAAR 30%",
        "bestValue": True,
        "priceMonthly": 4.55,
        "priceOriginal": 6.55,
        "billingInfo": "Billed €273.00 every 12 weeks | €40.00/serving",
        "features": [
          "Exclusive Access to 90 Day IM8 Transformation Program",
          "Maximum savings - lowest price per serving",
          "90-Day Money-Back Guarantee",
          "Share with family and friends",
          "Free Mystery Gift",
          "Free Daily Ultimate Mixer (US$18)",
          "Cancel or pause anytime",
          "Free Shipping to US, UK, CA, and most of EU and APAC"
        ],
        "welcomeKitTitle": "Gratis Welcome Kit (Eerste order)",
        "welcomeKitItems": [
          {
            "name": "SHEA BUTTER [L]",
            "price": "€5.99 Gratis",
            "img": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=100&q=80"
          },
          {
            "name": "SHEA BUTTER [M]",
            "price": "€5.99 Gratis",
            "img": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=100&q=80"
          },
          {
            "name": "SHEA BUTTER [S]",
            "price": "€5.99 Gratis",
            "img": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80"
          },
          {
            "name": "SHEA BUTTER [XS]",
            "price": "€5.99 Gratis",
            "img": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=100&q=80"
          }
        ]
      },
      {
        "id": "sub-reg",
        "title": "Abonnement",
        "saveBadge": "BESPAAR 10%",
        "bestValue": False,
        "priceMonthly": 5.85,
        "priceOriginal": 6.50,
        "billingInfo": "Billed monthly | Cancel anytime",
        "features": [
          "10% savings on every delivery",
          "Cancel or pause anytime",
          "Free shipping in NL"
        ],
        "welcomeKitTitle": "",
        "welcomeKitItems": []
      },
      {
        "id": "sub-one",
        "title": "Eenmalig",
        "saveBadge": "",
        "bestValue": False,
        "priceMonthly": 7.72,
        "priceOriginal": 7.72,
        "billingInfo": "One-time purchase",
        "features": [
          "Standard delivery",
          "No subscription lock-in"
        ],
        "welcomeKitTitle": "",
        "welcomeKitItems": []
      }
    ],
    "trustBadges": [
      { "label": "Natuurlijk", "sub": "100%", "icon": "🌿" },
      { "label": "Vegan", "sub": "VEGAN", "icon": "🌱" },
      { "label": "Plastic vrij", "sub": "Plastic vrij", "icon": "🚫" },
      { "label": "Aluminium vrij", "sub": "Aluminium vrij", "icon": "🛡️" }
    ],
    "bottomChecklist": [
      "Gratis verzending vanaf €35,- naar NL, BE & DUI.",
      "Voor 23:30 besteld, morgen in huis.",
      "Klanten geven ons een 9.4 op Kiyoh",
      "Snel en persoonlijk geholpen door ons lieve team."
    ]
  }
}

app = FastAPI(title="NeuroScript Content API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_methods=["GET", "PUT", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def load_content():
    if not CONTENT_FILE.exists():
        save_content(DEFAULT_CONTENT)
    try:
        with CONTENT_FILE.open("r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Content file is damaged")


def save_content(content: dict):
    with CONTENT_FILE.open("w", encoding="utf-8") as f:
        json.dump(content, f, indent=2, ensure_ascii=False)
    return content


@app.get("/api/content")
async def get_content():
    return load_content()


@app.put("/api/content")
async def update_content(payload: dict):
    if not isinstance(payload, dict):
        raise HTTPException(status_code=400, detail="Content must be a JSON object")
    saved = save_content(payload)
    return {"status": "ok", "content": saved}


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

# 🚗 CarCartel  
### Your Curated Matches, Based on Global Market Analysis.

---

## 🌐 Live Demo
[Visit CarCartel](https://car-cartel.vercel.app/)

---

# 📖 Overview

CarCartel is an AI-powered automotive concierge designed to eliminate decision paralysis in the car-buying process.  

Instead of scrolling through thousands of listings, users input their lifestyle and financial preferences, and the AI engine performs a real-time global market scan to deliver curated, premium vehicle recommendations enriched with visual data.

---

# 🚀 Key Features

## 🧠 AI Market Analysis
Leverages Generative AI to match user constraints such as:

- Budget
- Body Type
- Brand Preference
- Mileage Requirements

with current market-leading vehicles.

---

## 🖼 Real-Time Visual Enrichment
Automatically fetches live:

- Exterior Images
- Interior Images
- Rim Details

using the Serper API.

---

## 🎯 Smart Filtering
Custom combobox-driven filtering system for a seamless and intuitive user experience.

---

## 📱 Responsive Design
Modern immersive UI optimized for:

- Desktop
- Tablets
- Mobile Devices

---

# 🛠 Tech Stack

## Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Deployment
- Vercel

---

## Backend
- Java 22
- Spring Boot 4

### AI Integration
- Google Gemini API

### Asset Enrichment
- Serper API

### Deployment
- Railway

---

# 🏗 Architecture

The application follows a clean separation-of-concerns architecture.

```text
Frontend → Spring Boot Backend → AI & Search APIs
```

### Workflow

1. The frontend collects user preferences.
2. A secure request is sent to the backend.
3. The Spring Boot backend orchestrates:
   - AI processing
   - API communication
   - secure key management
4. The AI engine returns structured JSON data.
5. The frontend renders immersive interactive vehicle cards.

---

# ⚙️ How to Run Locally

## 1️⃣ Clone the Repository

```bash
git clone YOUR_GITHUB_REPO_URL
```

---

## 2️⃣ Navigate to Backend Directory

```bash
cd backend/smart-auto-broker
```

---

## 3️⃣ Configure Environment Variables

Create or update your `application.properties` file:

```properties
GEMINI_API_KEY=your_gemini_api_key
SERPER_API_KEY=your_serper_api_key
```

---

## 4️⃣ Run the Application

### Windows

```bash
mvnw spring-boot:run
```

### Mac/Linux

```bash
./mvnw spring-boot:run
```

---

# 🔒 Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key |
| `SERPER_API_KEY` | Serper API Key |

---

# 👨‍💻 Author

Built with passion by **Chanchal**

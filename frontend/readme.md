🚗 CarCartel
Your Curated Matches, Based on Global Market Analysis.

Live Demo | GitHub Repository

📖 Overview
CarCartel is an AI-powered automotive concierge designed to eliminate decision paralysis in the car-buying process. Instead of scrolling through thousands of listings, users input their specific lifestyle and financial parameters, and our AI engine performs a real-time global market scan to deliver curated, premium vehicle recommendations enriched with visual data.

🚀 Key Features
AI Market Analysis: Leverages Generative AI to match user constraints (Budget, Body Type, Brand, Mileage) with current market leaders.

Real-Time Visual Enrichment: Automatically fetches live images of vehicle exteriors, interiors, and rim details using the Serper API.

Smart Filtering: Intuitive custom-combobox inputs for a seamless user experience.

Responsive Design: A sleek, immersive interface optimized for both desktop and mobile viewing.

🛠 Tech Stack
Frontend
UI/UX: HTML5, CSS3, Vanilla JavaScript.

Deployment: Vercel.

Backend
Core: Java 22, Spring Boot 4.0.

AI Integration: Google Gemini API (for market intelligence).

Asset Enrichment: Serper API (for image retrieval).

Deployment: Railway.

🏗 Architecture
The application follows a clean separation of concerns:

The Frontend collects user parameters and sends a secure request to the backend.

The Backend (Spring Boot) acts as an secure orchestrator, holding sensitive API keys and interfacing with the AI and search engines.

The AI Engine processes the request and returns a structured JSON payload, which the frontend renders as high-fidelity, interactive "Immersive Cards."

⚙️ How to Run Locally
1. Clone the repository:
git clone YOUR_REPO_URL

2. Navigate to the backend folder:
cd backend/smart-auto-broker

3. Set your environment variables in application.properties:
GEMINI_API_KEY=your_key
SERPER_API_KEY=your_key

4. Run the application:
./mvnw spring-boot:run

📜 License
This project is licensed under the MIT License.

Built with passion by [Chanchal]
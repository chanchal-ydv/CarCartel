package com.autobroker.smart_auto_broker.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AiService {
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final String GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=";

    public String getCarRecommendations(String userPrompt) {
        try {
            String systemInstruction = "You are an expert global auto broker with real-time market knowledge. " +
                    "Find all highly relevant real-world car matches that fit the user's exact criteria. Return as many great matches as you can find (aim for 2 to 8 depending on the market). " +
                    "You MUST return EXACTLY a raw JSON array of objects. Do NOT use markdown formatting like ```json. " +
                    "Each object must have exactly these keys: " +
                    "'name' (String: Make, Model, and Year), " +
                    "'price' (String: Estimated price in requested currency), " +
                    "'verdict' (String: 2 crisp sentences on why it fits), " +
                    "'features' (Array of 4 to 6 strings: Highlight premium specs, tech, and performance), " +
                    "'considerations' (Array of 2 strings: Gentle trade-offs or things to note, do NOT sound negative), " +
                    "'sourceLink' (String: URL to the official brand website, or premium dealers like Big Boy Toyz, Brabus, Nexa, etc.).";

            String fullPrompt = systemInstruction + " USER REQUEST: " + userPrompt;

            JSONObject requestBody = new JSONObject();
            JSONArray contents = new JSONArray();
            JSONObject content = new JSONObject();
            JSONArray parts = new JSONArray();
            JSONObject part = new JSONObject();

            part.put("text", fullPrompt);
            parts.put(part);
            content.put("parts", parts);
            contents.put(content);
            requestBody.put("contents", contents);

            HttpClient client = HttpClient.newHttpClient();
            
            String fullUrl = GEMINI_BASE_URL + geminiApiKey;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            JSONObject jsonResponse = new JSONObject(response.body());

            if (!jsonResponse.has("candidates")) {
                throw new Exception("API returned an error instead of candidates.");
            }

            String aiResponseText = jsonResponse
                    .getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");

            return aiResponseText.replace("```json", "").replace("```", "").trim();

        } catch (Exception e) {
            System.out.println("Caught an exception in AiService: " + e.getMessage());
            return "[{\"name\": \"System Error\", \"price\": \"N/A\", \"verdict\": \"Failed to connect to the AI market analysis engine.\", \"features\": [\"N/A\"], \"considerations\": [\"N/A\"], \"sourceLink\": \"#\"}]";
        }
    }
}
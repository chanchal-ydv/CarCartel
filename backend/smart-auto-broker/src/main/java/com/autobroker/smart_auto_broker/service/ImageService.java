package com.autobroker.smart_auto_broker.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    @Value("${serper.api.key}")
    private String serperApiKey;

    private static final String SERPER_URL = "https://google.serper.dev/images";

    public String fetchImageUrl(String query) {
        try {
            JSONObject payload = new JSONObject();
            payload.put("q", query);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(SERPER_URL))
                    .header("Content-Type", "application/json")
                    .header("X-API-KEY", serperApiKey) 
                    .POST(HttpRequest.BodyPublishers.ofString(payload.toString()))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            JSONObject jsonResponse = new JSONObject(response.body());

            if (jsonResponse.has("images") && jsonResponse.getJSONArray("images").length() > 0) {
                return jsonResponse.getJSONArray("images").getJSONObject(0).getString("imageUrl");
            }

            return "";

        } catch (Exception e) {
            System.out.println("Serper Image fetch failed for: " + query + " | Error: " + e.getMessage());
            return "";
        }
    }
}
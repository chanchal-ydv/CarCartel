package com.autobroker.smart_auto_broker.controller;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.autobroker.smart_auto_broker.service.AiService;
import com.autobroker.smart_auto_broker.service.ImageService;

@RestController
@RequestMapping("/api/broker")
@CrossOrigin(origins = "https://car-cartel.vercel.app/")
public class SearchController {

    @Autowired
    private AiService aiService;

    @Autowired
    private ImageService imageService;

    @GetMapping("/search")
    public String handleSearch(@RequestParam String currency, @RequestParam String prompt) {
        System.out.println("--- NEW SEARCH REQUEST ---");
        System.out.println("Target Currency: " + currency);
        System.out.println("User Prompt: " + prompt);
        
        String aiResponse = aiService.getCarRecommendations(prompt);
        System.out.println("AI recommendations compiled. Commencing real image enrichment via Serper...");

        try {
            JSONArray carsArray = new JSONArray(aiResponse);

            for (int i = 0; i < carsArray.length(); i++) {
                JSONObject car = carsArray.getJSONObject(i);
                String carName = car.getString("name");

                System.out.println("Fetching asset links for: " + carName);

                String exteriorUrl = imageService.fetchImageUrl(carName + " clean exterior high res wallpaper photography");
                String interiorUrl = imageService.fetchImageUrl(carName + " luxury interior dashboard cockpit details");
                String rimsUrl = imageService.fetchImageUrl(carName + " alloy wheels rims closeup sport wheels");

                car.put("imgExterior", exteriorUrl);
                car.put("imgInterior", interiorUrl);
                car.put("imgRims", rimsUrl);
            }
            
            System.out.println("Payload enriched successfully with real assets. Broadcasting to UI...");
            return carsArray.toString();

        } catch (Exception e) {
            System.out.println("Failed to inject live imagery: " + e.getMessage());
            return aiResponse;
        }
    }
}
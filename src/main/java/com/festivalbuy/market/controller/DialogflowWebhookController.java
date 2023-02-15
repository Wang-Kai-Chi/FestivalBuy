package com.festivalbuy.market.controller;

import com.festivalbuy.market.ChatBot;
import com.google.actions.api.ActionResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/dialogflow/webhook")
public class DialogflowWebhookController {
    @Autowired
    private ChatBot chatBot;

    @PostMapping
    String serveAction(@RequestBody String body, @RequestHeader Map<String, String> headers) {
        try {
            return chatBot.handleRequest(body, headers).get();
        } catch (InterruptedException e) {
            return handleError(e);
        }catch (ExecutionException e) {
        	return handleError(e);
		}
    }
    
    @GetMapping
    ActionResponse getResponse() {
    	return chatBot.getResTemp();
    }

    private String handleError(Exception e) {
        e.printStackTrace();
        return "Error handling the intent - " + e.getMessage();
    }
}

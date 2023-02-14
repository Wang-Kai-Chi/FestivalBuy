package com.festivalbuy.market.controller;

import com.festivalbuy.market.ChatBot;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping()
    String serveAction(@RequestBody String body, @RequestHeader Map<String, String> headers) {
        try {
            return chatBot.handleRequest(body, headers).get();
        } catch (InterruptedException e) {
            return handleError(e);
        }catch (ExecutionException e) {
        	return handleError(e);
		}
    }

    private String handleError(Exception e) {
        e.printStackTrace();
        System.out.println("Error in App.handleRequest "+e);
        return "Error handling the intent - " + e.getMessage();
    }
}

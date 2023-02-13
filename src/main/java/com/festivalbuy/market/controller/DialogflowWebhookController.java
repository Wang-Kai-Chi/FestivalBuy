package com.festivalbuy.market.controller;

import com.festivalbuy.market.ChatBot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;
import java.util.concurrent.ExecutionException;

public class DialogflowWebhookController {
    @Autowired
    private ChatBot chatBot;

    @RequestMapping(value = "/", method = RequestMethod.POST, produces = { "application/json" })
    String serveAction(@RequestBody String body, @RequestHeader Map<String, String> headers) {
        try {
            return chatBot.handleRequest(body, headers).get();
        } catch (InterruptedException | ExecutionException e) {
            return handleError(e);
        }
    }

    private String handleError(Exception e) {
        e.printStackTrace();
        return "Error handling the intent - " + e.getMessage();
    }
}

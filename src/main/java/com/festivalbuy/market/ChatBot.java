package com.festivalbuy.market;

import com.google.actions.api.ActionRequest;
import com.google.actions.api.ActionResponse;
import com.google.actions.api.DialogflowApp;
import com.google.actions.api.ForIntent;
import com.google.actions.api.response.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;

public class ChatBot extends DialogflowApp {
    @Autowired
    private ProductService productService;

    @ForIntent("sa.agent.products")
    public ActionResponse product(ActionRequest request) {
        ResponseBuilder responseBuilder = getResponseBuilder(request).add(productService.getProductList().toString());
        return responseBuilder.build();
    }
}

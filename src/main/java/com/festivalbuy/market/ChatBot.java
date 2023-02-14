package com.festivalbuy.market;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.actions.api.ActionRequest;
import com.google.actions.api.ActionResponse;
import com.google.actions.api.DialogflowApp;
import com.google.actions.api.ForIntent;
import com.google.actions.api.response.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChatBot extends DialogflowApp {
	@Autowired
    private ProductService productService;

    @ForIntent("FindProductByCategory")
    public ActionResponse product(ActionRequest request) {
    	System.out.println(request.getParameter("category"));
        ResponseBuilder responseBuilder = getResponseBuilder(request).add(getResponseJson());
        return responseBuilder.build();
    }
    
    String getResponseJson() {
    	ObjectMapper mapper = new ObjectMapper();
    	String result = "";
        try {
			result = mapper.writeValueAsString(productService.getProductList());
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
        
        return result;
    }
}

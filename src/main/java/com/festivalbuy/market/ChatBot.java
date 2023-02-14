package com.festivalbuy.market;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.festivalbuy.market.entity.Product;
import com.google.actions.api.ActionRequest;
import com.google.actions.api.ActionResponse;
import com.google.actions.api.DialogflowApp;
import com.google.actions.api.ForIntent;
import com.google.actions.api.response.ResponseBuilder;
import com.google.api.services.actions_fulfillment.v2.model.HtmlResponse;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChatBot extends DialogflowApp {
	@Autowired
	private ProductService productService;

	@ForIntent("FindProductByCategory")
	public ActionResponse findProductByCategory(ActionRequest request) {
		String parameter = (String) request.getParameter("category");
		
		ResponseBuilder responseBuilder = getResponseBuilder(request)
				.add(getResultString(parameter));
		return responseBuilder.build();
	}
	
	String getResultString(String parameter) {
		ArrayList<Product> ps = productService.getProductByCategoryName(parameter);
		
		String result = "";
		
		for(Product p :ps)
			result += p.getTitle()+":"+"$"+p.getPrice();
		
		return result;
	}
	
	HtmlResponse getResult(String parameter) {
		HtmlResponse h = new HtmlResponse();
		ArrayList<Product> ps = productService.getProductByCategoryName(parameter);
		
		String result = "";
		
		for(Product p :ps)
			result += p.getTitle()+":"+"$"+p.getPrice();
		
		h.set("response", result);
		
		return h;
	}

	String getAllProductJson() {
		return getProductJson(productService.getProductList());
	}

	String getProductJson(ArrayList<Product> products) {
		ObjectMapper mapper = new ObjectMapper();
		String result = "";
		try {
			result = mapper.writeValueAsString(products);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return result;
	}
}

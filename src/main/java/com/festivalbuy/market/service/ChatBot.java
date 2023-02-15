package com.festivalbuy.market.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.festivalbuy.market.entity.Product;
import com.google.actions.api.ActionRequest;
import com.google.actions.api.ActionResponse;
import com.google.actions.api.DialogflowApp;
import com.google.actions.api.ForIntent;
import com.google.actions.api.response.ResponseBuilder;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class ChatBot extends DialogflowApp {
	@Autowired
	private ProductService productService;
	
	private ActionResponse resTemp;

	@ForIntent("FindProductByCategory")
	public ActionResponse findProductByCategory(ActionRequest request) {
		ResponseBuilder responseBuilder = getResponseBuilder(request);

		String parameter = (String) request.getParameter("category");
		responseBuilder.add(getProductJson(productService.getProductByCategoryName(parameter)));

		ActionResponse response = responseBuilder.build();
		setResTemp(response);

		return response;
	}

	public void setResTemp(ActionResponse resTemp) {
		this.resTemp = resTemp;
	}

	public ActionResponse getResTemp() {
		return resTemp;
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

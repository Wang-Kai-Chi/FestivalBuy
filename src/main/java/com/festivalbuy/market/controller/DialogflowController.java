package com.festivalbuy.market.controller;

import java.io.StringWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;

public class DialogflowController {
//	@Autowired
//	private GsonFactory gsonFactory;

	@PostMapping("/webhook")
	public String webhook(String rawData) {
		//Step 1. Parse the request
//		GoogleCloudDialogflowV2WebhookRequest  request = jacksonFactory
//                        .createJsonParser(rawData)
//                        .parse(GoogleCloudDialogflowV2WebhookRequest.class);

        //Step 2. Process the request
        //Step 3. Build the response message
//        GoogleCloudDialogflowV2IntentMessage msg = new GoogleCloudDialogflowV2IntentMessage();
//        GoogleCloudDialogflowV2IntentMessageText text = new GoogleCloudDialogflowV2IntentMessageText();
//        text.setText("Welcome to Spring Boot");
//        msg.setText(text);
//
//        GoogleCloudDialogflowV2WebhookResponse response = new GoogleCloudDialogflowV2WebhookResponse();
//        response.setFulfillmentMessages(asList(msg));
        StringWriter stringWriter = new StringWriter();
//        JsonGenerator jsonGenerator = jacksonFactory.createJsonGenerator(stringWriter);
//        jsonGenerator.enablePrettyPrint();
//        jsonGenerator.serialize(response);
//        jsonGenerator.flush();
        return stringWriter.toString();
	}
}

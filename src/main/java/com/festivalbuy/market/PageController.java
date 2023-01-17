package com.festivalbuy.market;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

	@RequestMapping("/shopping_cart")
	String shopping_cart() {
		return "shopping_cart";
	}
	
	
}

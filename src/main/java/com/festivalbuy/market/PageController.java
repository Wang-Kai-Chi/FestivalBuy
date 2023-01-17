package com.festivalbuy.market;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

	@RequestMapping("/shopping_cart")
	String shopping_cart() {
		return "shopping_cart";
	}
	
	@RequestMapping("/checkout_screen")
	String checkout_screen() {
		return "checkout_screen";
	}
	
	@RequestMapping("/checkout_finished")
	String checkout_finished() {
		return "checkout_finished";
	}
	
	@RequestMapping("/order_tracking")
	String order_tracking() {
		return "order_tracking";
	}
}

package com.festivalbuy.market.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
	
	@RequestMapping("/")
	String index() {
		return "./index";
	}

	@RequestMapping("/shopping_cart")
	String shopping_cart() {
		return "./shopping_cart";
	}
	
	@RequestMapping("/checkout_screen")
	String checkout_screen() {
		return "./checkout_screen";
	}
	
	@RequestMapping("/order_tracking")
	String order_tracking() {
		return "./order_tracking";
	}

	@RequestMapping("/front_page")
	String front_page(){
		return "./front_page";
	}

	@RequestMapping("/product_page")
	String product_page(){
		return "./product_page";
	}
	@RequestMapping("/login")
	String login() {
		return "./login";
	}
	
	@RequestMapping("/header")
	String header() {
		return "./header";
	}
	
	@RequestMapping("/footer")
	String footer() {
		return "./footer";
	}
	
	@RequestMapping("/search_result")
	String search_result() {
		return "./search_result";
	}
}

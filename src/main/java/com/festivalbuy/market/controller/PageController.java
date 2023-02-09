package com.festivalbuy.market.controller;

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

	@RequestMapping("/front_page")
	String front_page(){
		return "front_page";
	}

	@RequestMapping("/product_page")
	String product_page(){
		return "product_page";
	}
	@RequestMapping("/logintest")
	String logintest() {
		return "logintest";
	}
	@RequestMapping("/registertest")
	String registertest() {
		return "registertest";
	}
	
	@RequestMapping("/memberV2")
	String memberV2() {
		return "memberV2";
	}
}

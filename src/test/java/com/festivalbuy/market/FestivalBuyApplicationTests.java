package com.festivalbuy.market;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.festivalbuy.market.controller.OrderDetailController;

@SpringBootTest
class FestivalBuyApplicationTests {
	@Autowired
	OrderDetailController orderDetailController;

	@Test
	void contextLoads() {
	}
	
	@Test
	void printData() {
		System.out.println(orderDetailController.getOrderDetailsWithSameCustomer(1));
	}

}

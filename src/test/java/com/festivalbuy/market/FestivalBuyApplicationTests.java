package com.festivalbuy.market;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.festivalbuy.market.controller.CustomerController;
import com.festivalbuy.market.controller.OrderDetailController;

@SpringBootTest
class FestivalBuyApplicationTests {
	@Autowired
	OrderDetailController orderDetailController;
	@Autowired
	CustomerController customerController;
	
	void printData() {
		System.out.println(orderDetailController.getOrderDetailsWithSameCustomer(1));
	}

	@Test
	void testCustomerEmail() {
		assert(customerController.checkPassword(
				customerController.getCustomerById(1).get(), 
				customerController.findCustomerByEmail("food@gmail.com")));
	}
}

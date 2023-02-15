package com.festivalbuy.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.Customer;
import com.festivalbuy.market.entity.ProductOrder;
import com.festivalbuy.market.service.CustomerService;
import com.festivalbuy.market.service.ProductOrderService;

@RestController
@RequestMapping("/api/orders")
public class ProductOrderController {
	@Autowired
	private ProductOrderService productOrderService;
	@Autowired
	private CustomerService customerService;

	@GetMapping
	Iterable<ProductOrder> getOrders() {
		return productOrderService.getOrders();
	}

	@PostMapping
	ProductOrder addOrder(@RequestBody ProductOrder productOrder) {
		Customer customer = productOrder.getCustomer();
		
		productOrder.setCustomer(customerService.getCustomerIfExist(customer));
		productOrder.setOrder_id(productOrderService.getNewOrderId(productOrder));

		return productOrderService.addOrder(productOrder);
	}
}

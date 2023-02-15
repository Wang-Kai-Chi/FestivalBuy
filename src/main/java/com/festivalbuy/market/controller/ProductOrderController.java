package com.festivalbuy.market.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.ProductOrderService;
import com.festivalbuy.market.entity.Customer;
import com.festivalbuy.market.entity.ProductOrder;
import com.festivalbuy.market.repo.CustomerRepository;

@RestController
@RequestMapping("/api/orders")
public class ProductOrderController {
	@Autowired
	private ProductOrderService productOrderService;
	@Autowired
	private CustomerRepository customerRepo;

	@GetMapping
	Iterable<ProductOrder> getOrders() {
		return productOrderService.getOrders();
	}

	@PostMapping
	ProductOrder addOrder(@RequestBody ProductOrder productOrder) {
		Customer customer = productOrder.getCustomer();
		
		productOrder.setCustomer(getCustomerIfExist(customer));
		productOrder.setOrder_id(productOrderService.getNewOrderId(productOrder));

		return productOrderService.addOrder(productOrder);
	}
	
	private Customer getCustomerIfExist(Customer customer) {
		Optional<Customer> temp = customerRepo.findById(customer.getCustomer_id());
		
		return (temp.isPresent())?temp.get():customer;
	}
}

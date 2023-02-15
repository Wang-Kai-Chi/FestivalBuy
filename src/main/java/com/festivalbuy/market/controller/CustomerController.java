package com.festivalbuy.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.Customer;
import com.festivalbuy.market.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
	@Autowired
	private CustomerService customerService;

	@GetMapping
	Iterable<Customer> getCustomers() {
		return customerService.getCustomers();
	}

	@PostMapping
	Customer addCustomer(@RequestBody Customer customer) {
		return customerService.addCustomer(customer);
	}

	@PostMapping("/check")
	ResponseEntity<Customer> login(@RequestBody Customer customer) {
		return customerService.login(customer);
	}
}

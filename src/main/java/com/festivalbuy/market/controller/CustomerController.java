package com.festivalbuy.market.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.Customer;
import com.festivalbuy.market.repo.CustomerRepository;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
	private CustomerRepository customerRepository;
	
	public CustomerController(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
	
	@GetMapping
	Iterable<Customer> getCustomers() {
		return  customerRepository.findAll();
	}
}

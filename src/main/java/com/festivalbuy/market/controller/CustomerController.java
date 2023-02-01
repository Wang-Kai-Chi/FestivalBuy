package com.festivalbuy.market.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.Customer;
import com.festivalbuy.market.repo.CustomerRepository;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
	private CustomerRepository repository;
	
	public CustomerController(CustomerRepository customerRepository) {
		this.repository = customerRepository;
	}
	
	@GetMapping
	Iterable<Customer> getCustomers() {
		return  repository.findAll();
	}
	
	@PostMapping
	Customer addCustomer(@RequestBody Customer customer) {
		return repository.save(customer);
	}
}

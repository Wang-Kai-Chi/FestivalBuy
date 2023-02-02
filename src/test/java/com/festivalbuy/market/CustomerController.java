package com.festivalbuy.market;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class CustomerController {
	private CustomerRepository customerRepository;
	
	public CustomerController(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	
	}
	@RequestMapping(path="/customers")
	Iterable<Customer> getCustomer() {
		return customerRepository.findAll();
	}
}

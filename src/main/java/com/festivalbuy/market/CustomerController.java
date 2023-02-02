package com.festivalbuy.market;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
	private CustomerRepository repository;
	public CustomerController(CustomerRepository customerRepository) {
		this.repository = customerRepository;
		
	}
	@GetMapping
	Iterable<com.festivalbuy.market.Customer> Customer() {
		return repository.findAll();
	}
	@PostMapping
	Customer addCustormer(@RequestBody Customer customer) {
		return repository.save(customer);
	}
}

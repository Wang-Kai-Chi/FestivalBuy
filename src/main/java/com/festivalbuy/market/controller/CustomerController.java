package com.festivalbuy.market.controller;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	private CustomerRepository customerRepository;

	public CustomerController(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	@GetMapping
	Iterable<Customer> getCustomers() {
		return customerRepository.findAll();
	}

	public Optional<Customer> getCustomerById(Integer id) {
		return customerRepository.findById(id);
	}

	@PostMapping
	Customer addCustomer(@RequestBody Customer customer) {
		return customerRepository.save(customer);
	}

	@PostMapping("/check")
	ResponseEntity<Customer> login(@RequestBody Customer customer) {
		Customer temp = findCustomerByEmail(customer.getEmail());

		return (Objects.equals(customer.getPassword(), temp.getPassword()))
				? new ResponseEntity<>(getCustomerById(temp.getCustomer_id()).get(), HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}

	public Customer findCustomerByEmail(String email) {
		ArrayList<Customer> list = (ArrayList<Customer>) customerRepository.findAll();
		Customer temp = new Customer();

		for (Customer c : list) {
			if (Objects.equals(c.getEmail(), email)) {
				temp = c;
			}
		}

		return temp;
	}

	public boolean checkPassword(Customer a, Customer b) {
		return Objects.equals(a.getPassword(), b.getPassword());
	}
}

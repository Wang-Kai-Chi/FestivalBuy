package com.festivalbuy.market.service;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.festivalbuy.market.entity.Customer;
import com.festivalbuy.market.repo.CustomerRepository;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository customerRepository;
	
	public Iterable<Customer> getCustomers() {
		return customerRepository.findAll();
	}
	
	public Optional<Customer> getCustomerById(Integer id) {
		return customerRepository.findById(id);
	}
	
	public Customer addCustomer(Customer customer) {
		return customerRepository.save(customer);
	}
	
	public ResponseEntity<Customer> login(Customer customer) {
		Customer temp = findCustomerByEmail(customer.getEmail());

		return (Objects.equals(customer.getPassword(), temp.getPassword()))
				? new ResponseEntity<>(getCustomerById(temp.getCustomer_id()).get(), HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}

	public Customer findCustomerByEmail(String email) {
		ArrayList<Customer> list = (ArrayList<Customer>) customerRepository.findAll();
		Customer temp = new Customer();

		for (Customer c : list) {
			if (Objects.equals(c.getEmail(), email)) 
				temp = c;
		}
		return temp;
	}

	public boolean checkPassword(Customer a, Customer b) {
		return Objects.equals(a.getPassword(), b.getPassword());
	}
	
	public Customer getCustomerIfExist(Customer customer) {
		Optional<Customer> temp = getCustomerById(customer.getCustomer_id());
		
		return (temp.isPresent())?temp.get():customer;
	}
}

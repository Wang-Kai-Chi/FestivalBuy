package com.festivalbuy.market.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.Customer;
import com.festivalbuy.market.entity.ProductOrder;
import com.festivalbuy.market.repo.CustomerRepository;
import com.festivalbuy.market.repo.ProductOrderRepository;

@RestController
@RequestMapping("/api/orders")
public class ProductOrderController {
	private ProductOrderRepository productOrderRepo;
	private CustomerRepository customerRepo;

	public ProductOrderController(ProductOrderRepository repository, CustomerRepository customerRepo) {
		this.productOrderRepo = repository;
		this.customerRepo = customerRepo;
	}

	@GetMapping
	Iterable<ProductOrder> getOrders() {
		return productOrderRepo.findAll();
	}

	@PostMapping
	ProductOrder addOrder(@RequestBody ProductOrder productOrder) {
		Customer customer = productOrder.getCustomer();
		
		productOrder.setCustomer(getNewCustomer(customer));
		productOrder.setOrder_id(getNewOrderId(productOrder));

		return productOrderRepo.save(productOrder);
	}

	private int getNewOrderId(ProductOrder productOrder) {
		ArrayList<ProductOrder> productList = (ArrayList<ProductOrder>)productOrderRepo.findAll();
		int orderSize = productList.size();
		Integer id = productOrder.getOrder_id();

		return (id <= orderSize) ? ++orderSize : id;
	}
	
	private Customer getNewCustomer(Customer customer) {
		Optional<Customer> temp = customerRepo.findById(customer.getCustomer_id());
		
		return (temp.isPresent())?temp.get():null;
	}
}

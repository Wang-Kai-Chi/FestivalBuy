package com.festivalbuy.market;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.ProductOrder;
import com.festivalbuy.market.repo.ProductOrderRepository;

@RestController
@RequestMapping("/api/orders")
public class ProductOrderController {
	private ProductOrderRepository repository;

	public ProductOrderController(ProductOrderRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping
	Iterable<ProductOrder> getOrders() {
		return repository.findAll();
	}
}

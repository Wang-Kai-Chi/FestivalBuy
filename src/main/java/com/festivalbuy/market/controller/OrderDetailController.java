package com.festivalbuy.market.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.OrderDetail;
import com.festivalbuy.market.repo.OrderDetailRepository;

@RestController
@RequestMapping("/api/order_details")
public class OrderDetailController {
	private OrderDetailRepository repository;

	public OrderDetailController(OrderDetailRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	Iterable<OrderDetail> getOrderDetails() {
		return repository.findAll();
	}
}

package com.festivalbuy.market;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.festivalbuy.market.entity.OrderDetail;
import com.festivalbuy.market.repo.OrderDetailRepository;

public class OrderDetailController {
	private OrderDetailRepository repository;

	public OrderDetailController(OrderDetailRepository repository) {
		this.repository = repository;
	}
	
	@PostMapping
	OrderDetail addOrderDetail(@RequestBody OrderDetail orderDetail) {
		return repository.save(orderDetail);
	}
}

package com.festivalbuy.market.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.OrderDetail;
import com.festivalbuy.market.service.OrderDetailService;

@RestController
@RequestMapping("/api/order_details")
public class OrderDetailController {
	@Autowired
	private OrderDetailService orderDetailService;

	@GetMapping
	Iterable<OrderDetail> getOrderDetails() {
		return orderDetailService.getOrderDetails();
	}

	@GetMapping("/customer/{customerId}")
	List<OrderDetail> getOrderDetailByCustomerId(@PathVariable Integer customerId) {

		return orderDetailService.getOrderDetailsByCustomerId(customerId);
	}

	@GetMapping("/{orderId}/{productId}")
	Optional<OrderDetail> getOrderDetailByCompositeId(@PathVariable Integer orderId, @PathVariable Integer productId) {

		return orderDetailService.getOrderDetailByCompositeId(orderId, productId);
	}

	@PostMapping
	Iterable<OrderDetail> addOrderDetails(@RequestBody Iterable<OrderDetail> orderDetails) {

		return orderDetailService.addOrderDetails(orderDetails);
	}
}

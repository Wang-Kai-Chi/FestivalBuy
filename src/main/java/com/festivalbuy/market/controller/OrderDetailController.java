package com.festivalbuy.market.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.OrderDetail;
import com.festivalbuy.market.entity.OrderDetailKey;
import com.festivalbuy.market.entity.Product;
import com.festivalbuy.market.entity.ProductOrder;
import com.festivalbuy.market.repo.OrderDetailRepository;
import com.festivalbuy.market.repo.ProductOrderRepository;
import com.festivalbuy.market.repo.ProductRepository;

@RestController
@RequestMapping("/api/order_details")
public class OrderDetailController {
	private OrderDetailRepository orderDetailRepo;
	private ProductRepository productRepo;
	private ProductOrderRepository productOrderRepo;

	public OrderDetailController(OrderDetailRepository orderDetailRepo, ProductRepository productRepo,
			ProductOrderRepository productOrderRepo) {
		super();
		this.orderDetailRepo = orderDetailRepo;
		this.productRepo = productRepo;
		this.productOrderRepo = productOrderRepo;
	}

	@GetMapping
	Iterable<OrderDetail> getOrderDetails() {
		return orderDetailRepo.findAll();
	}

	@PostMapping
	Iterable<OrderDetail> addOrderDetails(@RequestBody Iterable<OrderDetail> orderDetails) {
		ArrayList<OrderDetail> detailList = (ArrayList<OrderDetail>) orderDetails;

		for (OrderDetail o : detailList) {
			OrderDetailKey key = new OrderDetailKey();

			key.setProduct(getProductWithKey(o.getOrderDetailKey()));
			key.setProductOrder(getOrderWithKey(o.getOrderDetailKey()));

			o.setOrderDetailKey(key);
		}

		return orderDetailRepo.saveAll(detailList);
	}

	private ProductOrder getOrderWithKey(OrderDetailKey orderDetailKey) {
		Optional<ProductOrder> po = productOrderRepo.findById(orderDetailKey.getProductOrder().getOrder_id());
		
		return (po.isPresent())?po.get():null;

	}

	private Product getProductWithKey(OrderDetailKey orderDetailKey) {
		Optional<Product> p = productRepo.findById(orderDetailKey.getProduct().getProduct_id());
		return (p.isPresent())?p.get():null;
	}
}

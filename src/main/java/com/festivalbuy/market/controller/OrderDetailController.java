package com.festivalbuy.market.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	@Autowired
	private OrderDetailRepository orderDetailRepo;
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private ProductOrderRepository productOrderRepo;

	@GetMapping
	Iterable<OrderDetail> getOrderDetails() {
		return orderDetailRepo.findAll();
	}

	@GetMapping("/customer/{customerId}")
	ArrayList<OrderDetail> getOrderDetailByCustomerId(@PathVariable Integer customerId) {

		return getOrderDetailWithSameCustomer(customerId);
	}

	ArrayList<OrderDetail> getOrderDetailWithSameCustomer(Integer customerId) {
		ArrayList<ProductOrder> orderList = getOrdersWithSameCustomer(customerId);

		ArrayList<OrderDetail> detailList = (ArrayList<OrderDetail>) orderDetailRepo.findAll();
		ArrayList<OrderDetail> temp = new ArrayList<>();

		for (ProductOrder p : orderList) {
			for (OrderDetail o : detailList) {
				if (p == o.getOrderDetailKey().getProductOrder())
					temp.add(o);
			}
		}
		return temp;
	}

	public ArrayList<ProductOrder> getOrdersWithSameCustomer(Integer customerId) {
		ArrayList<ProductOrder> orderList = (ArrayList<ProductOrder>) productOrderRepo.findAll();
		ArrayList<ProductOrder> temp = new ArrayList<>();

		for (ProductOrder p : orderList) {
			if (p.getCustomer().getCustomer_id() == customerId) {
				Integer orderId = p.getOrder_id();

				temp.add(getOrderWithKey(orderId));
			}
		}

		return temp;
	}

	@GetMapping("/{orderId}/{productId}")
	Optional<OrderDetail> getOrderDetailByCompositeId(@PathVariable Integer orderId, @PathVariable Integer productId) {
		OrderDetailKey orderDetailKey = new OrderDetailKey();

		orderDetailKey.setProductOrder(getOrderWithKey(orderId));
		orderDetailKey.setProduct(getProductWithKey(productId));

		return orderDetailRepo.findById(orderDetailKey);
	}

	@PostMapping
	Iterable<OrderDetail> addOrderDetails(@RequestBody Iterable<OrderDetail> orderDetails) {
		ArrayList<OrderDetail> detailList = (ArrayList<OrderDetail>) orderDetails;

		for (OrderDetail o : detailList) {
			OrderDetailKey old = o.getOrderDetailKey();
			OrderDetailKey key = new OrderDetailKey();

			key.setProduct(getProductWithKey(old.getProduct().getProduct_id()));
			key.setProductOrder(getOrderWithKey(old.getProductOrder().getOrder_id()));

			o.setOrderDetailKey(key);
		}

		return orderDetailRepo.saveAll(detailList);
	}

	private ProductOrder getOrderWithKey(Integer id) {
		Optional<ProductOrder> po = productOrderRepo.findById(id);

		return (po.isPresent()) ? po.get() : null;

	}

	private Product getProductWithKey(Integer id) {
		Optional<Product> p = productRepo.findById(id);
		return (p.isPresent()) ? p.get() : null;
	}
}

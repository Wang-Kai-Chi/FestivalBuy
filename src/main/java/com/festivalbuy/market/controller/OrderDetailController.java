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

import com.festivalbuy.market.ProductOrderService;
import com.festivalbuy.market.ProductService;
import com.festivalbuy.market.entity.OrderDetail;
import com.festivalbuy.market.entity.OrderDetailKey;
import com.festivalbuy.market.entity.Product;
import com.festivalbuy.market.entity.ProductOrder;
import com.festivalbuy.market.repo.OrderDetailRepository;
import com.festivalbuy.market.repo.ProductOrderRepository;

@RestController
@RequestMapping("/api/order_details")
public class OrderDetailController {
	@Autowired
	private OrderDetailRepository orderDetailRepo;
	@Autowired
	private ProductService productService;
	@Autowired
	private ProductOrderService productOrderService;

	@GetMapping
	Iterable<OrderDetail> getOrderDetails() {
		Iterable<OrderDetail> orderDetails = orderDetailRepo.findAll();
		
		for(OrderDetail o: orderDetails) {
			Product p =o.getOrderDetailKey().getProduct();
			p.setImageurl(productService.findProductById(p.getProduct_id()).getImageurl());
		}
		
		return orderDetails;
	}

	@GetMapping("/customer/{customerId}")
	ArrayList<OrderDetail> getOrderDetailByCustomerId(@PathVariable Integer customerId) {

		return getOrderDetailsWithSameCustomer(customerId);
	}

	public ArrayList<OrderDetail> getOrderDetailsWithSameCustomer(Integer customerId) {
		ArrayList<ProductOrder> orderList = productOrderService.getOrdersWithSameCustomer(customerId);

		ArrayList<OrderDetail> detailList = (ArrayList<OrderDetail>) getOrderDetails();
		ArrayList<OrderDetail> temp = new ArrayList<>();

		for (ProductOrder p : orderList) {
			for (OrderDetail o : detailList) {
				OrderDetailKey ok = o.getOrderDetailKey();
				if (p == ok.getProductOrder()) {
					temp.add(o);
				}
			}
		}
		return temp;
	}

	@GetMapping("/{orderId}/{productId}")
	Optional<OrderDetail> getOrderDetailByCompositeId(@PathVariable Integer orderId, @PathVariable Integer productId) {
		OrderDetailKey orderDetailKey = new OrderDetailKey();

		orderDetailKey.setProductOrder(productOrderService.getOrderWithKey(orderId));
		orderDetailKey.setProduct(productService.findProductById(productId));

		return orderDetailRepo.findById(orderDetailKey);
	}

	@PostMapping
	Iterable<OrderDetail> addOrderDetails(@RequestBody Iterable<OrderDetail> orderDetails) {
		ArrayList<OrderDetail> detailList = (ArrayList<OrderDetail>) orderDetails;

		for (OrderDetail o : detailList) {
			OrderDetailKey old = o.getOrderDetailKey();
			OrderDetailKey key = new OrderDetailKey();

			key.setProduct(productService.findProductById(old.getProduct().getProduct_id()));
			key.setProductOrder(productOrderService.getOrderWithKey(old.getProductOrder().getOrder_id()));

			o.setOrderDetailKey(key);
		}

		return orderDetailRepo.saveAll(detailList);
	}
}

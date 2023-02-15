package com.festivalbuy.market.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.festivalbuy.market.entity.OrderDetail;
import com.festivalbuy.market.entity.OrderDetailKey;
import com.festivalbuy.market.entity.Product;
import com.festivalbuy.market.entity.ProductOrder;
import com.festivalbuy.market.repo.OrderDetailRepository;

@Service
public class OrderDetailService {
	@Autowired
	private OrderDetailRepository orderDetailRepo;
	@Autowired
	private ProductService productService;
	@Autowired
	private ProductOrderService productOrderService;
	
	public Iterable<OrderDetail> getOrderDetails() {
		Iterable<OrderDetail> orderDetails = orderDetailRepo.findAll();
		
		for(OrderDetail o: orderDetails) {
			Product p =o.getOrderDetailKey().getProduct();
			p.setImageurl(productService.findProductById(p.getProduct_id()).getImageurl());
		}
		
		return orderDetails;
	}
	
	public List<OrderDetail> getOrderDetailsWithSameCustomer(Integer customerId) {
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
	
	public Optional<OrderDetail> getOrderDetailByCompositeId(Integer orderId, Integer productId) {
		OrderDetailKey orderDetailKey = new OrderDetailKey();

		orderDetailKey.setProductOrder(productOrderService.getOrderWithKey(orderId));
		orderDetailKey.setProduct(productService.findProductById(productId));

		return orderDetailRepo.findById(orderDetailKey);
	}
	
	public Iterable<OrderDetail> addOrderDetails(Iterable<OrderDetail> orderDetails) {
		ArrayList<OrderDetail> detailList = (ArrayList<OrderDetail>) orderDetails;

		for (OrderDetail o : detailList) {
			OrderDetailKey oldK = o.getOrderDetailKey();
			OrderDetailKey newK = new OrderDetailKey();

			newK.setProduct(productService.findProductById(oldK.getProduct().getProduct_id()));
			newK.setProductOrder(productOrderService.getOrderWithKey(oldK.getProductOrder().getOrder_id()));

			o.setOrderDetailKey(newK);
		}

		return orderDetailRepo.saveAll(detailList);
	}
}

package com.festivalbuy.market.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.festivalbuy.market.entity.OrderDetail;
import com.festivalbuy.market.entity.OrderDetailId;
import com.festivalbuy.market.entity.Product;
import com.festivalbuy.market.entity.ProductOrder;
import com.festivalbuy.market.repo.OrderDetailRepository;

@Service
public class OrderDetailService {
	@Autowired
	private OrderDetailRepository orderDetailRepo;
	@Autowired
	private ProductOrderService productOrderService;

	public Iterable<OrderDetail> getOrderDetails() {
		return orderDetailRepo.findAll();
	}

	public List<OrderDetail> getOrderDetailsByCustomerId(Integer customerId) {
		ArrayList<ProductOrder> orderList = (ArrayList<ProductOrder>) productOrderService.findByCustomerId(customerId);
		ArrayList<OrderDetail> temp = new ArrayList<>();

		for (ProductOrder p : orderList) {
			temp.addAll(orderDetailRepo.findByProductOrderId(p.getOrder_id()));
		}
		return temp;
	}

	public Optional<OrderDetail> getOrderDetailByCompositeId(Integer orderId, Integer productId) {
		return orderDetailRepo.findByCompositeId(orderId, productId);
	}

	public Iterable<OrderDetail> addOrderDetails(Iterable<OrderDetail> orderDetails) {
		ArrayList<OrderDetail> detailList = (ArrayList<OrderDetail>) orderDetails;

		for (OrderDetail o : detailList) {
			OrderDetailId oldK = o.getOrderDetailKey();
			detailList.add(orderDetailRepo.findByCompositeId(
					oldK.getProduct().getProduct_id(), 
					oldK.getProductOrder().getOrder_id())
					.get());
		}
		return orderDetailRepo.saveAll(detailList);
	}
}

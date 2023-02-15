package com.festivalbuy.market;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.festivalbuy.market.entity.ProductOrder;
import com.festivalbuy.market.repo.ProductOrderRepository;

@Service
public class ProductOrderService {
	@Autowired
	private ProductOrderRepository productOrderRepo;
	
	public Iterable<ProductOrder> getOrders() {
		return productOrderRepo.findAll();
	}
	
	public ProductOrder addOrder(ProductOrder productOrder) {
		return productOrderRepo.save(productOrder);
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
	
	public int getNewOrderId(ProductOrder productOrder) {
		ArrayList<ProductOrder> orderList = (ArrayList<ProductOrder>)productOrderRepo.findAll();
		int orderSize = orderList.size();
		Integer id = productOrder.getOrder_id();

		return (id <= orderSize) ? ++orderSize : id;
	}
	
	public ProductOrder getOrderWithKey(Integer id) {
		Optional<ProductOrder> order = productOrderRepo.findById(id);

		return (order.isPresent()) ? order.get() : null;

	}
}

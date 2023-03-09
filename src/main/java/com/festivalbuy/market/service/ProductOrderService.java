package com.festivalbuy.market.service;

import java.util.List;
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
	
	public List<ProductOrder> findByCustomerId(Integer customerId) {

		return productOrderRepo.findByCustomerId(customerId);
	}
	
	public long getNewId(ProductOrder productOrder) {
		long orderSize = productOrderRepo.count();
		Integer id = productOrder.getOrder_id();

		return (id <= orderSize) ? ++orderSize : id;
	}
	
	public ProductOrder findById(Integer id) {
		return productOrderRepo.findById(id).get();
	}
}

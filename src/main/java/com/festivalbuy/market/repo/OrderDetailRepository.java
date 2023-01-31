package com.festivalbuy.market.repo;

import org.springframework.data.repository.CrudRepository;

import com.festivalbuy.market.entity.OrderDetail;
import com.festivalbuy.market.entity.ProductOrder;

public interface OrderDetailRepository extends CrudRepository<OrderDetail, ProductOrder>{

}

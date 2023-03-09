package com.festivalbuy.market.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.festivalbuy.market.entity.ProductOrder;

public interface ProductOrderRepository extends JpaRepository<ProductOrder, Integer>{

	@Query("select p from ProductOrder p where customer_id = :cid")
	List<ProductOrder> findByCustomerId(@Param("cid") Integer cid);
}

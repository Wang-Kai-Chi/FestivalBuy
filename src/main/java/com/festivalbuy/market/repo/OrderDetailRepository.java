package com.festivalbuy.market.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.festivalbuy.market.entity.OrderDetail;
import com.festivalbuy.market.entity.OrderDetailId;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailId>{
	
	@Query("select o from OrderDetail o where order_id = :oid")
	List<OrderDetail> findByProductOrderId(@Param("oid") Integer oid);
	
	@Query("select o from OrderDetail o where order_id = :oid and product_id = :pid")
	Optional<OrderDetail> findByCompositeId(@Param("oid") Integer orderId,@Param("pid") Integer productId);
}

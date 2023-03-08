package com.festivalbuy.market.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.festivalbuy.market.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

	@Query("select p from Product p where category_id = :cid")
	List<Product> findByCategoryId(@Param("cid") Integer cid);
}

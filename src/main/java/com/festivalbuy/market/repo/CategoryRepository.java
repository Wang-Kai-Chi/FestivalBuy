package com.festivalbuy.market.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.festivalbuy.market.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
	
	@Query("select c from Category c where name = :cname")
	Category findByName(@Param("cname") String name);
}

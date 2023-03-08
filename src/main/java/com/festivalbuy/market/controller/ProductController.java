package com.festivalbuy.market.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.Product;
import com.festivalbuy.market.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@GetMapping
	Iterable<Product> getProducts() {
		return productService.getProductList();
	}
	
	@GetMapping("/{id}")
	Product getProduct(@PathVariable Integer id) {		
		return productService.findProductById(id);
	}
	
	@GetMapping("/category/{cid}")
	List<Product> getProductsByCategory(@PathVariable Integer cid) {
		return productService.getProductByCategoryId(cid);
	}
}

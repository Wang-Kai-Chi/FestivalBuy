package com.festivalbuy.market;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	private ProductRepository productRepository;

	public ProductController(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	@GetMapping
	Iterable<Product> getProducts() {
		return productRepository.findAll();
	}
	
	@GetMapping("/{id}")
	Optional<Product> getProduct(@PathVariable Integer id) {
		return productRepository.findById(id);
	}
}

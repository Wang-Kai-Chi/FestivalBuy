package com.festivalbuy.market;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.festivalbuy.market.entity.Category;
import com.festivalbuy.market.repo.CategoryRepository;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	private CategoryRepository categoryRepository;

	public CategoryController(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}
	
	@GetMapping
	Iterable<Category> getCategory() {
		return categoryRepository.findAll(); 
	}
}

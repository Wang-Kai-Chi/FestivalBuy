package com.festivalbuy.market.service;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.festivalbuy.market.entity.Product;
import com.festivalbuy.market.repo.CategoryRepository;
import com.festivalbuy.market.repo.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private CategoryRepository categoryRepo;

	private String prefix = "/imgs/";

	@PostConstruct
	void setProductsWithNewImageUrl() {
		Iterable<Product> products = productRepo.findAll();
		
		for (Product p : products) {
			if(!p.getImageurl().startsWith(prefix))
				p.setImageurl(prefix + p.getImageurl());
		}

		productRepo.saveAll(products);
	}

	public Product findProductById(Integer id) {
		return productRepo.findById(id).get();
	}

	public List<Product> getProductByCategoryName(String cname) {
		return productRepo.findByCategoryId(categoryRepo.findByName(cname).getCategory_id());
	}

	public List<Product> getProductByCategoryId(Integer cid) {
		return productRepo.findByCategoryId(cid);
	}

	public List<Product> getProductList() {
		return productRepo.findAll();
	}

}

package com.festivalbuy.market.service;

import java.util.List;
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

	private Iterable<Product> getProductsWithNewImageUrl(Iterable<Product> products) {
		for (Product p : products)
			p.setImageurl(prefix + p.getImageurl());

		return products;
	}

	private Product getProductWithNewImageURL(Product p) {
		p.setImageurl(prefix + p.getImageurl());
		return p;
	}

	public Product findProductById(Integer id) {
		return getProductWithNewImageURL(productRepo.findById(id).get());
	}

	public List<Product> getProductByCategoryName(String cname) {
		return (List<Product>) getProductsWithNewImageUrl(
				productRepo.findByCategoryId(categoryRepo.findByName(cname).getCategory_id()));
	}

	public List<Product> getProductByCategoryId(Integer cid) {
		return (List<Product>) getProductsWithNewImageUrl(productRepo.findByCategoryId(cid));
	}

	public List<Product> getProductList() {
		return (List<Product>) getProductsWithNewImageUrl(productRepo.findAll());
	}

}

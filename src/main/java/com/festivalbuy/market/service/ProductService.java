package com.festivalbuy.market.service;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.festivalbuy.market.entity.Product;
import com.festivalbuy.market.repo.ProductRepository;

@Service
public class ProductService {
	private ProductRepository productRepository;
	private ArrayList<Product> productList;
	private String prefix = "/imgs/";

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;

		productList = getProductsWithNewImageUrl();
	}

	private ArrayList<Product> getProductsWithNewImageUrl() {
		ArrayList<Product> products = (ArrayList<Product>) productRepository.findAll();
		
		for (Product p : products) 
			p.setImageurl(prefix + p.getImageurl());

		return products;
	}

	public Product findProductById(Integer id) {
		Product product = null;

		for (Product p : productList) {
			if (Objects.equals(p.getProduct_id(), id))
				product = p;
		}

		return product;
	}
	
	public ArrayList<Product> getProductByCategoryName(String cname){
		ArrayList<Product> temp = new ArrayList<>();
		
		for(Product p :productList) {
			if(p.getCategory().getName().equals(cname)) 
				temp.add(p);
			
		}
		
		return temp;
	}

	public ArrayList<Product> getProductList() {
		return productList;
	}

}

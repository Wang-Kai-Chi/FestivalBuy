package com.festivalbuy.market.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Product {
	@Id
	private Integer product_id;

	private String title;
	private Integer price;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "category_id")
	private Category category;
	
	private String imageurl;
	private String description;
	private Integer is_stock;

	public Integer getProduct_id() {
		return product_id;
	}

	public void setProduct_id(Integer product_id) {
		this.product_id = product_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getImageurl() {
		return imageurl;
	}

	public void setImageurl(String imageurl) {
		this.imageurl = imageurl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getIs_stock() {
		return is_stock;
	}

	public void setIs_stock(Integer is_stock) {
		this.is_stock = is_stock;
	}

	@Override
	public String toString() {
		return "Product [product_id=" + product_id + ", title=" + title + ", price=" + price + ", category=" + category
				+ ", imageurl=" + imageurl + ", description=" + description + ", is_stock=" + is_stock + "]";
	}

}

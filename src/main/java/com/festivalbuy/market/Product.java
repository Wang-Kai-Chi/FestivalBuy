package com.festivalbuy.market;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Product {
	@Id
	private Integer product_id;

	private String title;
	private Integer price;
	private Integer category_id;
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

	public Integer getCategory_id() {
		return category_id;
	}

	public void setCategory_id(Integer category_id) {
		this.category_id = category_id;
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
		return "Product [product_id=" + product_id + ", title=" + title + ", price=" + price + ", category_id="
				+ category_id + ", imageurl=" + imageurl + ", description=" + description + ", is_stock=" + is_stock
				+ "]";
	}

}

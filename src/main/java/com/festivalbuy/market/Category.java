package com.festivalbuy.market;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Category {
	@Id
	private Integer category_id;
	private String name;

	public Integer getCategory_id() {
		return category_id;
	}

	public void setCategory_id(Integer category_id) {
		this.category_id = category_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Category [category_id=" + category_id + ", name=" + name + "]";
	}

}

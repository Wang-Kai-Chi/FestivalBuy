package com.festivalbuy.market.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class OrderDetailKey implements Serializable{
	@Column(name = "order_id")
	private Integer order_id;
	@Column(name = "product_id")
	private Integer product_id;
	
	public Integer getOrder_id() {
		return order_id;
	}

	public void setOrder_id(Integer order_id) {
		this.order_id = order_id;
	}

	public Integer getProduct_id() {
		return product_id;
	}

	public void setProduct_id(Integer product_id) {
		this.product_id = product_id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(order_id, product_id);
	}

	@Override
	public boolean equals(Object obj) {
		if(this == obj)
			return true;
		if(obj == null || getClass() != obj.getClass())
			return false;
		
		OrderDetailKey key = (OrderDetailKey) obj;
		
		return order_id.equals(key.order_id)&&
				product_id.equals(key.product_id);
	}
	
	
}

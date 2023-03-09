package com.festivalbuy.market.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class OrderDetail {
	@EmbeddedId
	private OrderDetailId orderDetailKey;
	
	private Integer quantity;
	private Float subtotal;
	
	public OrderDetailId getOrderDetailKey() {
		return orderDetailKey;
	}
	public void setOrderDetailKey(OrderDetailId orderDetailKey) {
		this.orderDetailKey = orderDetailKey;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Float getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(Float subtotal) {
		this.subtotal = subtotal;
	}
}

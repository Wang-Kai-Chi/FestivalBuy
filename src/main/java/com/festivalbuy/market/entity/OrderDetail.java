package com.festivalbuy.market.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class OrderDetail {
	@EmbeddedId
	private OrderDetailKey orderDetailKey;
	
	private Integer quantity;
	private Float subtotal;
	
	public OrderDetailKey getOrderDetailKey() {
		return orderDetailKey;
	}
	public void setOrderDetailKey(OrderDetailKey orderDetailKey) {
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

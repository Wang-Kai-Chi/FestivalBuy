package com.festivalbuy.market.repo;

import org.springframework.data.repository.CrudRepository;

import com.festivalbuy.market.entity.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Integer>{

}

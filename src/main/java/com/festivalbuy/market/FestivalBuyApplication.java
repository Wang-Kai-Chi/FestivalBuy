package com.festivalbuy.market;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication()
public class FestivalBuyApplication {

	public static void main(String[] args) {
		SpringApplication.run(FestivalBuyApplication.class, args);
	}

}

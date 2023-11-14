package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.demo","user.*","admin.*","manager.*"})
@EnableJpaRepositories("jpa.dao")
@EntityScan("jpa.bean")
@MapperScan("mybatis.dao")
public class SpaceSharpApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpaceSharpApplication.class, args);
	}

}

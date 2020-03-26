package com.luv2code.springbootecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.springbootecommerce.entity.Product;
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long>{

}

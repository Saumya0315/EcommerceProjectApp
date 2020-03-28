package com.luv2code.springbootecommerce.dao;


import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.luv2code.springbootecommerce.entity.Product;




@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	//add query methods to create URL for search product by category
	
	Page<Product> findByCategoryId(@RequestParam("id") Long id,Pageable pageable);

}

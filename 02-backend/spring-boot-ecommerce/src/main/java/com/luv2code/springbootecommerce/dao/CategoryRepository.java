package com.luv2code.springbootecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.springbootecommerce.entity.ProductCategory;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory",path="product-category")
public interface CategoryRepository  extends JpaRepository<ProductCategory, Long>{

}

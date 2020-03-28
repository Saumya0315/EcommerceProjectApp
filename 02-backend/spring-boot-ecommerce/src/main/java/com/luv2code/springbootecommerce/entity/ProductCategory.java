package com.luv2code.springbootecommerce.entity;

import java.util.Set;



import javax.persistence.*;



@Entity
@Table(name="product_category")
public class ProductCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	@Column(name="category_name")
	private String categoryName;
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "category")
	private Set<Product> product;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Set<Product> getProduct() {
		return product;
	}
	public void setProduct(Set<Product> product) {
		this.product = product;
	}
		

}

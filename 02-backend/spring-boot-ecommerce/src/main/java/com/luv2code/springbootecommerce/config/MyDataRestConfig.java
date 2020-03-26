package com.luv2code.springbootecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.luv2code.springbootecommerce.entity.Product;
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
	
	
	public void congfigureRepositoryRestConfiguration(RepositoryRestConfiguration config)
{
		HttpMethod[] theUnsupportedActions= {HttpMethod.PUT,HttpMethod.DELETE,HttpMethod.POST};
		config.getExposureConfiguration()
		.forDomainType(Product.class)
		.withItemExposure((metadata,httpMethods)->httpMethods.disable(theUnsupportedActions))
        .withCollectionExposure	((metadata,httpMethods)->httpMethods.disable(theUnsupportedActions));
	
}


}

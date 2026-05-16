package com.autoglow.carwash.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.autoglow.carwash.service.ServiceService;

@Configuration
public class DataInitializer {

	@Bean
	CommandLineRunner seedDefaultServices(ServiceService serviceService) {
		return args -> serviceService.createDefaultServicesIfNeeded();
	}
}

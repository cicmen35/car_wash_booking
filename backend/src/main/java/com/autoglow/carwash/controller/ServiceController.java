package com.autoglow.carwash.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoglow.carwash.dto.ServiceResponse;
import com.autoglow.carwash.service.ServiceService;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

	private final ServiceService serviceService;

	public ServiceController(ServiceService serviceService) {
		this.serviceService = serviceService;
	}

	@GetMapping
	public List<ServiceResponse> getAllServices() {
		return serviceService.getAllServices();
	}

	@GetMapping("/{id}")
	public ServiceResponse getServiceById(@PathVariable Long id) {
		return serviceService.getServiceById(id);
	}
}

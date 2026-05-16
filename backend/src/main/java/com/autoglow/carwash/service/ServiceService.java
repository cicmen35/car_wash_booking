package com.autoglow.carwash.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.autoglow.carwash.dto.ServiceResponse;
import com.autoglow.carwash.entity.ServiceEntity;
import com.autoglow.carwash.repository.ServiceRepository;

@Service
public class ServiceService {

	private final ServiceRepository serviceRepository;

	public ServiceService(ServiceRepository serviceRepository) {
		this.serviceRepository = serviceRepository;
	}

	@Transactional(readOnly = true)
	public List<ServiceResponse> getAllServices() {
		return serviceRepository.findAll()
				.stream()
				.map(this::toResponse)
				.toList();
	}

	@Transactional(readOnly = true)
	public ServiceResponse getServiceById(Long id) {
		ServiceEntity service = serviceRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Service not found with id: " + id));

		return toResponse(service);
	}

	@Transactional
	public void createDefaultServicesIfNeeded() {
		// set example service data if database is empty
		if (serviceRepository.count() > 0) {
			return;
		}

		serviceRepository.saveAll(List.of(
				new ServiceEntity(
						null,
						"Exterior Wash",
						"Hand wash, wheel cleaning, and exterior drying.",
						new BigDecimal("20.00"),
						30),
				new ServiceEntity(
						null,
						"Interior Cleaning",
						"Vacuuming, dashboard wipe-down, window cleaning, and interior refresh.",
						new BigDecimal("30.00"),
						45),
				new ServiceEntity(
						null,
						"Full Detailing",
						"Complete interior and exterior cleaning with careful finishing details.",
						new BigDecimal("70.00"),
						120),
				new ServiceEntity(
						null,
						"Polishing",
						"Paint polishing to restore shine and reduce visible surface marks.",
						new BigDecimal("100.00"),
						180),
				new ServiceEntity(
						null,
						"Premium Package",
						"Exterior wash, interior cleaning, detailing, and polishing in one package.",
						new BigDecimal("150.00"),
						240)));
	}

	private ServiceResponse toResponse(ServiceEntity service) {
		return new ServiceResponse(
				service.getId(),
				service.getName(),
				service.getDescription(),
				service.getPrice(),
				service.getDuration());
	}
}

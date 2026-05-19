package com.autoglow.carwash.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.autoglow.carwash.dto.ServiceResponse;
import com.autoglow.carwash.entity.ServiceEntity;
import com.autoglow.carwash.exception.ResourceNotFoundException;
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
				.orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

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
						"KOMPLET INTERIÉR+EXTERIÉR",
						"Vysávanie, tepovanie sedačiek, podlahy, koberčekov, čistenie stropu, dverí, plastov interiéru, rámov dverí, okien, oživenie plastov, kompletné čistenie exteriéru vrátane detailného čistenia kolies.",
						new BigDecimal("90.00"),
						240),
				new ServiceEntity(
						null,
						"INTERIÉR PREMIUM",
						"Vysávanie, tepovanie sedačiek, podlahy, koberčekov, čistenie stropu, čistenie dverí, čistenie plastov interiéru, oživenie plastov interiéru, čistenie rámov dverí, čistenie okien.",
						new BigDecimal("75.00"),
						210),
				new ServiceEntity(
						null,
						"INTERIÉR EXCLUSIVE",
						"Vysávanie, tepovanie sedačiek, čistenie plastov, palubnej dosky, dverí, koberčekov, rámov dverí, okien, oživenie plastov.",
						new BigDecimal("60.00"),
						180),
				new ServiceEntity(
						null,
						"INTERIÉR CLASSIC",
						"Vysávanie, čistenie plastov, palubnej dosky, dverí, koberčekov, rámov dverí, okien, oživenie plastov.",
						new BigDecimal("35.00"),
						120),
				new ServiceEntity(
						null,
						"EXTERIÉR",
						"Pred umytie šampónom, ručné umytie šampónom, detailné čistenie kolies, usušenie.",
						new BigDecimal("15.00"),
						45),
				new ServiceEntity(
						null,
						"JEDNOSTUPŇOVÁ OCHRANA LAKU",
						"Jednostupňové leštenie a následne voskovanie celého auta vrátane umytia exteriéru a dekontaminácie laku.",
						new BigDecimal("100.00"),
						240),
				new ServiceEntity(
						null,
						"DVOJSTUPŇOVÁ OCHRANA LAKU",
						"Dvojstupňové leštenie a následne voskovanie celého auta vrátane umytia exteriéru a dekontaminácie laku.",
						new BigDecimal("200.00"),
						360),
				new ServiceEntity(
						null,
						"TROJSTUPŇOVÁ OCHRANA LAKU",
						"Trojstupňové leštenie a následne voskovanie celého auta vrátane umytia exteriéru a dekontaminácie laku.",
						new BigDecimal("300.00"),
						480),
				new ServiceEntity(
						null,
						"DEKONTAMINÁCIA LAKU",
						"Dekontaminácia laku.",
						new BigDecimal("30.00"),
						90)));
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

package com.autoglow.carwash.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.autoglow.carwash.dto.ReservationRequest;
import com.autoglow.carwash.dto.ReservationResponse;
import com.autoglow.carwash.dto.UpdateReservationStatusRequest;
import com.autoglow.carwash.entity.ReservationEntity;
import com.autoglow.carwash.entity.ReservationStatus;
import com.autoglow.carwash.entity.ServiceEntity;
import com.autoglow.carwash.exception.DuplicateBookingException;
import com.autoglow.carwash.exception.InvalidReservationException;
import com.autoglow.carwash.exception.ResourceNotFoundException;
import com.autoglow.carwash.repository.ReservationRepository;
import com.autoglow.carwash.repository.ServiceRepository;

@Service
public class ReservationService {

	private final ReservationRepository reservationRepository;
	private final ServiceRepository serviceRepository;

	public ReservationService(
			ReservationRepository reservationRepository,
			ServiceRepository serviceRepository) {
		this.reservationRepository = reservationRepository;
		this.serviceRepository = serviceRepository;
	}

	@Transactional
	public ReservationResponse createReservation(ReservationRequest request) {
		ServiceEntity service = serviceRepository.findById(request.getServiceId())
				.orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + request.getServiceId()));

		validateReservationIsNotInPast(request);
		validateTimeSlotIsAvailable(request);

		ReservationEntity reservation = new ReservationEntity();
		reservation.setCustomerName(request.getCustomerName());
		reservation.setEmail(request.getEmail());
		reservation.setPhone(request.getPhone());
		reservation.setCarModel(request.getCarModel());
		reservation.setService(service);
		reservation.setReservationDate(request.getReservationDate());
		reservation.setReservationTime(request.getReservationTime());
		reservation.setAdditionalNotes(request.getAdditionalNotes());
		reservation.setStatus(ReservationStatus.PENDING);

		return toResponse(reservationRepository.save(reservation));
	}

	@Transactional(readOnly = true)
	public List<ReservationResponse> getAllReservations() {
		return reservationRepository.findAllByOrderByReservationDateAscReservationTimeAsc()
				.stream()
				.map(this::toResponse)
				.toList();
	}

	@Transactional(readOnly = true)
	public ReservationResponse getReservationById(Long id) {
		return toResponse(findReservationById(id));
	}

	@Transactional
	public ReservationResponse updateReservationStatus(Long id, UpdateReservationStatusRequest request) {
		ReservationEntity reservation = findReservationById(id);
		reservation.setStatus(request.getStatus());

		return toResponse(reservation);
	}

	@Transactional
	public void deleteReservation(Long id) {
		ReservationEntity reservation = findReservationById(id);
		reservationRepository.delete(reservation);
	}

	private void validateReservationIsNotInPast(ReservationRequest request) {
		LocalDateTime reservationDateTime = LocalDateTime.of(
				request.getReservationDate(),
				request.getReservationTime());

		if (reservationDateTime.isBefore(LocalDateTime.now())) {
			throw new InvalidReservationException("Reservation cannot be in the past.");
		}
	}

	private void validateTimeSlotIsAvailable(ReservationRequest request) {
		boolean alreadyBooked = reservationRepository.existsByReservationDateAndReservationTime(
				request.getReservationDate(),
				request.getReservationTime());

		if (alreadyBooked) {
			throw new DuplicateBookingException("Reservation time is already booked.");
		}
	}

	private ReservationEntity findReservationById(Long id) {
		return reservationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
	}

	private ReservationResponse toResponse(ReservationEntity reservation) {
		return new ReservationResponse(
				reservation.getId(),
				reservation.getCustomerName(),
				reservation.getEmail(),
				reservation.getPhone(),
				reservation.getCarModel(),
				reservation.getService().getName(),
				reservation.getReservationDate(),
				reservation.getReservationTime(),
				reservation.getAdditionalNotes(),
				reservation.getStatus(),
				reservation.getCreatedAt());
	}
}

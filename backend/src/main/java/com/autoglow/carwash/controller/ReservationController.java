package com.autoglow.carwash.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoglow.carwash.dto.ReservationRequest;
import com.autoglow.carwash.dto.ReservationResponse;
import com.autoglow.carwash.dto.UpdateReservationStatusRequest;
import com.autoglow.carwash.service.ReservationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

	private final ReservationService reservationService;

	public ReservationController(ReservationService reservationService) {
		this.reservationService = reservationService;
	}

	@PostMapping
	public ResponseEntity<ReservationResponse> createReservation(@Valid @RequestBody ReservationRequest request) {
		ReservationResponse reservation = reservationService.createReservation(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
	}

	@GetMapping
	public List<ReservationResponse> getAllReservations() {
		return reservationService.getAllReservations();
	}

	@GetMapping("/{id}")
	public ReservationResponse getReservationById(@PathVariable Long id) {
		return reservationService.getReservationById(id);
	}

	@PatchMapping("/{id}/status")
	public ReservationResponse updateReservationStatus(
			@PathVariable Long id,
			@Valid @RequestBody UpdateReservationStatusRequest request) {
		return reservationService.updateReservationStatus(id, request);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
		reservationService.deleteReservation(id);
		return ResponseEntity.noContent().build();
	}
}

package com.autoglow.carwash.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.autoglow.carwash.entity.ReservationStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

	private Long id;

	private String customerName;

	private String email;

	private String phone;

	private String carModel;

	private String serviceName;

	private LocalDate reservationDate;

	private LocalTime reservationTime;

	private String additionalNotes;

	private ReservationStatus status;

	private LocalDateTime createdAt;
}

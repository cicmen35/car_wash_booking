package com.autoglow.carwash.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequest {

	private String customerName;

	private String email;

	private String phone;

	private String carModel;

	private Long serviceId;

	private LocalDate reservationDate;

	private LocalTime reservationTime;

	private String additionalNotes;
}

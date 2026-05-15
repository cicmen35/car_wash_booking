package com.autoglow.carwash.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequest {

	@NotBlank
	private String customerName;

	@NotBlank
	@Email
	private String email;

	@NotBlank
	private String phone;

	@NotBlank
	private String carModel;

	@NotNull
	private Long serviceId;

	@NotNull
	@FutureOrPresent
	private LocalDate reservationDate;

	@NotNull
	private LocalTime reservationTime;

	private String additionalNotes;
}

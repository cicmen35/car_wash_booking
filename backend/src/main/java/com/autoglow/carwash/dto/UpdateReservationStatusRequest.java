package com.autoglow.carwash.dto;

import com.autoglow.carwash.entity.ReservationStatus;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateReservationStatusRequest {

	@NotNull
	private ReservationStatus status;
}

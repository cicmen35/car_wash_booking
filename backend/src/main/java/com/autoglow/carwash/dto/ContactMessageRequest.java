package com.autoglow.carwash.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessageRequest {

	@NotBlank
	private String name;

	@NotBlank
	private String phone;

	@NotBlank
	@Email
	private String email;

	private String message;
}

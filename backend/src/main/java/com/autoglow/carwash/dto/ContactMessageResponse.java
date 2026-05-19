package com.autoglow.carwash.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessageResponse {

	private Long id;

	private String name;

	private String phone;

	private String email;

	private String message;

	private LocalDateTime createdAt;
}

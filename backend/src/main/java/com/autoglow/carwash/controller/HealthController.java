package com.autoglow.carwash.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

	@GetMapping("/api/healt")
	public String health() {
		return "Backend running";
	}
}

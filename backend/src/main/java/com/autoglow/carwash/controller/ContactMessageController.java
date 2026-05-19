package com.autoglow.carwash.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoglow.carwash.dto.ContactMessageRequest;
import com.autoglow.carwash.dto.ContactMessageResponse;
import com.autoglow.carwash.service.ContactMessageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {

	private final ContactMessageService contactMessageService;

	public ContactMessageController(ContactMessageService contactMessageService) {
		this.contactMessageService = contactMessageService;
	}

	@PostMapping
	public ResponseEntity<ContactMessageResponse> createContactMessage(
			@Valid @RequestBody ContactMessageRequest request) {
		ContactMessageResponse contactMessage = contactMessageService.createContactMessage(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(contactMessage);
	}

	@GetMapping
	public List<ContactMessageResponse> getAllContactMessages() {
		return contactMessageService.getAllContactMessages();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteContactMessage(@PathVariable Long id) {
		contactMessageService.deleteContactMessage(id);
		return ResponseEntity.noContent().build();
	}
}

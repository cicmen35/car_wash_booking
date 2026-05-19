package com.autoglow.carwash.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.autoglow.carwash.dto.ContactMessageRequest;
import com.autoglow.carwash.dto.ContactMessageResponse;
import com.autoglow.carwash.entity.ContactMessageEntity;
import com.autoglow.carwash.exception.ResourceNotFoundException;
import com.autoglow.carwash.repository.ContactMessageRepository;

@Service
public class ContactMessageService {

	private final ContactMessageRepository contactMessageRepository;

	public ContactMessageService(ContactMessageRepository contactMessageRepository) {
		this.contactMessageRepository = contactMessageRepository;
	}

	@Transactional
	public ContactMessageResponse createContactMessage(ContactMessageRequest request) {
		ContactMessageEntity contactMessage = new ContactMessageEntity();
		contactMessage.setName(request.getName());
		contactMessage.setPhone(request.getPhone());
		contactMessage.setEmail(request.getEmail());
		contactMessage.setMessage(request.getMessage());

		return toResponse(contactMessageRepository.save(contactMessage));
	}

	@Transactional(readOnly = true)
	public List<ContactMessageResponse> getAllContactMessages() {
		return contactMessageRepository.findAllByOrderByCreatedAtDesc()
				.stream()
				.map(this::toResponse)
				.toList();
	}

	@Transactional
	public void deleteContactMessage(Long id) {
		ContactMessageEntity contactMessage = contactMessageRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));

		contactMessageRepository.delete(contactMessage);
	}

	private ContactMessageResponse toResponse(ContactMessageEntity contactMessage) {
		return new ContactMessageResponse(
				contactMessage.getId(),
				contactMessage.getName(),
				contactMessage.getPhone(),
				contactMessage.getEmail(),
				contactMessage.getMessage(),
				contactMessage.getCreatedAt());
	}
}

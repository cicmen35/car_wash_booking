package com.autoglow.carwash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.autoglow.carwash.entity.ContactMessageEntity;

public interface ContactMessageRepository extends JpaRepository<ContactMessageEntity, Long> {

	List<ContactMessageEntity> findAllByOrderByCreatedAtDesc();
}

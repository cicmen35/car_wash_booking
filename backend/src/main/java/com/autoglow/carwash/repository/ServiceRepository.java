package com.autoglow.carwash.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.autoglow.carwash.entity.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
}

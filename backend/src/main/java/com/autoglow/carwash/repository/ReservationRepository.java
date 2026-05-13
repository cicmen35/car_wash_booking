package com.autoglow.carwash.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.autoglow.carwash.entity.ReservationEntity;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {

	boolean existsByReservationDateAndReservationTime(LocalDate reservationDate, LocalTime reservationTime);

	List<ReservationEntity> findAllByOrderByReservationDateAscReservationTimeAsc();
}

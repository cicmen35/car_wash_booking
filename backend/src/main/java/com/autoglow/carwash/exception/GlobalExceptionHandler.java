package com.autoglow.carwash.exception;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.autoglow.carwash.dto.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException exception) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new ErrorResponse(exception.getMessage()));
	}

	@ExceptionHandler(DuplicateBookingException.class)
	public ResponseEntity<ErrorResponse> handleDuplicateBooking(DuplicateBookingException exception) {
		return ResponseEntity.status(HttpStatus.CONFLICT)
				.body(new ErrorResponse(exception.getMessage()));
	}

	@ExceptionHandler(InvalidReservationException.class)
	public ResponseEntity<ErrorResponse> handleInvalidReservation(InvalidReservationException exception) {
		return ResponseEntity.badRequest()
				.body(new ErrorResponse(exception.getMessage()));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException exception) {
		String message = exception.getBindingResult()
				.getFieldErrors()
				.stream()
				.map(error -> error.getField() + " " + error.getDefaultMessage())
				.collect(Collectors.joining(", "));

		return ResponseEntity.badRequest()
				.body(new ErrorResponse(message));
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponse> handleUnreadableMessage(HttpMessageNotReadableException exception) {
		return ResponseEntity.badRequest()
				.body(new ErrorResponse("Request body is missing or invalid."));
	}
}

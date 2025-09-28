package com.angrysurfer.broker.exception;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.angrysurfer.broker.api.ServiceResponse;

@RestControllerAdvice
public class BrokerExceptionAdvice {

    /**
     * Handles validation errors for standard Spring MVC data binding on @RequestBody.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> onInvalid(MethodArgumentNotValidException e) {
        List<Map<String, Object>> errs = e.getBindingResult().getFieldErrors().stream()
                .map(fe -> Map.<String, Object>of("code", "invalid", "field", fe.getField(), "message", fe.getDefaultMessage()))
                .toList();
        return ResponseEntity.badRequest().body(ServiceResponse.error(errs, null));
    }

    @ExceptionHandler(BrokerValidationException.class)
    public ResponseEntity<?> onBrokerValidation(BrokerValidationException e) {
        return ResponseEntity.badRequest().body(ServiceResponse.error(e.getErrors(), e.getRequestId()));
    }
}
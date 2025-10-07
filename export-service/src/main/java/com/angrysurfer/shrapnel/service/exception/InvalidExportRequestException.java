package com.angrysurfer.shrapnel.service.exception;

public class InvalidExportRequestException extends RuntimeException {
    public InvalidExportRequestException(String message) {
        super(message);
    }
}

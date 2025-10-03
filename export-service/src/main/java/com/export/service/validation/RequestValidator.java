package com.angrysurfer.shrapnel.export.service.validation;

import com.angrysurfer.shrapnel.export.service.ExportsService;
import com.angrysurfer.shrapnel.export.service.Request;
import com.angrysurfer.shrapnel.export.service.exception.InvalidExportRequestException;
import org.springframework.stereotype.Service;

import jakarta.annotation.*;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.util.*;

@Service
public class RequestValidator implements IRequestValidator {

    private ExportsService exportsService;

    public RequestValidator(ExportsService exportsService) {
        this.exportsService = exportsService;
    }

    private Validator validator;

    @PostConstruct
    public void initialize() {
		this.validator = Validation.buildDefaultValidatorFactory().getValidator();
	}

    public void validate(Request request) {

		Set< ConstraintViolation > violations = new HashSet<>();
		violations.addAll(this.validator.validate(request, IRequestValidation.RequestExport.class));

		if (!violations.isEmpty()) {
			StringBuilder sb = new StringBuilder();
			violations.forEach(v -> sb.append(v.getPropertyPath()).append(" ").append(v.getMessage()).append("\n"));
			throw new InvalidExportRequestException(String.format("Invalid DBExport Request:\n%s", sb.toString()));
		}

		if (!Arrays.asList(ExportsService.CSV, ExportsService.PDF, ExportsService.XLSX).contains(request.getFileType().toLowerCase(Locale.ROOT)))
			throw new InvalidExportRequestException(String.format("Unknown file extension: %s.", request.getFileType()));

		if (Objects.isNull(exportsService.getFactory(request)))
			throw new InvalidExportRequestException(String.format("No factory found for %s.", request.getName()));
	}
}
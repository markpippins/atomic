package com.angrysurfer.shrapnel.export.service.controller;

import com.angrysurfer.shrapnel.PropertyConfig;
import com.angrysurfer.shrapnel.export.service.IExportsService;
import com.angrysurfer.shrapnel.export.service.Request;
import com.angrysurfer.shrapnel.export.service.validation.IRequestValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import java.io.ByteArrayOutputStream;
import java.util.Objects;

@RestController
@RequestMapping("exports")
@Slf4j
public class ExportsController {

	IExportsService exportsService;
	private IRequestValidator exportRequestValidator;

	public ExportsController(IExportsService exportsService, IRequestValidator exportRequestValidator) {
		this.exportsService = exportsService;
		this.exportRequestValidator = exportRequestValidator;
	}

	@PostMapping(value = "/fileExport")
	public ResponseEntity< ByteArrayResource > exportFile(@RequestBody Request request) {
		exportRequestValidator.validate(request);
		HttpHeaders       headers = new HttpHeaders();
		ByteArrayResource bytes   = null;
		headers.add(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment;filename=%s.%s", request.getName(), request.getFileType()));
		bytes = exportsService.exportByteArrayResource(request);
		return Objects.nonNull(bytes) ?
				       ResponseEntity.ok().headers(headers).contentLength(bytes.contentLength()).contentType(MediaType.APPLICATION_OCTET_STREAM).body(bytes) :
				       ResponseEntity.notFound().build();
	}

	@PostMapping(value = "/streamExport")
	public ResponseEntity exportStream(@RequestBody Request request) {
		exportRequestValidator.validate(request);
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment;filename=%s.%s", request.getName(), request.getFileType()));
		ByteArrayOutputStream stream = exportsService.exportByteArrayOutputStream(request);
		return Objects.nonNull(stream) ?
				       ResponseEntity.ok().headers(headers).contentLength(stream.size()).contentType(MediaType.APPLICATION_OCTET_STREAM).body(stream.toByteArray()) :
				       ResponseEntity.notFound().build();
	}

	@PostMapping(value = "/flushConfig")
	public ResponseEntity flushConfig() {
		PropertyConfig.getInstance().flush();
		return ResponseEntity.ok().build();
	}

	@PostMapping(value = "/listExports")
	public ResponseEntity< String > listExports() {
		StringBuffer result = new StringBuffer();
		exportsService.getAvailableExports().forEach(s -> result.append(s).append("\n"));
		return new ResponseEntity< String >(result.toString(), HttpStatus.OK);
	}
}

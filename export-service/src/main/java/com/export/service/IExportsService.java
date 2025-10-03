package com.angrysurfer.shrapnel.export.service;

import com.angrysurfer.shrapnel.export.factory.IExportFactory;
import com.angrysurfer.shrapnel.export.util.ExcelUtil;
import com.angrysurfer.shrapnel.export.util.FileUtil;
import com.angrysurfer.shrapnel.export.util.PdfUtil;
import com.angrysurfer.shrapnel.export.IExport;
import com.angrysurfer.shrapnel.export.service.exception.ExportRequestProcessingException;
import org.springframework.core.io.ByteArrayResource;

import java.io.ByteArrayOutputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

public interface IExportsService {

	String CSV = "csv";

	String PDF = "pdf";

	String XLSX = "xlsx";

	long WAIT_SECONDS = 360;

//    static UserDTO user = new UserDTO() {
//        @Override
//        public String getAlias() {
//            return "system-export";
//        }
//    };

	IExportFactory getFactory(Request request);

	default ByteArrayResource exportByteArrayResource(Request request) {
		IExportFactory factory = getFactory(request);
		return Objects.nonNull(factory) ? exportByteArrayResource(request, FileUtil.getFileName(factory)) : null;
	}

	default ByteArrayResource exportByteArrayResource(Request request, String tempFileName) {

		IExportFactory factory  = getFactory(request);
		IExport        export   = newExportInstance(request);
		String         filename = null;

		if (Objects.nonNull(export))
			switch (request.getFileType().toLowerCase(Locale.ROOT)) {
				case CSV:
					filename = FileUtil.getFileName(factory);
					FileUtil.writeCsvFile(factory.getData(), export, filename);
					break;

				case PDF:
					filename = PdfUtil.writeTabularFile(factory.getData(), export, tempFileName);
					break;

				case XLSX:
					filename = ExcelUtil.writeWorkbookToFile(factory.getData(), export, tempFileName);
					break;
			}

		if (Objects.nonNull(filename)) {
			FileUtil.removeFileAfter(filename, WAIT_SECONDS);
			return FileUtil.getByteArrayResource(filename);
		}

		return null;
	}

	default ByteArrayOutputStream exportByteArrayOutputStream(Request request) {
		IExportFactory factory = getFactory(request);
		IExport        export  = newExportInstance(request);
		if (Objects.nonNull(export))
			switch (request.getFileType().toLowerCase(Locale.ROOT)) {
				case PDF:
					return PdfUtil.generateByteArrayOutputStream(factory.getData(), export);

				case XLSX:
					return ExcelUtil.generateByteArrayOutputStream(factory.getData(), export);
			}

		return null;
	}

	default IExport newExportInstance(Request request) {
		IExportFactory factory = getFactory(request);
		IExport        export  = null;
		try {
			export = factory.newInstance();
			if (Objects.isNull(export))
				return null;

			if (Objects.nonNull(request.getFilterCriteria()) && request.getFilterCriteria().size() > 0)
				export.addFilter(request.getFilterCriteria());

			export.init();

		}
		catch (ClassNotFoundException |
				       NoSuchMethodException |
				       InvocationTargetException |
				       InstantiationException |
				       IllegalAccessException e) {
			throw new ExportRequestProcessingException(e.getMessage(), e);
		}
		return export;
	}

	List< String > getAvailableExports();
}

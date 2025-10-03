package com.angrysurfer.shrapnel.export.util;

import com.angrysurfer.shrapnel.export.IExport;
import com.angrysurfer.shrapnel.export.component.writer.PdfDataWriter;
import com.angrysurfer.shrapnel.export.service.exception.ExportRequestProcessingException;
import com.itextpdf.io.font.FontProgram;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfVersion;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.WriterProperties;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class PdfUtil {

	public static Document createDocument(String filename) throws IOException {
		return createDocument(filename, PageSize.A4);
	}

	public static Document createDocument(String filename, PageSize pageSize) {
		FileUtil.ensureSafety(filename);
		PdfWriter pdfWriter = null;
		try {
			pdfWriter = new PdfWriter(filename, getWriterProperties());
		} catch (FileNotFoundException e) {
			throw new ExportRequestProcessingException(e.getMessage(), e);
		}
		PdfDocument pdfDocument = new PdfDocument(pdfWriter);
		pdfDocument.setDefaultPageSize(pageSize);
		pdfDocument.addNewPage();

		return new Document(pdfDocument);
	}

	public static Document createDocument(ByteArrayOutputStream baos, PageSize pageSize) {
		PdfWriter pdfWriter = new PdfWriter(baos, getWriterProperties());
		PdfDocument pdfDocument = new PdfDocument(pdfWriter);
		pdfDocument.setDefaultPageSize(pageSize);
		pdfDocument.addNewPage();

		return new Document(pdfDocument);
	}

	public static Document createDocument(ByteArrayOutputStream baos) {
		return createDocument(baos, PageSize.A4);
	}

	public static String getFontName(Object obj) {
		String fontName = null;

		if (obj instanceof String)
			return obj.toString();

		if (obj instanceof PdfFont) {
			PdfFont pdfFont = (PdfFont) obj;
			FontProgram fontProgram = pdfFont.getFontProgram();
			fontName = fontProgram.toString();
		}

		return fontName;
	}

	public static ByteArrayOutputStream generateByteArrayOutputStream(Collection< Object > items, PdfDataWriter pdfRowWriter, PageSize pageSize) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		Document document = createDocument(baos, pageSize);
		writeToTable(items, pdfRowWriter);
		document.add(pdfRowWriter.getTable());
		document.close();
		return baos;
	}

	public static ByteArrayOutputStream generateByteArrayOutputStream(Collection< Object > items, IExport export) {
		return generateByteArrayOutputStream(items, export.getPdfRowWriter(), export.getPdfPageSize());
	}

	public static ByteArrayOutputStream generateByteArrayOutputStream(Collection< Object > items, PdfDataWriter pdfRowWriter) {
		return generateByteArrayOutputStream(items, pdfRowWriter, PageSize.A4);
	}

	static WriterProperties getWriterProperties() {
		return getWriterProperties(PdfVersion.PDF_2_0);
	}

	static WriterProperties getWriterProperties(PdfVersion pdfVersion) {
		WriterProperties properties = new WriterProperties();
		properties.setPdfVersion(pdfVersion);
		return properties;
	}

	public static String writeTabularFile(Collection items, PdfDataWriter pdfRowWriter, String filename) {
		return writeTabularFile(items, pdfRowWriter, filename, PageSize.A4);
	}

	public static String writeTabularFile(Collection items, PdfDataWriter pdfRowWriter, String filename, PageSize pageSize) {
		String outputFileName = FileUtil.getOutputFileName(filename, "pdf");
		FileUtil.ensureSafety(outputFileName);
		Document document = createDocument(outputFileName, pageSize);
		writeToTable(items, pdfRowWriter);
		document.add(pdfRowWriter.getTable());
		document.close();
		return outputFileName;
	}

	public static String writeTabularFile(Collection< Object > items, IExport export, String filename) {
		return writeTabularFile(items, export.getPdfRowWriter(), filename, export.getPdfPageSize());
	}

	public static void writeToTable(Collection< Object > items, PdfDataWriter pdfRowWriter, Table table) {
		Map< String, Object > outputConfig = new HashMap<>();
		outputConfig.put(PdfDataWriter.TABLE, table);
		pdfRowWriter.writeData(outputConfig, items);
	}

	public static void writeToTable(Collection< Object > items, PdfDataWriter pdfRowWriter) {
		Table table = pdfRowWriter.createTable();
		Map< String, Object > outputConfig = new HashMap<>();
		outputConfig.put(PdfDataWriter.TABLE, table);
		pdfRowWriter.writeData(outputConfig, items);
	}
}
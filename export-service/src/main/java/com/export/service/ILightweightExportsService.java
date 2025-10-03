package com.angrysurfer.shrapnel.export.service;

import com.angrysurfer.shrapnel.export.component.field.IField;
import com.angrysurfer.shrapnel.export.component.writer.ExcelDataWriter;
import com.angrysurfer.shrapnel.export.component.writer.PdfDataWriter;

import java.util.Collection;
import java.util.List;

public interface ILightweightExportsService {

    String writeCSVFile(Collection<Object> items, List<IField> columns, String filename);

    String writeExcelFile(Collection<Object> items, List<IField> columns, String sheetName, String filename);

    String writeExcelFile(Collection<Object> items, ExcelDataWriter writer, String sheetName, String filename);

    String writeTabularPdfFile(Collection<Object> items, List<IField> columns, String filename);

    String writeTabularPdfFile(Collection<Object> items, PdfDataWriter pdfRowWriter, String filename);
}

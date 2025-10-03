package com.angrysurfer.shrapnel.export;

import com.angrysurfer.shrapnel.export.component.field.IFields;
import com.angrysurfer.shrapnel.export.component.writer.ExcelDataWriter;
import com.angrysurfer.shrapnel.export.component.writer.PdfDataWriter;
import com.angrysurfer.shrapnel.export.component.writer.filter.IDataFilter;
import com.itextpdf.kernel.geom.PageSize;

import java.util.Map;

public interface IExport {

    void addFilter(Map<String, Object> filterCriteria);

    void addFilter(IDataFilter filter);

    IFields getFields();

    String getName();

    ExcelDataWriter getExcelRowWriter();

    PdfDataWriter getPdfRowWriter();

    PageSize getPdfPageSize();

    void init();
}

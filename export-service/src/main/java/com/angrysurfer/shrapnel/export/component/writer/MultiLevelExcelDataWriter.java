package com.angrysurfer.shrapnel.export.component.writer;

import com.angrysurfer.shrapnel.export.component.IValueFormatter;
import com.angrysurfer.shrapnel.export.component.field.IField;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;

import java.util.List;

@Getter
@Setter
@Slf4j
public abstract class MultiLevelExcelDataWriter extends ExcelDataWriter implements IMultiLevelDataWriter {

    private int level = -1;

    private String levelPropertyName;

    public MultiLevelExcelDataWriter(String levelPropertyName, List< IField > fields, IValueFormatter valueRenderer) {
        super(fields, valueRenderer);
        setAutoCreateTopLevelHeader(false);
        setLevelPropertyName(levelPropertyName);
    }

    @Override
    protected void beforeRow(Object item) {
        beforeRow(this, item, this);
    }

    @Override
    public int getCellOffSet(Object item) {
        return getCellOffset(this, item, this);
    }

    @Override
    public boolean shouldSkip(IField field, Object item) {
        return super.shouldSkip(field, item) || shouldSkip(this, field, item, this);
    }

    @Override
    public boolean shouldWrite(IField field, Object item) {
        return super.shouldWrite(field, item) || shouldSkip(this, field, item, this);
    }

    @Override
    public void writeHeader() {
        Row header = getSheet().createRow(getCurrentRow());
        CellStyle headerStyle = getStyleProvider().getHeaderStyle(getWorkbook());
        for (int i = 0; i < getLevel() - 1; i++) {
            Cell cell = header.createCell(i);
            cell.setCellStyle(headerStyle);
            cell.setCellValue(HEADER_PADDING_LEFT.getLabel());
        }
    }
}

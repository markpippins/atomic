package com.angrysurfer.shrapnel.export.service;

import com.angrysurfer.shrapnel.export.service.model.export.DBDataSource;
import com.angrysurfer.shrapnel.export.service.model.export.DBExport;
import com.angrysurfer.shrapnel.export.service.model.export.DBField;
import com.angrysurfer.shrapnel.export.service.model.export.DBFieldType;
import com.angrysurfer.shrapnel.export.service.model.sqlgen.Query;
import com.angrysurfer.shrapnel.export.service.model.style.StyleType;
import com.angrysurfer.shrapnel.export.service.model.style.StyleTypeEnum;
import com.angrysurfer.shrapnel.export.service.repository.sqlgen.*;
import com.angrysurfer.shrapnel.export.service.repository.style.StyleTypeRepository;
import com.angrysurfer.shrapnel.export.component.field.FieldTypeEnum;
import com.angrysurfer.shrapnel.export.service.model.sqlgen.JoinTypeEnum;
import com.angrysurfer.shrapnel.export.service.model.sqlgen.JoinType;
import com.angrysurfer.shrapnel.export.service.repository.export.DataSourceRepository;
import com.angrysurfer.shrapnel.export.service.repository.export.ExportRepository;
import com.angrysurfer.shrapnel.export.service.repository.export.FieldRepository;
import com.angrysurfer.shrapnel.export.service.repository.export.FieldTypeRepository;
import com.angrysurfer.shrapnel.export.service.repository.sqlgen.*;
import com.angrysurfer.shrapnel.export.service.repository.style.PdfPageSizeRepository;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Service
public class ComponentsService {

	FieldRepository fieldRepository;
	DataSourceRepository dataSourceRepository;
	ExportRepository exportRepository;
	FieldTypeRepository fieldTypeRepository;
	JoinTypeRepository joinTypeRepository;
	StyleTypeRepository styleTypeRepository;
	PdfPageSizeRepository pdfPageSizeRepository;
	TableRepository tableRepository;
	ColumnRepository columnRepository;
	QueryRepository queryRepository;
	JoinRepository joinRepository;

	public ComponentsService(FieldRepository fieldRepository, DataSourceRepository dataSourceRepository, ExportRepository exportRepository, FieldTypeRepository fieldTypeRepository, JoinTypeRepository joinTypeRepository, StyleTypeRepository styleTypeRepository, PdfPageSizeRepository pdfPageSizeRepository, TableRepository tableRepository, ColumnRepository columnRepository, QueryRepository queryRepository, JoinRepository joinRepository) {
		this.fieldRepository = fieldRepository;
		this.dataSourceRepository = dataSourceRepository;
		this.exportRepository = exportRepository;
		this.fieldTypeRepository = fieldTypeRepository;
		this.joinTypeRepository = joinTypeRepository;
		this.styleTypeRepository = styleTypeRepository;
		this.pdfPageSizeRepository = pdfPageSizeRepository;
		this.tableRepository = tableRepository;
		this.columnRepository = columnRepository;
		this.queryRepository = queryRepository;
		this.joinRepository = joinRepository;
	}


	public DBDataSource createDataSource(Query query) {
		DBDataSource ds = new DBDataSource();
		ds.setName(query.getName());
		ds.setQuery(query);
		dataSourceRepository.save(ds);
		return ds;
	}

	public DBExport createExport(Query query) {
		DBExport export = new DBExport();
		export.setName(query.getName());
		export.setFields(createFields(query));
		export.setDataSource(createDataSource(query));
		exportRepository.save(export);
		return export;
	}

	public DBField createField(String name, String propertyName, String label, Integer index) {
		DBField field = new DBField();
		field.setName(name);
		field.setPropertyName(propertyName);
		field.setLabel(label);
		field.setIndex(index);
		field.setFieldType(fieldTypeRepository
				.findById(Integer.valueOf(FieldTypeEnum.STRING.getCode()))
				.orElseThrow(() -> new IllegalArgumentException()));
		fieldRepository.save(field);
		return field;
	}

	public Set< DBField > createFields(Query query) {
		Set< DBField > fields = new HashSet<>();
		query.getColumns().forEach(column -> fields.add(createField(column.getName(), column.getName(),
				column.getName().toUpperCase(Locale.ROOT), column.getIndex())));
		return fields;
	}

	public DBFieldType createFieldType(FieldTypeEnum fieldType) {
		DBFieldType ft = new DBFieldType();
		ft.setName(fieldType.name());
		ft.setCode(fieldType.getCode());
		fieldTypeRepository.save(ft);
		return ft;
	}

	public JoinType createJoinType(JoinTypeEnum joinType) {
		JoinType jt = new JoinType();
		jt.setName(joinType.name());
		jt.setCode(joinType.getCode());
		joinTypeRepository.save(jt);
		return jt;
	}

	public StyleType createStyleType(StyleTypeEnum styleType) {
		StyleType st = new StyleType();
		st.setName(styleType.name());
		st.setCode(styleType.getCode());
		styleTypeRepository.save(st);
		return st;
	}

}

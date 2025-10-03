package com.angrysurfer.shrapnel.export.service.model.sqlgen;

import com.angrysurfer.shrapnel.export.service.model.export.DBFieldType;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@Entity
@jakarta.persistence.Table(name = "qbe_column", schema = "shrapnel")
public class Column {

	@ManyToOne
	@JoinColumn(name = "field_type_id")
	public DBFieldType fieldType;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@jakarta.persistence.Column(name = "id", nullable = false)
	private Long id;

	@jakarta.persistence.Column(name = "name", nullable = false)
	private String name;

	@ManyToOne
	@JoinColumn(name = "table_id")
	private com.angrysurfer.shrapnel.export.service.model.sqlgen.Table table;

	@jakarta.persistence.Column(name = "field_index", nullable = false)
	private Integer index;

}

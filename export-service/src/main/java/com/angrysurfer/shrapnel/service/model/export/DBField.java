package com.angrysurfer.shrapnel.service.model.export;

import com.angrysurfer.shrapnel.field.FieldTypeEnum;
import com.angrysurfer.shrapnel.field.IField;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "field", schema = "shrapnel")
public class DBField implements IField {

	@ManyToOne
	@JoinColumn(name = "field_type_code")
	public DBFieldType fieldType;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "property_name", nullable = false)
	private String propertyName;

	@Column(name = "label", nullable = false)
	private String label;

	@Column(name = "field_index", nullable = false)
	private Integer index;

	@Column(name = "is_calculated", nullable = false)
	private Boolean calculated = false;

	@Override
	public FieldTypeEnum getType() {
		return Objects.isNull(this.fieldType) ? null : FieldTypeEnum.from(this.fieldType.getCode());
	}
}

package com.angrysurfer.shrapnel.service.model.export;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "data_source", schema = "shrapnel")
public class DBDataSource {

	@ManyToOne
	@JoinColumn(name = "query_id", nullable = true)
	public com.angrysurfer.shrapnel.service.model.sqlgen.Query query;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "scriptName", nullable = true)
	private String scriptName;
}

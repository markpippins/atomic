package com.angrysurfer.shrapnel.factory;

import com.angrysurfer.shrapnel.service.Request;
import com.angrysurfer.shrapnel.service.model.export.DBDataSource;
import com.angrysurfer.shrapnel.service.model.export.DBExport;
import com.angrysurfer.shrapnel.util.FileUtil;
import com.angrysurfer.shrapnel.service.repository.export.DataSourceRepository;
import com.angrysurfer.shrapnel.service.repository.export.ExportRepository;
import com.angrysurfer.shrapnel.service.repository.mapping.HashMapResultSetExtractor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import jakarta.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
@Component
public class JdbcTemplateMetaExportFactory implements IMetaExportFactory {

	private final JdbcTemplate jdbcTemplate;
	private final DataSourceRepository dataSourceRepository;
	private final ExportRepository exportRepository;

	    public JdbcTemplateMetaExportFactory(JdbcTemplate jdbcTemplate,									   DataSourceRepository dataSourceRepository,
									   ExportRepository exportRepository) {
		this.jdbcTemplate = jdbcTemplate;
		this.dataSourceRepository = dataSourceRepository;
		this.exportRepository = exportRepository;
	}


	@Override
	public boolean hasFactory(Request request) {
		DBExport export = exportRepository.findByName(request.getName());
		return Objects.nonNull(export) && export.isConfigured();
	}

	@Override
	public IExportFactory newInstance(Request request) {
		final DBExport     dbExport   = exportRepository.findByName(request.getName());
		final DBDataSource dataSource = dataSourceRepository.findByName(request.getName());

		return new JdbcTemplateExportFactory(request, dbExport) {

			@Override
			public Collection getData() {
				String sql = Objects.nonNull(dataSource.getScriptName()) ?
						             // load query from sql folder
						             // TODO: implement refreshable caching scheme for queries
						             FileUtil.getSQL(dataSource.getScriptName()) :
						             Objects.nonNull(dataSource.getQuery()) ?
								             // build query from db definition
								             dataSource.getQuery().getSQL() :
								             null;

				return Objects.nonNull(sql) ?
						       (Collection) jdbcTemplate.query(sql, new HashMapResultSetExtractor(dbExport)) :
						       Collections.EMPTY_LIST;
			}
		};
	}

	@Override
	public List< String > getAvailableExports() {
		List<DBExport> exports = exportRepository.findAll();
		return exports.stream().map(ex -> ex.getName()).collect(Collectors.toList());
	}
}

package com.angrysurfer.shrapnel.export.service.repository.sqlgen;

import com.angrysurfer.shrapnel.export.service.model.sqlgen.Column;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColumnRepository extends JpaRepository< Column, Long > {
}

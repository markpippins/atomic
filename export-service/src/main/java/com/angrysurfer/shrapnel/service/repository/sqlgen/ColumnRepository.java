package com.angrysurfer.shrapnel.service.repository.sqlgen;

import com.angrysurfer.shrapnel.service.model.sqlgen.Column;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColumnRepository extends JpaRepository< Column, Long > {
}

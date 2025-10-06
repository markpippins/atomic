package com.angrysurfer.shrapnel.export.service.repository.sqlgen;

import com.angrysurfer.shrapnel.export.service.model.sqlgen.Table;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRepository extends JpaRepository< Table, Long > {
}

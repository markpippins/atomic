package com.angrysurfer.shrapnel.service.repository.sqlgen;

import com.angrysurfer.shrapnel.service.model.sqlgen.Table;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRepository extends JpaRepository< Table, Long > {
}

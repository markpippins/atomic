package com.angrysurfer.shrapnel.export.service.repository.sqlgen;

import com.angrysurfer.shrapnel.export.service.model.sqlgen.Query;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QueryRepository extends JpaRepository< Query, Long > {
}

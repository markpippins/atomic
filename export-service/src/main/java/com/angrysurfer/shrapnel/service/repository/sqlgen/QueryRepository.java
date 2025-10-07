package com.angrysurfer.shrapnel.service.repository.sqlgen;

import com.angrysurfer.shrapnel.service.model.sqlgen.Query;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QueryRepository extends JpaRepository< Query, Long > {
}

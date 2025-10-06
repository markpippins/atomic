package com.angrysurfer.shrapnel.export.service.repository.sqlgen;

import com.angrysurfer.shrapnel.export.service.model.sqlgen.Join;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinRepository extends JpaRepository< Join, Long > {
}

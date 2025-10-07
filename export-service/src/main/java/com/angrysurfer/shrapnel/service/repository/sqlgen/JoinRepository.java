package com.angrysurfer.shrapnel.service.repository.sqlgen;

import com.angrysurfer.shrapnel.service.model.sqlgen.Join;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinRepository extends JpaRepository< Join, Long > {
}

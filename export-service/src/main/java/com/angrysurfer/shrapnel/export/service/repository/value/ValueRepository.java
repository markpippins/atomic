package com.angrysurfer.shrapnel.export.service.repository.value;

import com.angrysurfer.shrapnel.export.service.model.sqlgen.Join;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ValueRepository extends JpaRepository< Join, Long > {
}

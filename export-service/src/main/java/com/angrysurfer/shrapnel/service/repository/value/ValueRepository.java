package com.angrysurfer.shrapnel.service.repository.value;

import com.angrysurfer.shrapnel.service.model.sqlgen.Join;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ValueRepository extends JpaRepository< Join, Long > {
}

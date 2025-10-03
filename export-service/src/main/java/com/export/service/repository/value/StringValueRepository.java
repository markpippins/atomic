package com.angrysurfer.shrapnel.export.service.repository.value;

import com.angrysurfer.shrapnel.export.service.model.value.StringValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StringValueRepository extends JpaRepository< StringValue, Long > {
}

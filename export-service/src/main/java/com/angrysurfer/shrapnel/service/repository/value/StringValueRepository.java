package com.angrysurfer.shrapnel.service.repository.value;

import com.angrysurfer.shrapnel.service.model.value.StringValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StringValueRepository extends JpaRepository< StringValue, Long > {
}

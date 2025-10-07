package com.angrysurfer.shrapnel.service.repository.export;

import com.angrysurfer.shrapnel.service.model.export.DBField;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FieldRepository extends JpaRepository< DBField, Long> {

    DBField findByName(String name);
}

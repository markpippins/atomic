package com.angrysurfer.shrapnel.service.repository.export;

import com.angrysurfer.shrapnel.service.model.export.DBFieldType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FieldTypeRepository extends JpaRepository< DBFieldType, Integer> {

}

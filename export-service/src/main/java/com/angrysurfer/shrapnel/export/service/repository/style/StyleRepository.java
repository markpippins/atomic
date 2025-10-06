package com.angrysurfer.shrapnel.export.service.repository.style;

import com.angrysurfer.shrapnel.export.service.model.style.Style;
import com.angrysurfer.shrapnel.export.service.model.export.DBField;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StyleRepository extends JpaRepository< Style, Long > {

	DBField findByName(String name);
}

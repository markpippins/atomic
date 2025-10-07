package com.angrysurfer.shrapnel.service.repository.style;

import com.angrysurfer.shrapnel.service.model.style.Style;
import com.angrysurfer.shrapnel.service.model.export.DBField;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StyleRepository extends JpaRepository< Style, Long > {

	DBField findByName(String name);
}

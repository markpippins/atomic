package com.angrysurfer.shrapnel.export.service.repository.style;

import com.angrysurfer.shrapnel.export.service.model.style.StyleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StyleTypeRepository extends JpaRepository< StyleType, Integer > {

	StyleType findByName(String name);
}

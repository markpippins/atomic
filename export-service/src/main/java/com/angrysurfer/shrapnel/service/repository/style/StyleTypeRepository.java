package com.angrysurfer.shrapnel.service.repository.style;

import com.angrysurfer.shrapnel.service.model.style.StyleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StyleTypeRepository extends JpaRepository< StyleType, Integer > {

	StyleType findByName(String name);
}

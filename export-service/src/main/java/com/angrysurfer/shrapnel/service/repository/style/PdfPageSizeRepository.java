package com.angrysurfer.shrapnel.service.repository.style;

import com.angrysurfer.shrapnel.service.model.style.PdfPageSize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PdfPageSizeRepository extends JpaRepository< PdfPageSize, String> {
    PdfPageSize findByName(String name);
}

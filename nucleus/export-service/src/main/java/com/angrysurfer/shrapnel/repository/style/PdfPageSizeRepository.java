package com.angrysurfer.shrapnel.repository.style;

import com.angrysurfer.shrapnel.model.style.PdfPageSize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PdfPageSizeRepository extends JpaRepository< PdfPageSize, String> {
    PdfPageSize findByName(String name);
}

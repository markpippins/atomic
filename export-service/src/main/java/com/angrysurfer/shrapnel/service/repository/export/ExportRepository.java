package com.angrysurfer.shrapnel.service.repository.export;

import com.angrysurfer.shrapnel.service.model.export.DBExport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExportRepository extends JpaRepository< DBExport, Long> {
    DBExport findByName(String name);
}

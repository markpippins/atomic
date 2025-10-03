package com.angrysurfer.shrapnel.export.service.repository.export;

import com.angrysurfer.shrapnel.export.service.model.export.DBExport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExportRepository extends JpaRepository< DBExport, Long> {
    DBExport findByName(String name);
}

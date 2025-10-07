package com.angrysurfer.shrapnel.service.repository.export;

import com.angrysurfer.shrapnel.service.model.export.DBDataSource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataSourceRepository extends JpaRepository< DBDataSource, Long> {
    DBDataSource findByName(String name);
}

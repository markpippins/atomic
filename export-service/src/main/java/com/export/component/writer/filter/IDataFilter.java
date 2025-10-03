package com.angrysurfer.shrapnel.export.component.writer.filter;

import com.angrysurfer.shrapnel.export.component.writer.IDataWriter;
import com.angrysurfer.shrapnel.export.component.property.IPropertyAccessor;

public interface IDataFilter {
    boolean allows(Object item, IDataWriter writer, IPropertyAccessor accessor);
}

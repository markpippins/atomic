package com.angrysurfer.shrapnel.component.filter;

import com.angrysurfer.shrapnel.component.writer.IDataWriter;
import com.angrysurfer.shrapnel.component.property.IPropertyAccessor;

public interface IDataFilter {
    boolean allows(Object item, IDataWriter writer, IPropertyAccessor accessor);
}

package com.angrysurfer.shrapnel.export.component.writer.filter;

import com.angrysurfer.shrapnel.export.component.property.IPropertyAccessor;
import com.angrysurfer.shrapnel.export.component.writer.DataWriter;
import com.angrysurfer.shrapnel.export.component.writer.IDataWriter;

import java.util.List;

public interface IDataFilters extends List< IDataFilter > {

	default boolean allow(Object item, IDataWriter writer, IPropertyAccessor propertyAccessor) {
		final boolean[] result = { true };

		forEach(filter -> {
			if (result[ 0 ])
				try {
					if (result[ 0 ] && !filter.allows(item, writer, propertyAccessor))
						result[ 0 ] = false;
				}
				catch (Exception e) {
					if (DataWriter.DEBUG)
						writer.writeError(e);
					else throw e;
				}
		});

		return result[ 0 ];
	}

}

package com.angrysurfer.shrapnel.component.writer;

import com.angrysurfer.shrapnel.component.IValueCalculator;
import com.angrysurfer.shrapnel.component.field.IField;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface IDataWriter {

    IValueCalculator getValueCalculator();

    List< IField > getFields();

    default IField getField(String propertyName) {
        return getFields().stream()
                .filter(field -> field.getPropertyName().equalsIgnoreCase(propertyName))
                .findFirst().orElse(null);
    }

    default int getFieldCount() {
        return getFields().size();
    }

    void writeData(Map<String, Object> outputConfig, Collection<Object> items);

    void writeError(Exception e);
}

package com.angrysurfer.shrapnel.component.field;

public interface IField {

    String getPropertyName();

    String getLabel();

    Integer getIndex();

    void setIndex(Integer size);

    FieldTypeEnum getType();

    Boolean getCalculated();

    void setCalculated(Boolean isCalculated);
}

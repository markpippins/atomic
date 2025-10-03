package com.angrysurfer.shrapnel.export.component;

import com.angrysurfer.shrapnel.export.component.field.IField;

public interface IValueCalculator {
    Object calculateValue(IField field, Object item);
}

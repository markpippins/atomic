package com.angrysurfer.shrapnel.component;

import com.angrysurfer.shrapnel.component.field.IField;

public interface IValueCalculator {
    Object calculateValue(IField field, Object item);
}

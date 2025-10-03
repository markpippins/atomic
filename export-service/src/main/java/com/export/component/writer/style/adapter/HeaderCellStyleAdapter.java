package com.angrysurfer.shrapnel.export.component.writer.style.adapter;

import com.angrysurfer.shrapnel.PropertyConfig;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;

public class HeaderCellStyleAdapter extends CellStyleAdapter {

    static String GREEN = "#1c8214";

    public HeaderCellStyleAdapter() {
        super();
        PropertyConfig defaults = PropertyConfig.getInstance();
        setBackgroundColor(new DeviceRgb(Integer.valueOf(defaults.getOrDefault("header.background", GREEN).toString().substring(1, 3), 16),
                Integer.valueOf(defaults.getOrDefault("header.background", GREEN).toString().substring(3, 5), 16),
                Integer.valueOf(defaults.getOrDefault("header.background", GREEN).toString().substring(5, 7), 16)));
        setFontColor(defaults.containsKey("header.font.color") ?
                new DeviceRgb(Integer.valueOf(defaults.getProperty("header.font.color").toString().substring(1, 3), 16),
                        Integer.valueOf(defaults.getProperty("header.font.color").toString().substring(3, 5), 16),
                        Integer.valueOf(defaults.getProperty("header.font.color").toString().substring(5, 7), 16)) :
                ColorConstants.WHITE);
        setBold();
    }
}

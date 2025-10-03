package com.angrysurfer.shrapnel.export.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class DateUtil {

    public static LocalDateTime getSystemCurrentTime() {
        Instant now = Instant.ofEpochMilli(System.currentTimeMillis());
        return now.atZone(ZoneId.systemDefault()).toLocalDateTime();
    }
}

package com.angrysurfer.shrapnel.export.service;

import com.angrysurfer.shrapnel.export.service.validation.IRequestValidation;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class Request {

    private Map<String, Object> filterCriteria = new HashMap<>();

    @NotBlank(groups = {IRequestValidation.RequestExport.class})
    private String name;

    @Size(min = 3, max = 4, groups = {IRequestValidation.RequestExport.class})
    @NotBlank(groups = {IRequestValidation.RequestExport.class})
    private String fileType;
}

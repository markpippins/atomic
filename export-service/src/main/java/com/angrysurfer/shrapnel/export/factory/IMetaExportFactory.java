package com.angrysurfer.shrapnel.export.factory;

import com.angrysurfer.shrapnel.export.service.Request;

import java.util.List;

public interface IMetaExportFactory {

    boolean hasFactory(Request request);

    IExportFactory newInstance(Request request);

    List< String > getAvailableExports();
}

package com.angrysurfer.shrapnel.factory;

import com.angrysurfer.shrapnel.service.Request;

import java.util.List;

public interface IMetaExportFactory {

    boolean hasFactory(Request request);

    IExportFactory newInstance(Request request);

    List< String > getAvailableExports();
}

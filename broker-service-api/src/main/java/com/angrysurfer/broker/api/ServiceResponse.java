package com.angrysurfer.broker.api;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class ServiceResponse<T> {

    private boolean ok;
    private T data;
    private List<Map<String, Object>> errors;
    private String requestId;
    private Instant ts;

    public ServiceResponse() {
    }

    public ServiceResponse(boolean ok, T data, List<Map<String, Object>> errors, String requestId, Instant ts) {
        this.ok = ok;
        this.data = data;
        this.errors = errors;
        this.requestId = requestId;
        this.ts = ts;
    }

    public static <T> ServiceResponse<T> ok(T data, String requestId) {
        return new ServiceResponse<>(true, data, Collections.emptyList(), requestId, Instant.now());
    }

    public static ServiceResponse<?> error(List<Map<String, Object>> errors, String requestId) {
        return new ServiceResponse<>(false, null, errors, requestId, Instant.now());
    }

    public boolean isOk() {
        return ok;
    }

    public T getData() {
        return data;
    }

    public List<Map<String, Object>> getErrors() {
        return errors;
    }

    public String getRequestId() {
        return requestId;
    }

    public Instant getTs() {
        return ts;
    }
}

"use strict";

import { v4 as generateUuid } from "uuid";
import { createNamespace } from "cls-hooked";
import RequestContext from "./RequestContext";
const namespace = createNamespace("requestContext");

interface Settings {
  skipLoggingForPaths?: string[];
  logCallback?: CallableFunction;
}

let skipLoggingForPaths: string[] | undefined;
let log: CallableFunction | undefined;
export const requestContext = new RequestContext(namespace);
export function getRequestContextMiddleware(settings?: Settings) {
  skipLoggingForPaths = settings?.skipLoggingForPaths;
  log = settings?.logCallback;
  return function requestContextMiddleware(req: any, res: any, next: any) {
    namespace.run(() => setRequestContext(req, res, next));
  };
}

function setRequestContext(req: any, res: any, next: any) {
  const rc = res.locals.requestContext || {};
  const skipLogging = rc.skipLogging || shouldRequestNotBeLogged(req.url, req.headers);

  requestContext.startTime = rc.startTime || new Date();
  requestContext.skipLogging = skipLogging;
  requestContext.correlationId = rc.correlationId || getOrCreateCorrelationId(req.headers, skipLogging);
  requestContext.callingClient = rc.callingClient;
  requestContext.method = rc.method || req.method;
  requestContext.path = rc.path || req.url;
  requestContext.additionalData = rc.additionalData;
  next();
}

function shouldRequestNotBeLogged(path: string, headers: { [x: string]: any }) {
  if (headers["x-skip-logging"]) return true;
  if (skipLoggingForPaths?.includes(path)) return true;
  return false;
}

function getOrCreateCorrelationId(headers: { [x: string]: any }, skipLogging = false) {
  let correlationId = headers["x-correlation-id"];
  let logMessage: string;
  if (!correlationId) {
    correlationId = generateUuid();
    logMessage = `Created correlation id '${correlationId}', as incoming request did not have it.`;
  } else {
    logMessage = `Request contained correlation id '${correlationId}' which will be used throughout the request.`;
  }
  if (log && !skipLogging) {
    log(logMessage);
  }
  return correlationId;
}

"use strict";

import "mocha";
import { expect } from "chai";
import RequestContext from "../src/RequestContext";
import { createNamespace } from "cls-hooked";
import { v4 as generateUuid } from "uuid";

describe("RequestContext getters and setters", () => {
  let requestContext: RequestContext;
  let namespace: any;
  before(() => {
    namespace = createNamespace("requestContext");
    requestContext = new RequestContext(namespace);
  });

  it("skipLogging can be set and retrieved", () => {
    namespace.run(() => {
      expect(requestContext.skipLogging).to.be.undefined;
      requestContext.skipLogging = true;
      expect(requestContext.skipLogging).to.be.true;
      requestContext.skipLogging = false;
      expect(requestContext.skipLogging).to.be.false;
    });
  });

  it("startTime can be set and retrieved", () => {
    const startTime = new Date();
    namespace.run(() => {
      expect(requestContext.startTime).to.be.undefined;
      requestContext.startTime = startTime;
      expect(requestContext.startTime).to.equal(startTime);
    });
  });

  it("correlationId can be set and retrieved", () => {
    const correlationId = generateUuid();
    namespace.run(() => {
      expect(requestContext.correlationId).to.be.undefined;
      requestContext.correlationId = correlationId;
      expect(requestContext.correlationId).to.equal(correlationId);
    });
  });

  it("callingClient can be set and retrieved", () => {
    const callingClient = "bestClient";
    namespace.run(() => {
      expect(requestContext.callingClient).to.be.undefined;
      requestContext.callingClient = callingClient;
      expect(requestContext.callingClient).to.equal(callingClient);
    });
  });

  it("method can be set and retrieved", () => {
    const method = "GET";
    namespace.run(() => {
      expect(requestContext.method).to.be.undefined;
      requestContext.method = method;
      expect(requestContext.method).to.equal(method);
    });
  });

  it("path can be set and retrieved", () => {
    const path = "/test";
    namespace.run(() => {
      expect(requestContext.path).to.be.undefined;
      requestContext.path = path;
      expect(requestContext.path).to.equal(path);
    });
  });

  it("additionalData can be set and retrieved", () => {
    const additionalData = { test: "placeholder", test2: 123 };
    namespace.run(() => {
      expect(requestContext.additionalData).to.be.undefined;
      requestContext.additionalData = additionalData;
      expect(requestContext.additionalData).to.equal(additionalData);
    });
  });
})
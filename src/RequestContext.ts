"use strict";

export default class RequestContext {
  private namespace: any;
  constructor(namespace: any) {
    this.namespace = namespace;
  }

  get startTime(): Date {
    return this.namespace.get("startTime");
  }
  set startTime(dateTime: Date) {
    this.namespace.set("startTime", dateTime);
  }

  get method(): string {
    return this.namespace.get("method");
  }
  set method(path: string) {
    this.namespace.set("method", path);
  }

  get path(): string {
    return this.namespace.get("path");
  }
  set path(path: string) {
    this.namespace.set("path", path);
  }

  get skipLogging(): boolean {
    return this.namespace.get("skipLogging");
  }
  set skipLogging(skipLogging: boolean) {
    this.namespace.set("skipLogging", skipLogging);
  }

  get correlationId(): string {
    return this.namespace.get("correlationId");
  }
  set correlationId(correlationId: string) {
    this.namespace.set("correlationId", correlationId);
  }

  get callingClient(): string {
    return this.namespace.get("callingClient");
  }
  set callingClient(callingClient: string) {
    this.namespace.set("callingClient", callingClient);
  }

  get additionalData(): any {
    return this.namespace.get("additionalData");
  }
  set additionalData(additionalData: any) {
    this.namespace.set("additionalData", additionalData);
  }
}

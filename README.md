# ney-request-context
A nodejs package (built for express api services) that saves useful request context which can be accessed throughout the application without being having to pass around res.locals.

*It is based on the [cls-hooked](https://www.npmjs.com/package/cls-hooked) npm package.*

## Adding to project
- Install: ``npm install ney-request-context``.
- Setup the middleware:
  - import the middleware function: ``const { getRequestContextMiddleware } = require("ney-request-context")``
  - Add the middleware: ``app.use(getRequestContextMiddleware(settings))`` (Before anything that might depend on the request context).
- Using the request context:
  - Import the context: ``const { requestContext } = require("ney-request-context")``
  - Fetch context values: ``const startTime = requestContext.startTime``.
  - Overwrite context values: ``requestContext.startTime = new Date()``

## Middleware notes
The middleware sets up the following context properties (accessible through the exported requestContext class instance):

Property | Use-case | Value 
-------- | -------- | ----------
**startTime** | Figure out response times and the likes. | Is set to "new Date()".
**skipLogging** | Quickly find out if logs/metrics etc is relevant for the request. | Is by default set to "false" but if you have provided the setting ``settings.skipLoggingForPaths`` and the request path matches any of the values specified it is set to false. It also listens for the header ``x-skip-logging`` (true/false) and prioritizes that value.
**correlationId** | Easily find out what logs are related to eachother (it is greatly recommended that you pass this between services to easily be able to troubleshoot a specific request). | Is generated using the "uuid" package (v4). It does however listen to the header ``x-correlation-id`` and prioritizes that value. If you have provided a log callback function (``settings.logCallback``) it will be used to log whether a correlation id was created or if it was taken from the request header.
**callingClient** | Logging (Helpful when trying to determine who is calling the service when troubleshooting a specific request) | Is not set by default. If you want to use it you are required set it after the requestContextMiddleware or to pass it to the middleware with the res.locals override (``res.locals.requestContext.callingClient``).
**method** | Logging/Metrics | Is set based on ``req.method`` by default.
**path** | Logging/Metrics | Is set based on ``req.url`` by default.
**additionalData** | If you want to add additional context to the request you can do so here. | Does not contain any values by default.

Note that you can control all the values set in the middleware by including the property on res.locals.requestContext (For example, if res.locals.requestContext.skipLogging is set prior to the middleware, that is the value that will be used). You can also always change the values in the context after the middleware by re-setting it.


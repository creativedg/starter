"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_module_1 = require("./app.module");
var lambda_1 = require("@creativedc/lambda");
var serviceBuilder = new lambda_1.ServiceBuilder({
    module: app_module_1.AppModule,
    documentBuilder: {
        title: '',
        description: '',
        version: '',
        tag: '',
    },
    validation: true,
    enableCors: true,
});
exports.handler = serviceBuilder.handler;
//# sourceMappingURL=app.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nestjs/core");
var serverless = require("aws-serverless-express");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var ServiceBuilder = (function () {
    function ServiceBuilder(service) {
        this.service = service;
    }
    ServiceBuilder.prototype.handler = function (event, context) {
        if (this.app) {
            this.bootstrapServer()
                .then(function (app) { return app.init(); })
                .then(function (server) {
                return serverless.proxy(server, event, context);
            });
        }
        else {
            return serverless.proxy(this.app, event, context);
        }
    };
    ServiceBuilder.prototype.bootstrapServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4, core_1.NestFactory.create(this.service.module)];
                    case 1:
                        _a.app = _b.sent();
                        this.buildOptions();
                        this.buildSwagger();
                        return [2, this.app];
                }
            });
        });
    };
    ServiceBuilder.prototype.buildOptions = function () {
        if (this.service.validation == true) {
            this.app.useGlobalPipes(new common_1.ValidationPipe());
        }
        if (this.service.enableCors == true) {
            this.app.enableCors();
        }
    };
    ServiceBuilder.prototype.buildSwagger = function () {
        var options = this.buildDocumentBuilder();
        var document = swagger_1.SwaggerModule.createDocument(this.app, options);
        swagger_1.SwaggerModule.setup(this.service.documentBuilder.tag + '/api', this.app, document);
    };
    ServiceBuilder.prototype.buildDocumentBuilder = function () {
        return new swagger_1.DocumentBuilder()
            .setTitle(this.service.documentBuilder.title.toString())
            .setDescription(this.service.documentBuilder.description.toString())
            .setVersion(this.service.documentBuilder.version.toString())
            .addTag(this.service.documentBuilder.tag.toString())
            .build();
    };
    return ServiceBuilder;
}());
exports.ServiceBuilder = ServiceBuilder;
//# sourceMappingURL=lambda.js.map
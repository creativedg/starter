import { Service } from '../types/service';
import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import * as serverless from 'aws-serverless-express';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class ServiceBuilder {
  app: any;
  constructor(public service: Service) {}
  handler(event: any, context: Context): Handler {
    if (this.app) {
      this.bootstrapServer()
        .then(app => app.init())
        .then(server => {
          return serverless.proxy(server, event, context);
        });
    } else {
      return serverless.proxy(this.app, event, context);
    }
  }
  async bootstrapServer() {
    this.app = await NestFactory.create(
      this.service.module
    );
    this.buildOptions();
    this.buildSwagger();
    return this.app;
  }
  buildOptions() {
    if (this.service.validation == true) {
      this.app.useGlobalPipes(new ValidationPipe());
    }
    if (this.service.enableCors == true) {
      this.app.enableCors();
    }
  }
  buildSwagger() {
    const options = this.buildDocumentBuilder();
    const document = SwaggerModule.createDocument(this.app, options);
    SwaggerModule.setup(this.service.documentBuilder.tag + '/api', this.app, document);
  }
  buildDocumentBuilder() {
    return new DocumentBuilder()
      .setTitle(this.service.documentBuilder.title.toString())
      .setDescription(this.service.documentBuilder.description.toString())
      .setVersion(this.service.documentBuilder.version.toString())
      .addTag(this.service.documentBuilder.tag.toString())
      .build();
  }
}

import { AppModule } from './app.module';
import { ServiceBuilder } from '@creativedc/lambda';

const serviceBuilder: ServiceBuilder = new ServiceBuilder({
  module: AppModule,
  documentBuilder: {
    title: '',
    description: '',
    version: '',
    tag: '',
  },
  validation: true,
  enableCors: true,
});
export const handler = serviceBuilder.handler;

import { LocalModule } from './local.module';
import { ServiceBuilder } from '@creativedc/lambda';

const serviceBuilder: ServiceBuilder = new ServiceBuilder({
  module: LocalModule,
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
export const bootstrap = async () => {
  const app: any = await serviceBuilder.bootstrapServer();
  await app.listen(4000);
  console.log("Server listen http://localhost:4000");
};
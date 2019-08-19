import { Module } from '@nestjs/common';
import { AppModule } from '@creativedc/hello';
import { RouterModule } from 'nest-router';

@Module({
  imports: [
    AppModule,
    RouterModule.forRoutes([{ path: '/hello', module: AppModule }]),
  ],
})
export class LocalModule {}

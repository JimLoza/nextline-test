import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './components/user/user.module';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './components/auth/auth.module';
import { CommonModule } from './common/common.module';
import { TaskModule } from './components/task/task.module';
import { WinstonMiddleware } from '@/common/middlewares/winston.middleware';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    CommonModule,
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WinstonMiddleware)
      .forRoutes('*');
  }
}

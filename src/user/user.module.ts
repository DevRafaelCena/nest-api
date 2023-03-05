import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { TypeOrmModule} from '@nestjs/typeorm'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserIdCheckMiddleware } from '../middlewares/user-check-id.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]) , // especifica que o módulo UserModule irá utilizar o UserEntity
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'user/:id',
      method: RequestMethod.ALL,
    });
  }
}

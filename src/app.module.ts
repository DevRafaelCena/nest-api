import { forwardRef, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import  { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot(), //ConfigModule is a global module .env
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport:  {host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'ludwig14@ethereal.email',
          pass: 'R8XyuCX3EcXm7XhVVX'
      }, //https://ethereal.email/create
      
     },
    defaults: {
        from: '"Rafael Cena" <ludwig14@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306 ,
      database: process.env.DB_DATABASE ,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [UserEntity],
      synchronize: process.env.ENV === 'development', // sincroniza o banco de dados com o código

    })
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard}], //APP_GUARD is a global guard ThrottlerGuard
})
export class AppModule {}

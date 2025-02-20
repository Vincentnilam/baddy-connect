import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { VerificationModule } from './verification/verification.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
      load: [databaseConfig],
  }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MailModule,
    VerificationModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}

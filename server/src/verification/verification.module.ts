import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationToken } from '../entities/verificationtoken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationToken]),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}

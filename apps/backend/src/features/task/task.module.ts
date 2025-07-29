import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { PrismaService } from '../../db/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../config/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
  ],
  providers: [TaskService, PrismaService],
  exports: [TaskService],
})
export class TaskModule {}

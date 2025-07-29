import { Module } from '@nestjs/common';
import { DebriefService } from './debrief.service';
import { PrismaService } from '../../db/prisma/prisma.service';

@Module({
  providers: [DebriefService, PrismaService],
  exports: [DebriefService],
})
export class DebriefModule {}

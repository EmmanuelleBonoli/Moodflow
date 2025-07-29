import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PrismaService } from '../../db/prisma/prisma.service';

@Module({
  providers: [PlanningService, PrismaService],
  exports: [PlanningService],
})
export class PlanningModule {}

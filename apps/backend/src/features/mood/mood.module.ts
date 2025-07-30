import { Module } from '@nestjs/common';
import { MoodService } from './mood.service';
import { PrismaService } from '../../db/prisma/prisma.service';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  providers: [MoodService, PrismaService],
  exports: [MoodService],
})
export class MoodModule {}

import { Module } from '@nestjs/common';
import { MoodService } from './mood.service';
import { PrismaService } from '../../db/prisma/prisma.service';
import { TaskModule } from '../task/task.module';
import { MoodController } from './mood.controller';

@Module({
  imports: [TaskModule],
  providers: [MoodService, PrismaService],
  controllers: [MoodController],
  exports: [MoodService],
})
export class MoodModule {}

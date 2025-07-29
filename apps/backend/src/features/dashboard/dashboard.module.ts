import { Module } from '@nestjs/common';
import { TaskModule } from '../task/task.module';
import { DebriefModule } from '../debrief/debrief.module';
import { PlanningModule } from '../planning/planning.module';
import { UserModule } from '../user/user.module';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [UserModule, PlanningModule, DebriefModule, TaskModule],
  controllers: [],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}

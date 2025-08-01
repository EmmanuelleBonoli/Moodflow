import { Injectable } from '@nestjs/common';
import { Debrief, Planning, User, Mood } from '@prisma/client';
import { PlanningService } from '../planning/planning.service';
import { DebriefService } from '../debrief/debrief.service';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';
import { DashboardData, MoodData } from '@moodflow/types';
import { MoodService } from '../mood/mood.service';

@Injectable()
export class DashboardService {
  constructor(
    private userService: UserService,
    private planningService: PlanningService,
    private debriefService: DebriefService,
    private taskService: TaskService,
    private moodService: MoodService,
  ) {}

  async getDashboardData(userId: string): Promise<DashboardData> {
    const user: User | null = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const [pendingOrInProgressTasks, todayCompletedTasks] = await Promise.all([
      await this.taskService.getPendingAndProgressTasks(userId),
      await this.taskService.getCompletedTasksOfDay(userId, new Date()),
    ]);

    const todayPlanning: Planning | null =
      await this.planningService.getTodayPlanning(userId);

    const todayDebrief: Debrief | null = todayPlanning
      ? await this.debriefService.getTodayDebrief(todayPlanning.id)
      : null;

    const todayMood: Mood | null = await this.moodService.getLastMood(userId);
    const weeklyMood: MoodData[] = await this.moodService.getWeeklyMood(userId);

    return {
      tasks: [...pendingOrInProgressTasks, ...todayCompletedTasks],
      todayPlanning,
      todayDebrief,
      todayMood,
      weeklyMood,
    };
  }
}

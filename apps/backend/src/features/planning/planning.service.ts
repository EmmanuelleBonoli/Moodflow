import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { Planning } from '@prisma/client';
import { getStartAndEndOfDay } from '../../utils/utils';

@Injectable()
export class PlanningService {
  constructor(private prisma: PrismaService) {}

  getTodayPlanning(userId: string): Promise<Planning | null> {
    const { startOfDay } = getStartAndEndOfDay();

    return this.prisma.planning.findUnique({
      where: {
        userId_date: {
          userId,
          date: startOfDay,
        },
      },
      include: {
        planningTasks: true,
      },
    });
  }
}

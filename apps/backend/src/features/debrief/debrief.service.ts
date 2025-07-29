import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { Debrief } from '@prisma/client';

@Injectable()
export class DebriefService {
  constructor(private prisma: PrismaService) {}

  async getTodayDebrief(planningId: string): Promise<Debrief | null> {
    return this.prisma.debrief.findUnique({
      where: {
        planningId: planningId,
      },
    });
  }
}

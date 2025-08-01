import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/JwtAuthGuard';
import { NewMood } from '@moodflow/types';
import { getUser } from '../../decorators/get-user.decorator';
import { User } from '@prisma/client';
import { MoodService } from './mood.service';

@Controller('/mood')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createMood(
    @getUser() user: User,
    @Body() mood: NewMood,
  ): Promise<void> {
    await this.moodService.createMood(user, mood);
  }
}

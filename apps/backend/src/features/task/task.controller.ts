import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { getUser } from '../../decorators/get-user.decorator';
import { Task, User } from '@prisma/client';
import { JwtAuthGuard } from '../../guards/JwtAuthGuard';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createTask(@getUser() user: User, @Body() task: Task): Promise<Task> {
    return this.taskService.createTask(user, task);
  }
}

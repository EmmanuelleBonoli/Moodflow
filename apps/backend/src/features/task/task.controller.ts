import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { getUser } from '../../decorators/get-user.decorator';
import { Task, User } from '@prisma/client';
import { JwtAuthGuard } from '../../guards/JwtAuthGuard';
import { UserService } from '../user/user.service';

@Controller('/task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createTask(@getUser() user: User, @Body() task: Task): Promise<Task> {
    return await this.taskService.createTask(user, task);
  }

  @Patch(':taskId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @getUser() user: User,
    @Body() task: Task,
    @Param('taskId') taskId: string,
  ): Promise<void> {
    this.userService.assertIsOwner(user, task.userId);
    await this.taskService.updateTask(taskId, task);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async deleteTask(
    @getUser() user: User,
    @Param('taskId') taskId: string,
  ): Promise<void> {
    const existingTask: Task | null = await this.taskService.findById(taskId);
    if (!existingTask) {
      throw new NotFoundException('Tâche à supprimer non trouvée');
    } else {
      this.userService.assertIsOwner(user, existingTask.userId);
    }

    await this.taskService.deleteTask(taskId);
  }
}

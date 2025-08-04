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
  Get,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { GetUser } from '../../decorators/GetUser.decorator';
import { Task, User } from '@prisma/client';
import { JwtAuthGuard } from '../../guards/JwtAuthGuard';
import { UserService } from '../user/user.service';

@Controller('/task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getList(
    @GetUser() user: User,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ): Promise<Task[]> {
    return await this.taskService.getPaginatedTasks(
      user.id,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createTask(@GetUser() user: User, @Body() task: Task): Promise<Task> {
    return await this.taskService.createTask(user, task);
  }

  @Patch(':taskId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @GetUser() user: User,
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
    @GetUser() user: User,
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

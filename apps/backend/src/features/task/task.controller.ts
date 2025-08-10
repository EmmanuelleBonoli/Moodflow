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
import {
  TaskCategory,
  TaskDeleteResponse,
  TaskFilter,
  TaskOperationResponse,
  TasksAndTotals,
  TaskStatus,
} from '@moodflow/types';

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
    @Query('status') status?: TaskStatus,
    @Query('category') category?: TaskCategory,
  ): Promise<TasksAndTotals> {
    const filters: TaskFilter = {
      status: status ?? null,
      category: category ?? null,
    };

    const [tasks, totals] = await Promise.all([
      this.taskService.getPaginatedTasks(
        user.id,
        parseInt(page, 10),
        parseInt(pageSize, 10),
        filters,
      ),
      this.taskService.countTasksTotal(user.id, filters),
    ]);

    return {
      tasks,
      totals,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createTask(
    @GetUser() user: User,
    @Body() task: Task,
    @Query('status') status?: TaskStatus,
    @Query('category') category?: TaskCategory,
  ): Promise<TaskOperationResponse> {
    const filters: TaskFilter = {
      status: status ?? null,
      category: category ?? null,
    };

    const taskCreated: Task = await this.taskService.createTask(user, task);
    const totals = await this.taskService.countTasksTotal(user.id, filters);

    return { task: taskCreated, totals };
  }

  @Patch(':taskId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @GetUser() user: User,
    @Body() task: Task,
    @Param('taskId') taskId: string,
    @Query('status') status?: TaskStatus,
    @Query('category') category?: TaskCategory,
  ): Promise<TaskOperationResponse> {
    const filters: TaskFilter = {
      status: status ?? null,
      category: category ?? null,
    };

    this.userService.assertIsOwner(user, task.userId);
    await this.taskService.updateTask(taskId, task);
    const updatedTask: Task = await this.taskService.updateTask(taskId, task);
    const totals = await this.taskService.countTasksTotal(user.id, filters);

    return { task: updatedTask, totals };
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async deleteTask(
    @GetUser() user: User,
    @Param('taskId') taskId: string,
    @Query('status') status?: TaskStatus,
    @Query('category') category?: TaskCategory,
  ): Promise<TaskDeleteResponse> {
    const filters: TaskFilter = {
      status: status ?? null,
      category: category ?? null,
    };

    const existingTask: Task | null = await this.taskService.findById(taskId);
    if (!existingTask) {
      throw new NotFoundException('Tâche à supprimer non trouvée');
    } else {
      this.userService.assertIsOwner(user, existingTask.userId);
    }

    await this.taskService.deleteTask(taskId);
    const totals = await this.taskService.countTasksTotal(user.id, filters);

    return { success: true, totals };
  }
}

import { Controller, Get, Post } from '@nestjs/common';
import { TasksControllerService } from './tasks-controller.service';

@Controller('tasks-controller')
export class TasksControllerController {
  constructor(private service: TasksControllerService) {}

  @Get('next-executions')
  getNextExecution() {
    return this.service.getInformations();
  }
}

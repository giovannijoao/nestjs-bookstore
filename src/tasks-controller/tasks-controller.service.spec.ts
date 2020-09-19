/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/first */
import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerProvider } from './providers/SchedulerProvider';
import FakeSchedulerProvider from './providers/SchedulerProvider/fakes/FakeSchedulerProvider';
import FakeTasksRepository from './providers/TasksRepository/fakes/FakeTasksRepository';
import { TasksRepository } from './providers/TasksRepository/implementations';
import { TasksControllerService } from './tasks-controller.service';

jest.mock('./tasks', () => {
  return {
    TestTask: jest.fn().mockImplementation(() => ({
      execute: jest.fn(async () => {}),
    })),
  };
});

describe('TasksControllerService', () => {
  let service: TasksControllerService;
  let fakeTasksRepository: FakeTasksRepository;
  let fakeSchedulerProvider: FakeSchedulerProvider;

  beforeEach(async () => {
    jest.mock('./tasks').clearAllMocks();
    fakeTasksRepository = new FakeTasksRepository();
    fakeSchedulerProvider = new FakeSchedulerProvider();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TasksRepository,
          useValue: fakeTasksRepository,
        },
        {
          provide: SchedulerProvider,
          useValue: fakeSchedulerProvider,
        },
        TasksControllerService,
      ],
    }).compile();

    service = module.get<TasksControllerService>(TasksControllerService);
  });

  describe('should be able to load tasks in applications startup', () => {
    it('should be able to alert if there is no tasks', async () => {
      const log = jest.spyOn((service as any).logger, 'log');
      await service.startup();
      expect(log).toHaveBeenCalledWith('No tasks to be loaded');
    });
    it('should be able to alert if a task has a wrong type', async () => {
      const log = jest
        .spyOn((service as any).logger, 'error')
        // eslint-disable-next-line
        .mockImplementation(() => {});
      const task = {
        taskName: 'a random task',
        taskWorker: 'random',
        createdAt: new Date(),
        id: 'any',
        isActive: true,
        timeExpression: 'any',
        updatedAt: new Date(),
      };
      jest
        .spyOn(fakeTasksRepository, 'findAllActive')
        .mockImplementationOnce(async () => [task]);
      await service.startup();
      expect(log).toHaveBeenCalledWith(
        `Task ${task.taskName} (${task.id}): invalid worker type (${task.taskWorker}). Ignoring it`,
      );
    });
    it('should be able to add a cron job for a task', async () => {
      const task = {
        taskName: 'a random task',
        taskWorker: 'TestTask',
        createdAt: new Date(),
        id: 'any',
        isActive: true,
        timeExpression: 'any',
        updatedAt: new Date(),
      };

      jest
        .spyOn(fakeTasksRepository, 'findAllActive')
        .mockImplementationOnce(async () => [task]);
      const addCronJob = jest.spyOn(fakeSchedulerProvider, 'addCronJob');
      await service.startup();
      expect(addCronJob).toHaveBeenCalled();
    });
  });
});

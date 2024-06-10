import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskE } from './entities/task.entity';
import { TaskRepository } from './repository/task.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  imports: [
    TypeOrmModule.forFeature([TaskE])
  ]
})
export class TaskModule { }

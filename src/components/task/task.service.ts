import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repository/task.repository';
import { TaskE } from './entities/task.entity';
import { PaginateDto } from '@common/dto/paginate.dto'
import { PaginatedI } from '@/common/interface/paginated.interface';


@Injectable()
export class TaskService {

  constructor(
    private readonly taskRepository: TaskRepository
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<TaskE> {
    return await this.taskRepository.create(createTaskDto);
  }

  async findAll(paginatioDto: PaginateDto, userId: number): Promise<PaginatedI<TaskE>> {
    // async findAll(paginatioDto: PaginateDto) {
    return await this.taskRepository.findAll(paginatioDto, userId);
  }

  findOne(id: number, userId: number) {
    return this.taskRepository.findOne(id, userId);
  }

  update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    return this.taskRepository.update(id, updateTaskDto, userId);
  }

  remove(id: number, userId: number) {
    return this.taskRepository.remove(id, userId);
  }
}

import { InjectRepository } from "@nestjs/typeorm";
import { TaskE } from "../entities/task.entity";
import { FindOperator, Like, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { PaginateDto } from '@common/dto/paginate.dto'
import { PaginatedI } from "@/common/interface/paginated.interface";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdateTaskDto } from "../dto/update-task.dto";

// interface WhereOptionsI {
//     take: number;
//     skip: number;
//     where: {
//         createdBy: number;
//         title?: FindOperator<string>[];
//     }

// }

export class TaskRepository {

    constructor(
        @InjectRepository(TaskE) private readonly taskRepository: Repository<TaskE>
    ) { }

    async create(createTaskDto: CreateTaskDto): Promise<TaskE> {
        const newTask = this.taskRepository.create(createTaskDto);
        return await this.taskRepository.save(newTask);
    }

    async findAll(paginationDto: PaginateDto, userId: number): Promise<PaginatedI<TaskE>> {
        const { limit, page, search } = paginationDto;
        const skip = limit * (page - 1);

        const options: any = {
            take: limit,
            skip,
            where: {
                createdBy: userId
            }
        }

        if (search) {
            options.where = [
                {
                    createdBy: userId,
                    title: Like(`%${search}%`)
                },
                {
                    createdBy: userId,
                    status: Like(`%${search}%`)
                },
                {
                    createdBy: userId,
                    fileName: Like(`%.${search}%`)
                }
            ]
        }
        const data = await this.taskRepository.findAndCount(options);
        if (data[0].length === 0) {
            throw new HttpException('No tasks were found', HttpStatus.NOT_FOUND);
        }

        return {
            data: data[0],
            meta: {
                page,
                total: data[1],
            }
        }

    }

    async findOne(id: number, userId: number) {
        const data = await this.taskRepository.findOne({
            where: {
                id,
                createdBy: userId
            }
        });

        if (!data) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return data;

    }

    async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
        await this.findOne(id, userId);
        try {
            await this.taskRepository.update(id, updateTaskDto);
            return await this.findOne(id, userId);
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async remove(id: number, userId: number) {
        await this.findOne(id, userId);
        try {
            await this.taskRepository.softDelete(id);
            return {
                message: 'Task deleted successfully'
            }
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
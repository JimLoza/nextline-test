import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../types/task.type";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {

    @ApiProperty({
        description: 'The title of the task',
        example: 'Task 1'
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'The description of the task',
        example: 'This is the task description'
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The status of the task',
        example: 'OPEN',
        enum: TaskStatus
    })
    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: TaskStatus;

    @ApiProperty({
        description: 'The due date of the task',
        example: '2021-12-31'
    })
    @IsDateString()
    dueDate: Date;

    @ApiProperty({
        description: 'The comment of the task',
        example: 'This is the task comment'
    })
    @IsString()
    comment: string;

    @IsNumber()
    @IsOptional()
    createdBy?: number;

    @ApiProperty({
        description: 'The tags of the task',
        example: ['tag1', 'tag2']
    })
    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsString()
    @IsOptional()
    fileName?: string;

}

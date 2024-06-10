import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile, ParseFilePipeBuilder, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Res, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators/get-user.decorator';
import { PaginateDto } from '@/common/dto/paginate.dto';
import { UserI } from '@/common/interface/user.interface';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';
import { diskStorage } from 'multer';



@ApiTags('task')
@ApiUnauthorizedResponse({
  schema: {
    example: {
      statusCode: 401,
      message: 'Invalid credentials'
    },
  }
})
@ApiNotFoundResponse({
  schema: {
    example: {
      statusCode: 404,
      message: 'Task not found'
    },
  }
})
@ApiInternalServerErrorResponse({
  schema: {
    example: {
      statusCode: 500,
      message: 'Internal server error'
    },
  }
})
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  @ApiCreatedResponse({
    schema: {
      example: {
        id: 1,
        title: 'Task 1',
        description: 'Description',
        status: 'OPEN',
        dueDate: '2021-12-31',
        comment: 'Comment',
        createdBy: 1,
        createdAt: '2021-09-18T17:59:00.000Z',
        updatedAt: '2021-09-18T17:59:00.000Z'
      },
    }
  })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetCurrentUser() user: any
  ) {
    // Add the user id to the createTaskDto
    createTaskDto.createdBy = user.id;
    return this.taskService.create(createTaskDto);
  }

  @Post('upload-file/:id')
  @ApiCreatedResponse({
    schema: {
      example: {
        message: 'File uploaded successfully',
        file: {
          fieldname: 'file',
          originalname: 'filename.pdf',
          encoding: '7bit',
          mimetype: 'application/pdf',
          destination: './uploads',
          filename: '1632024593520-file.pdf',
          path: 'uploads/1632024593520-file.pdf',
          size: 0
        }
      },
    }
  })
  @UseInterceptors(
    FileInterceptor(
      'file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(pdf|png|jpg)$/)) {
          return callback(new BadRequestException('File type is not supported'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024
      }
    })
  )
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @GetCurrentUser() user: UserI
  ) {
    await this.taskService.update(id, { fileName: file.filename }, user.id)
    return {
      message: 'File uploaded successfully',
      file: file
    }
  }

  //Get uploaded files
  @Get('uploads/:filename')
  seeUploadedFile(@Param('filename') filename: string, @Res() res: any) {
    const filePath = join(process.cwd(), 'uploads', filename);

    if (!existsSync(filePath)) {
      throw new BadRequestException('File not found');
    }

    // Set the headers to force download
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);

    // Send the file to the client
    res.sendFile(filePath);
  }

  @Get()
  @ApiAcceptedResponse({
    schema: {
      example: {
        data: [
          {
            id: 1,
            title: 'Task 1',
            description: 'Description',
            status: 'OPEN',
            dueDate: '2021-12-31',
            comment: 'Comment',
            createdBy: 1,
            createdAt: '2021-09-18T17:59:00.000Z',
            updatedAt: '2021-09-18T17:59:00.000Z'
          }
        ],
        meta: {
          page: 1,
          total: 1
        }
      }
    }
  })
  findAll(
    @Query() paginationDto: PaginateDto,
    @GetCurrentUser() user: UserI
  ) {
    return this.taskService.findAll(paginationDto, user.id);
  }

  @Get(':id')
  @ApiAcceptedResponse({
    schema: {
      example: {
        id: 1,
        title: 'Task 1',
        description: 'Description',
        status: 'OPEN',
        dueDate: '2021-12-31',
        comment: 'Comment',
        createdBy: 1,
        createdAt: '2021-09-18T17:59:00.000Z',
        updatedAt: '2021-09-18T17:59:00.000Z'
      }
    }
  })

  findOne(
    @Param('id') id: string,
    @GetCurrentUser() user: UserI
  ) {
    return this.taskService.findOne(+id, user.id);
  }

  @Patch(':id')
  @ApiAcceptedResponse({
    schema: {
      example: {
        id: 1,
        title: 'Task 1',
        description: 'Description',
        status: 'OPEN',
        dueDate: '2021-12-31',
        comment: 'Comment',
        createdBy: 1,
        createdAt: '2021-09-18T17:59:00.000Z',
        updatedAt: '2021-09-18T17:59:00.000Z'
      }
    }
  })

  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetCurrentUser() user: UserI
  ) {
    return this.taskService.update(+id, updateTaskDto, user.id);
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    schema: {
      example: {
        message: "Task deleted successfully"
      }
    }
  })
  remove(
    @Param('id') id: string,
    @GetCurrentUser() user: UserI
  ) {
    return this.taskService.remove(+id, user.id);
  }
}

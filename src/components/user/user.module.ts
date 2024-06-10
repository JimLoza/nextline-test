import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';

//Entities
import { UserE } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [
    TypeOrmModule.forFeature([UserE]),
    CommonModule,
  ],
  exports: [UserService]
})
export class UserModule { }

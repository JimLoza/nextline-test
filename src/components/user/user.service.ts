import { Injectable } from '@nestjs/common';


import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';

//Adapters
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';

//Entities
import { UserE } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcrypAdapter: BcryptAdapter
  ) { }

  create(createUserDto: CreateUserDto): Promise<UserE> {
    createUserDto.password = this.bcrypAdapter.hashSync(createUserDto.password)
    return this.userRepository.create(createUserDto)
  }

  async findByEmail(email: string): Promise<UserE> {
    return await this.userRepository.findByEmail(email)
  }

}

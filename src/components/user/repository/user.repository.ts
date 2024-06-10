import { Inject, NotFoundException } from "@nestjs/common";
//Entities
import { UserE } from "../entities/user.entity";
import { Repository } from "typeorm";

//DTOs
import { CreateUserDto } from "../dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository {

    constructor(
        @InjectRepository(UserE) private readonly userRepository: Repository<UserE>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserE> {
        const newUser = this.userRepository.create(createUserDto)
        return await this.userRepository.save(newUser)
    }

    async findByEmail(email: string): Promise<UserE> {
        const isUser = await this.userRepository.findOne({
            select: ['id', 'name', 'email', 'password'],
            where: { email }
        });
        if (!isUser) throw new NotFoundException('User not found');
        return isUser;
    }
}
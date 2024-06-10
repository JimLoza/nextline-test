import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';
import { UserE } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';


export type AuthenticatedUser = Partial<UserE> & { token: string };
@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(loginDto: LoginDto): Promise<AuthenticatedUser> {
    const user = await this.userService.findByEmail(loginDto.email);
    const passwordMatch = this.bcryptAdapter.compareSync(loginDto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwtService.sign({ ...user });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    }
  }

}

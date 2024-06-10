import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService, AuthenticatedUser } from './auth.service';
import { ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiCreatedResponse({
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        email: 'test@test.com',
        token: 'token'
      },
    }
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials'
      },
    }
  })
  login(@Body() loginDto: LoginDto): Promise<AuthenticatedUser> {
    return this.authService.validateUser(loginDto);
  }

}

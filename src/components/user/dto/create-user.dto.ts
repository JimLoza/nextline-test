import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'test@test.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The strong password of the user',
        example: 'Password1234!',
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

}

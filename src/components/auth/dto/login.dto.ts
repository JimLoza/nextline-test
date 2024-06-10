import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class LoginDto {

    //Add api tag to identify the field in the swagger documentation
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
    @IsString()
    password: string;
}
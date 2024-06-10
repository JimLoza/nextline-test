import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsString } from "class-validator";

export class PaginateDto {

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    skip?: number;

    @ApiPropertyOptional({ default: 10 })
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;


    @ApiPropertyOptional({ default: 1 })
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;

    @IsString()
    @IsOptional()
    search?: string;
}
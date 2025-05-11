import { IsDateString, IsNotEmpty, IsString, IsInt, IsNumber, IsOptional, IsBoolean } from "class-validator";

export class UpdateEventDto {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsInt()
    maxPlayers?: number;

    @IsOptional()
    @IsInt()
    courtCount?: number;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;

    @IsOptional()
    @IsString()
    description?: string;
}

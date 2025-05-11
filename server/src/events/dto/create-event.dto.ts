import { IsDateString, IsNotEmpty, IsString, IsInt, IsNumber, IsOptional, IsBoolean } from "class-validator";

export class CreateEventDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	location: string;

	@IsDateString()
	startDate: string;

  @IsDateString()
	endDate: string;

	@IsInt()
	maxPlayers: number;

	@IsInt()
	courtCount: number;

	@IsNumber()
	price: number;

	@IsBoolean()
	isPublic: boolean;

	@IsOptional()
	@IsString()
	description?: string;
}

import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class createProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  avatar: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  @Type(() => createProfileDto)
  @IsNotEmpty()
  profile: createProfileDto;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;
}

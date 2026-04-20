import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class createProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  avatar: string;
}

export class UpdateProfileDto extends PartialType(createProfileDto) {}

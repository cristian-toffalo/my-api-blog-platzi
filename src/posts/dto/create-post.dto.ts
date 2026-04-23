import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The title of the post'})
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The content of the post'})
  content?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The coverImage of the post'})
  coverImage?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The summary of the post'})
  summary?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ description: 'The categoryIds of the post'})
  categoryIds?: number[];
}

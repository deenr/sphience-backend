import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AreaOfInterest } from '@prisma/client';

export class UpdateEquipmentDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  shortDescription: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  longDescription: string;

  @ApiPropertyOptional({ enum: AreaOfInterest })
  @IsEnum(AreaOfInterest)
  @IsOptional()
  areaOfInterest: AreaOfInterest;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  locationName: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  postcode: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  additionalLocationInfo: string;
}

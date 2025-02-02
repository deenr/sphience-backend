import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AreaOfInterest } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class EquipmentResponseDto {
  @ApiProperty()
  id: string;

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

  constructor(partial: Partial<EquipmentResponseDto>) {
    Object.assign(this, partial);
  }
}

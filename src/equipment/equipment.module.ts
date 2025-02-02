import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { PrismaService } from '../prisma/prisma.service';
import { EquipmentController } from './equipment.controller';

@Module({
  providers: [EquipmentService, PrismaService],
  exports: [EquipmentService],
  controllers: [EquipmentController]
})
export class EquipmentModule {}

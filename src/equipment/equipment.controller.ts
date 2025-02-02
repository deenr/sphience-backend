import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards, HttpCode } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { Device, Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { EquipmentResponseDto } from './dto/equipment-response.dto';
import { CreateEquipmentDto } from './dto/create-equipment.dto';

@ApiTags('equipment')
@Controller('equipment')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new device' })
  @ApiResponse({ status: 201, type: EquipmentResponseDto })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.RESEARCHER, Role.STUDENT)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [EquipmentResponseDto] })
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.RESEARCHER, Role.STUDENT)
  @ApiOperation({ summary: 'Get a device by ID' })
  @ApiResponse({ status: 200, type: EquipmentResponseDto })
  @ApiResponse({ status: 404, description: 'Device not found' })
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOneById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a device' })
  @ApiResponse({ status: 200, type: EquipmentResponseDto })
  @ApiResponse({ status: 404, description: 'Device not found' })
  update(@Param('id') id: string, @Body() updateEquipmentDto: Partial<Device>) {
    return this.equipmentService.update({ id, ...updateEquipmentDto });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a device' })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(id);
  }
}

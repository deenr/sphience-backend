import { Injectable, NotFoundException } from '@nestjs/common';
import { AreaOfInterest, Device } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EquipmentService {
  public constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any[]> {
    const devices = await this.prismaService.device.findMany({
      include: {
        deviceDocuments: {
          include: {
            uploadedBy: true
          }
        },
        reservations: {
          where: {
            startDateTime: {
              gte: new Date()
            }
          },
          orderBy: {
            startDateTime: 'asc'
          },
          take: 1
        }
      }
    });

    return devices.map((device) => ({
      id: Number(device.id),
      title: device.name,
      description: device.longDescription || device.shortDescription || '',
      image: device.imageUrl || '',
      available: device.reservations.length === 0,
      availableDate: device.reservations[0]?.startDateTime || new Date(),
      areaOfInterest: (device.areaOfInterest as AreaOfInterest) || AreaOfInterest.COMPUTER_SCIENCE,
      documents: device.deviceDocuments.map((doc) => ({
        file: {
          name: doc.name
          // Add other File properties as needed
        } as File,
        uploadedBy: {
          id: Number(doc.uploadedBy.id),
          name: `${doc.uploadedBy.firstName} ${doc.uploadedBy.lastName}`,
          email: doc.uploadedBy.email,
          avatar: doc.uploadedBy.avatar
        }
      }))
    }));
  }

  public async findOneById(id: string): Promise<Device | null> {
    const device = await this.prismaService.device.findFirst({ where: { id } });

    if (!device) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }

    return device;
  }

  public async create(createEquipmentDto: Omit<Device, 'id' | 'createdAt' | 'updatedAt'>): Promise<Device> {
    return this.prismaService.device.create({ data: { ...createEquipmentDto } });
  }

  public async update(updateEquipmentDto: { id: string } & Partial<Device>): Promise<Device> {
    const { id, ...otherEquipmentDto } = updateEquipmentDto;
    return this.prismaService.device.update({ where: { id }, data: otherEquipmentDto });
  }

  public async remove(id: string): Promise<Device> {
    return this.prismaService.device.delete({ where: { id } });
  }
}

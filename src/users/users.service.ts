import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  public async findOneById(id: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { id } });
  }
}

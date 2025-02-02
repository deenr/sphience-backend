import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data: { ...createUserDto, avatar: '' } });
  }

  public async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  public async findOneById(id: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { id } });
  }

  public async findOneByAccessToken(accessToken: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { accessToken } });
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({ where: { id }, data: updateUserDto });
  }

  public async remove(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}

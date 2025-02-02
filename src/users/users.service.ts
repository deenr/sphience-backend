import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userDate: Pick<User, 'firstName' | 'lastName' | 'email' | 'password' | 'role'>): Promise<UserResponseDto> {
    const existingUser = await this.findOneByEmail(userDate.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hash(userDate.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...userDate,
          password: hashedPassword,
          avatar: `https://ui-avatars.com/api/?name=${userDate.firstName}+${userDate.lastName}`
        }
      });

      return new UserResponseDto(user);
    } catch (error) {
      throw new BadRequestException('Unable to create user');
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserResponseDto(user));
  }

  async findOneByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new UserResponseDto(user) : null;
  }

  async findOneById(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new UserResponseDto(user);
  }

  public async findUserByAccessToken(accessToken: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findFirst({
      where: { accessToken }
    });

    if (!user) {
      throw new NotFoundException(`User with access token not found`);
    }

    return new UserResponseDto(user);
  }

  async update(id: string, userDate: Partial<User>): Promise<UserResponseDto> {
    if (userDate.email) {
      const existingUser = await this.findOneByEmail(userDate.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    if (userDate.password) {
      userDate.password = await hash(userDate.password, 10);
    }

    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: userDate
      });
      return new UserResponseDto(user);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw new BadRequestException('Unable to update user');
    }
  }

  async remove(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.delete({ where: { id } });
      return new UserResponseDto(user);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw new BadRequestException('Unable to delete user');
    }
  }
}

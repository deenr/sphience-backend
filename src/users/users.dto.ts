import { Role } from '@prisma/client';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
  accessToken?: string;
  refreshToken?: string;
}

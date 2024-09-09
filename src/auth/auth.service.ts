import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async signUp(firstName: string, lastName: string, email: string, password: string): Promise<{ token: string }> {
    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({ data: { firstName, lastName, email, password: hashedPassword } });
    const accessToken = this.jwtService.sign({ id: user.id, email: user.email }, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    const refreshToken = this.jwtService.sign({ id: user.id, email: user.email }, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

    await this.prismaService.user.update({ where: { id: user.id }, data: { accessToken, refreshToken } });

    return { token: accessToken };
  }

  public async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = this.jwtService.sign({ id: user.id, email: user.email }, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
      const refreshToken = this.jwtService.sign({ id: user.id, email: user.email }, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

      await this.prismaService.user.update({ where: { id: user.id }, data: { accessToken, refreshToken } });

      return { token: accessToken };
    }

    throw new UnauthorizedException();
  }
}

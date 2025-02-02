import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async signUp({ firstName, lastName, email, password, role }: CreateUserDto): Promise<{ accessToken: string }> {
    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({ firstName, lastName, email, password: hashedPassword, role });
    const accessToken = this.jwtService.sign({ id: user.id, email: user.email, role: user.role }, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    const refreshToken = this.jwtService.sign({ id: user.id, email: user.email }, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

    await this.usersService.update(user.id, { accessToken, refreshToken });

    return { accessToken };
  }

  public async signIn(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = this.jwtService.sign({ id: user.id, email: user.email, role: user.role }, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
      const refreshToken = this.jwtService.sign({ id: user.id, email: user.email }, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

      await this.usersService.update(user.id, { accessToken, refreshToken });

      return { accessToken };
    }

    throw new UnauthorizedException();
  }

  public async signOut(accessToken: string): Promise<void> {
    if (!accessToken) {
      return;
    }

    const user = await this.usersService.findUserByAccessToken(accessToken);

    if (!user) {
      return;
    }

    await this.usersService.update(user.id, { accessToken: null, refreshToken: null });
  }

  public async getToken(accessToken: string): Promise<{ accessToken: string }> {
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findUserByAccessToken(accessToken);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { refreshToken } = user;

    try {
      await this.jwtService.verifyAsync(accessToken, { secret: process.env.ACCESS_TOKEN_SECRET });

      return { accessToken };
    } catch (error) {
      try {
        await this.jwtService.verifyAsync(refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET });

        const newAccessToken = this.jwtService.sign({ id: user.id, email: user.email, role: user.role }, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

        await this.usersService.update(user.id, { accessToken: newAccessToken });

        return { accessToken };
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  }

  public async refreshToken(accessToken: string): Promise<{ accessToken: string }> {
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findUserByAccessToken(accessToken);

    if (!user) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(user.refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET });

      const accessToken = this.jwtService.sign({ id: user.id, email: user.email, role: user.role }, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

      await this.usersService.update(user.id, { accessToken });

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

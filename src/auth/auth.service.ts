import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as jwt from 'jsonwebtoken';
import TokenPayload from './interfaces/tokenPayload.interface';
import { LoginGoogleDto } from './dto/login-google.dto';
import { User, UserDocument, UserRole } from 'src/users/models/_user.model';
import { LoginFacebookDto } from './dto/login-facebook.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UserNotFoundException } from 'src/users/exceptions/userNotFound.exception';
import { JwtService } from '@nestjs/jwt';
import { CreateQuery, FilterQuery } from 'mongoose';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerationData: RegisterDto): Promise<UserDocument> {
    let user = await this.userRepository.findOne({
      email: registerationData.email,
    } as FilterQuery<UserDocument>);
    if (user) throw new BadRequestException('phone should be unique');

    user = await this.userRepository.createDoc({
      ...registerationData,
      role: UserRole.ADMIN,
      enabled: true
    } as User);
    return user;
  }

  async login(loginDto: LoginDto): Promise<{
    user: UserDocument;
    token: string;
  }> {
    const { email } = loginDto;
    let user = await this.userRepository.findOne({
      email: loginDto.email,
    } as FilterQuery<UserDocument>);
    if (!user) throw new UserNotFoundException();
    if (!(await (user as any).isValidPassword(loginDto.password)))
      throw new UnauthorizedException('invalid credentials');

    if (user.enabled === false)
      throw new UnauthorizedException('your account is deactivated');
    const payload: TokenPayload = {
      userId: user.id,
    };
    const options = {};
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return { user, token };
  }


  async verifyUserByTokenFromSocket(
    token: string,
  ): Promise<false | UserDocument> {
    try {
      const decoded: TokenPayload = await this.jwtService.verify(token);
      if (decoded.userId === undefined) {
        return false;
      }

      const user = await this.userRepository.findOne({
        _id: decoded.userId,
      } as FilterQuery<UserDocument>);

      if (!user || user.enabled === false) {
        return false;
      }
      return user;
    } catch (err) {
      return false;
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
  UseFilters,
  UploadedFiles,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  HttpCode,
  Query,
  CacheInterceptor,
  CacheKey,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { request } from 'http';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, UserRole } from './models/_user.model';
import { UsersService } from './users.service';
import { REQUEST } from '@nestjs/core';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import ParamsWithId from 'src/utils/paramsWithId.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { FilterQuery, PaginateResult } from 'mongoose';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseGeneral } from 'src/utils/pagination/apiOkResponseGeneral';
var ObjectId = require('mongodb').ObjectId;

import { FilterQueryOptionsUser } from './dto/filterQueryOptions.dto';
import { UserRepository } from './users.repository';
import { Constants } from 'src/utils/constants';
import { CreateEmpolyeeDto } from './dto/createEmpolyee.dto';
import { UpdateEmpolyeeDto } from './dto/updateEmp.dto';

@ApiBearerAuth()
@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly UserRepository: UserRepository,
    @Inject(REQUEST) private readonly req: Record<string, unknown>,
  ) { }

  // @Roles(UserRole.STUDENT)
  // @CacheKey(Constants.GET_POSTS_CACHE_KEY)
  @Public()
  @ApiOkResponseGeneral(User)
  @Get()
  async findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsUser,
  ): Promise<PaginateResult<UserDocument> | UserDocument[]> {
    return await this.usersService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsUser,
    );
  }

  @Get('profile')
  async getProfile(): Promise<UserDocument> {
    return await this.usersService.getProfile(this.req.me as UserDocument);
  }

  @Patch('profile')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  async updateProfile(
    @UploadedFiles()
    files,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<UserDocument> {
    if (files && files.photo) updateUserData.photo = files.photo[0].secure_url;

    delete updateUserData.enabled;

    return await this.usersService.update(
      { _id: this.req.me } as FilterQuery<UserDocument>,
      updateUserData,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/change-password')
  async changePassword(
    @Body() { oldPassword, newPassword }: ChangePasswordDto,
    @AuthUser() me: UserDocument,
  ): Promise<UserDocument> {
    return await this.usersService.changePassword(
      { oldPassword, newPassword },
      me,
    );
  }

  @Public()
  @Get(':id')
  async fetchUserById(@Param() { id }: ParamsWithId): Promise<UserDocument> {
    return await this.usersService.findOne({
      _id: id,
    } as FilterQuery<UserDocument>);
  }

  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @Post('add-empolyee')
  async addStudent(
    @Body() registerationData: CreateEmpolyeeDto,
    /*  @UploadedFiles()
    files, */
  ) {
    let user = await this.UserRepository.findOne({
      $or: [
        // { email: registerationData.email },
        { phone: registerationData.phone },
      ],
    });
    if (user) throw new BadRequestException('phone and email should be unique');

    // let code;
    // console.log(code)
    // do {
    //   code = Math.floor(Math.random() * 90000) + 10000;
    // } while (await await this.UserRepository.findOne({ code: code }));
    // registerationData.code = code

    let newUser = await this.UserRepository.createDoc({
      ...registerationData,
      role: UserRole.EMPOLYEE,
      enabled: true,
      pushTokens: []
    });
    return newUser;
  }


  @Roles(UserRole.ADMIN)
  @Patch('update-employee/:id/')
  async updateMember(
    @Body() updateUserData: UpdateEmpolyeeDto,
    @Param() { id }: ParamsWithId,
  ): Promise<UserDocument> {
    return await this.UserRepository.updateUser(
      { _id: ObjectId(id) } as any,
      updateUserData,
    );
  }

  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param() { id }: ParamsWithId) {
    return await this.usersService.remove(ObjectId(id));
  }


}

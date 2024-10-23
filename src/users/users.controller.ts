import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getUserById(@Param('id') id :string, @Req() req : Request){
    return this.usersService.getUserById(id, req);
  }

  @Get()
  getAllUser(){
    return this.usersService.getAllUser();
  }
}

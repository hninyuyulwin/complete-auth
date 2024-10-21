import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getUserById(@Param('id') id :string){
    return this.usersService.getUserById(id);
  }

  @Get()
  getAllUser(){
    return this.usersService.getAllUser();
  }
}

import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() craeteDto : CreateAuthDto){
    return this.authService.signup(craeteDto)
  }

  @Post("login")
  signin(@Body() dto : CreateAuthDto,@Req() req: Request, @Res() res: Response){
    return this.authService.login(dto,req, res)
  }

  @Get("signout")
  signout(@Req() req: Request, @Res() res: Response){
    return this.authService.signout(req, res)
  }
}

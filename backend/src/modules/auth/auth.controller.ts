import { Body, Request, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, UnauthorizedException, Res } from '@nestjs/common';
import { Request as RequestExpress, Response as ResponseExpress } from 'express';
import { PermissionsDto } from './dto/permission/get-permission.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UserDto } from '../user/dto/user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';

import { TResponse } from '~/common/types/response';
import { JwtGuard } from '~/common/guards/jwt.guard';
import { RolesGuard } from '~/common/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() signUpDto: SignUpDto): Promise<TResponse<UserDto>> {
    const user = await this.authService.signUp(signUpDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: user,
    };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: ResponseExpress): Promise<TResponse<UserDto>> {
    const data = await this.authService.signIn(signInDto.email, signInDto.password);
    response.cookie('refresh_token', data.refresh_token, {
      httpOnly: true,
      signed: true,
    });
    response.cookie('access_token', data.access_token, {
      httpOnly: true,
      signed: true,
    });
    const res: TResponse<UserDto> = {
      statusCode: HttpStatus.ACCEPTED,
      data: data.user,
    };
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(@Request() req: RequestExpress, @Res() response: ResponseExpress): Promise<void> {
    const refresh_token: string = req.signedCookies.refresh_token;
    const data = await this.authService.refreshToken(refresh_token);
    console.log('getting new access_token: ', data.access_token);
    response.cookie('access_token', data.access_token, {
      httpOnly: true,
      signed: true,
    });

    response.status(200).json({
      statusCode: HttpStatus.OK,
    });
  }

  @UseGuards(AuthGuard, JwtGuard, RolesGuard)
  @Get('permissions')
  async getFullPermissions(@Request() req: RequestExpress): Promise<TResponse<PermissionsDto[] | undefined>> {
    console.log(req.user);
    const id = req.user?.id;
    if (!id) throw new UnauthorizedException('ID User not found');
    const permission = await this.authService.getFullPermissions(id);
    return {
      statusCode: HttpStatus.OK,
      data: permission,
    };
  }
}

/* eslint-disable class-methods-use-this */
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('sessions')
export class SessionsController {
  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req) {
    return req.user;
  }
}

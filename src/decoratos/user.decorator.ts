import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import UserModel from '../users/providers/UsersRepository/models/User';

export const User = createParamDecorator<UserModel>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

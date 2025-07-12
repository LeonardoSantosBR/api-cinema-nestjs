import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'ws') {
      const client = ctx.switchToWs().getClient();
      return client.data.user;
    }
    const request = ctx.switchToHttp().getRequest();
    return request?.user;
  },
);

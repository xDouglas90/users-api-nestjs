import { Module } from '@nestjs/common';
import { StringUtils } from 'src/utils/string-utils';
import { UuidUtils } from 'src/utils/uuid-utils';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, StringUtils, UuidUtils],
})
export class UsersModule {}

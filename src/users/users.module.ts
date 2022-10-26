import { Module } from '@nestjs/common';
import { StringUtils } from 'src/utils/string-utils';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, StringUtils],
})
export class UsersModule {}

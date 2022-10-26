import { IsArray, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly email?: string;

  @IsArray()
  readonly stack?: string[];
}

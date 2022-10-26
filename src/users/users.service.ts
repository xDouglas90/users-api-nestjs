import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StringUtils } from 'src/utils/string-utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private stringUtils: StringUtils,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new User();

    newUser.name = this.stringUtils.capitalize(createUserDto.name);
    newUser.email = this.stringUtils.toLowerCase(createUserDto.email);
    newUser.stack = createUserDto.stack.map((stack) =>
      this.stringUtils.toLowerCase(stack),
    );

    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find({ order: { name: 'ASC' } });
  }

  findOne(id: number) {
    const user = this.usersRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    const updatedUser = Object.assign(user, updateUserDto);

    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    this.usersRepository.remove(user);
  }
}

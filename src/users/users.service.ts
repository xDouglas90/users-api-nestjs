import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// mock data for now - we'll replace this with a real database later
const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    stack: ['React', 'Node'],
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    stack: ['Angular', 'Spring'],
  },
  {
    id: 3,
    name: 'June Doe',
    email: 'june@gmail.com',
    stack: ['Vue', 'Nuxt'],
  },
];

@Injectable()
export class UsersService {
  findAll(): User[] {
    return users;
  }

  findOne(id: number): User {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new BadRequestException(`User #${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new BadRequestException(`User with email ${email} not found`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const user = users.find((user) => user.email === createUserDto.email);

    if (user) {
      throw new BadRequestException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const id = users.length + 1;

    const newUser = { id, ...createUserDto };

    users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);

    if (!user) {
      throw new BadRequestException(`User #${id} not found`);
    }
    const index = users.findIndex((user) => user.id === id);

    users[index] = { ...user, ...updateUserDto };

    return users[index];
  }

  remove(id: number): void {
    const user = this.findOne(id);

    if (!user) {
      throw new BadRequestException(`User #${id} not found`);
    }

    const index = users.findIndex((user) => user.id === id);

    users.splice(index, 1);
  }
}

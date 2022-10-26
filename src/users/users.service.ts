import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = {
  id: number;
  name: string;
  email: string;
};

// mock data for now - we'll replace this with a real database later
const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@gmail.com',
  },
  {
    id: 3,
    name: 'June Doe',
    email: 'june@gmail.com',
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

  create(createUserDto: CreateUserDto): User {
    const newUser = {
      id: users.length + 1,
      ...createUserDto,
    };
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

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StringUtils } from 'src/utils/string-utils';

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
  constructor(private readonly stringUtils: StringUtils) {}

  create(createUserDto: CreateUserDto): User {
    const user = users.find((user) => user.email === createUserDto.email);

    if (user) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const id = users.length + 1;

    const newUser = new User();

    newUser.id = id;
    newUser.name = this.stringUtils.capitalize(createUserDto.name);
    newUser.email = this.stringUtils.toLowerCase(createUserDto.email);
    newUser.stack = createUserDto.stack.map((tech) =>
      this.stringUtils.capitalize(tech),
    );

    users.push(newUser);

    return newUser;
  }

  findAll(): User[] {
    return users;
  }

  findOne(id: number): User {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
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

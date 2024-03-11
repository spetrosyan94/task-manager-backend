import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto) {
    const user = this.userRepository.create();

    // const supervisor = user.supervisor
    //   ? await this.userRepository.findOne({
    //       where: { id: userDto.supervisor },
    //     })
    //   : null;

    const supervisor = userDto.supervisor
      ? await this.userRepository.findOneBy({
          id: userDto.supervisor,
        })
      : null;

    if (userDto.supervisor && !supervisor)
      throw new Error('Supervisor not found');

    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.middleName = userDto.middleName;
    user.login = userDto.login;
    user.supervisor = supervisor;

    // TODO move to .env
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);
    user.password = hash;

    const result = await this.userRepository.save(user);
    return result;
  }

  // Метод для поиска пользователя
  async findOne(login: string) {
    return this.userRepository.findOneBy({ login });
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['supervisor'],
    });
  }
}

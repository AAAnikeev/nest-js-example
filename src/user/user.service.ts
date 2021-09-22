import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOneByName(name: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async createUser(dto: CreateUserDto): Promise<User | undefined> {
    const user = await this.usersRepository.save(dto); // don't understand why create is not working
    return user;
  }

  async getAllUsers() {
    return await this.usersRepository.find();
  }
}

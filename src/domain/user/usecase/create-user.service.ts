import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/user/entity';
import { CreateUserDto } from 'src/domain/user/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity>{
    let user = await this.userRepository.findOne({
      where: {
        email: dto.email
      }
    })

    if(user) {
      throw new Error('User already exists')
    }
    
    user = this.userRepository.create(dto)

    return this.userRepository.save(user)
  }
}

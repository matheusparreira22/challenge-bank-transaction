import { Repository } from 'typeorm';
import { UserService } from '../usecase/create-user.service';
import { UserController } from '../controller/user.controller';
import { UserEntity } from '../entity/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
            provide: getRepositoryToken(UserEntity),
            useValue: {},
        },
        {
            provide: UserService,
            useValue: {
              create: jest.fn(),
            },
        }
      ],
    }).compile();

    userRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as Repository<UserEntity>;

    userService = new UserService(userRepository);
    controller = new UserController(userService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    const dto = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'StrongP@ssw0rd',
      cpf: '12345678900',
      isLojist: false,
    };
    await controller.create(dto);
    expect(userService.create).toHaveBeenCalledWith(dto);
  });
});


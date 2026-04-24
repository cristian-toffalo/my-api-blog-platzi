import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  let repository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    repository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const users = [{ id: 1 }, { id: 2 }];
    repository.find.mockResolvedValue(users);

    await expect(service.findAll()).resolves.toEqual(users);
    expect(repository.find).toHaveBeenCalledTimes(1);
  });

  it('should return one user by id', async () => {
    const user = { id: 1, profile: { firstName: 'Cristian' } };
    repository.findOne.mockResolvedValue(user);

    await expect(service.getUserById(1)).resolves.toEqual(user);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['profile'],
    });
  });

  it('should throw NotFoundException when user does not exist', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.getUserById(999)).rejects.toThrow(NotFoundException);
  });

  it('should create and return the saved user', async () => {
    const dto = {
      email: 'test@test.com',
      password: '12345678',
      profile: { firstName: 'Cristian', lastName: 'Toffalo' },
    };

    const createdUser = { ...dto };
    const savedUser = { id: 1, ...dto };

    repository.create.mockReturnValue(createdUser);
    repository.save.mockResolvedValue(savedUser);
    repository.findOne.mockResolvedValue(savedUser);

    await expect(service.create(dto as any)).resolves.toEqual(savedUser);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(createdUser);
  });

  it('should throw BadRequestException when create fails', async () => {
    repository.create.mockReturnValue({});
    repository.save.mockRejectedValue(new Error('db error'));

    await expect(service.create({} as any)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should update and return the saved user', async () => {
    const user = { id: 1, email: 'old@test.com', profile: {} };
    const changes = { email: 'new@test.com', profile: {} };
    const merged = { ...user, ...changes };

    repository.findOne.mockResolvedValue(user);
    repository.merge.mockReturnValue(merged);
    repository.save.mockResolvedValue(merged);

    await expect(service.update(1, changes as any)).resolves.toEqual(merged);
    expect(repository.merge).toHaveBeenCalledWith(user, changes);
    expect(repository.save).toHaveBeenCalledWith(merged);
  });

  it('should delete an existing user', async () => {
    repository.findOne.mockResolvedValue({ id: 1, profile: {} });
    repository.delete.mockResolvedValue({ affected: 1 });

    await expect(service.delete(1)).resolves.toEqual({
      message: 'User deleted',
    });
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { BadRequestException } from '@nestjs/common';

describe('PostsService', () => {
  let service: PostsService;

  let repository = {
    findAll: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  };

  const posts = [
    {
      id: 1,
      title: 'Test Post 1',
      user: { id: 1, email: 'test1@email.com' },
      categories: [
        {
          id: 1,
          name: 'Alimentos',
        },
      ],
    },
    {
      id: 2,
      title: 'Test Post 2',
      user: { id: 2, email: 'test2@email.com' },
      categories: [
        {
          id: 1,
          name: 'Alimentos',
        },
      ],
    },
  ];

  const postsForCreate = [
    {
      title: 'Test Post 1',
      categories: [
        {
          id: 1,
          name: 'Alimentos',
        },
      ],
    },
    {
      title: 'Test Post 2',
      categories: [
        {
          id: 1,
          name: 'Alimentos',
        },
      ],
    },
  ];

  const userForPostCreation = { id: 1 };
  const userForPostCreation2 = { id: 2 };

  beforeEach(async () => {
    repository = {
      findAll: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    repository.find.mockResolvedValue(posts);
    await expect(service.findAll()).resolves.toEqual(posts);
    expect(repository.find).toHaveBeenCalledTimes(1);
    expect(repository.find).toHaveBeenCalledWith({
      relations: ['user.profile', 'categories'],
    });
  });

  it('Should create and return a new Post', async () => {
    const dto = {
      ...postsForCreate[0],
    };

    const createdPost = { ...dto };
    const savedPost = {
      id: 1,
      ...createdPost
    };

    repository.create.mockResolvedValue(createdPost);
    repository.save.mockResolvedValue(savedPost);
    repository.findOne.mockResolvedValue(savedPost);

    await expect(service.create(dto, userForPostCreation.id)).resolves.toEqual(
      savedPost,
    );
    expect(repository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should throw BadRequestException when create fails', async () => {
    repository.create.mockReturnValue({})
    repository.save.mockRejectedValue(new Error('db erroor'));

    await expect(service.create({}, userForPostCreation.id)).rejects.toThrow(
      BadRequestException,
    );
  });

  // it('should update a Post', async () => {

  // });
});

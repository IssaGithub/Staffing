import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

// Mock für bcryptjs
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;
  let jwtService: JwtService;

  // Mock User als Objekt mit save-Methode
  const mockUser = {
    _id: 'userId123',
    email: 'test@example.com',
    password: 'hashedPassword',
    save: jest.fn(),
  };

  // Erstelle einen Mock, der sich wie ein Konstruktor verhält
  const mockUserModel = function () {
    return mockUser;
  };

  // Füge die benötigten Methoden zum Model hinzu
  mockUserModel.findOne = jest.fn();

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);

    // Reset mocks zwischen Tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('sollte einen neuen User erstellen', async () => {
      mockUser.save.mockResolvedValue(undefined);

      await authService.signUp(mockCredentials);

      expect(bcryptjs.genSalt).toHaveBeenCalled();
      expect(bcryptjs.hash).toHaveBeenCalledWith('password123', 'salt');
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('sollte einen ConflictError werfen, wenn das Anlegen eines neuen Users fehlschlägt', async () => {
      mockUser.save.mockRejectedValue(new Error('Duplicate key'));

      await expect(authService.signUp(mockCredentials)).rejects.toThrow(
        ConflictException
      );
    });
  });

  describe('login', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockUser = {
      _id: 'userId123',
      email: 'test@example.com',
      password: 'hashedPassword',
    };

    it('sollte einen AccessToken zurückgeben, wenn die Credentials korrekt sind', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);
      (bcryptjs.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('mockedAccessToken');

      const result = await authService.login(mockCredentials);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
      expect(bcryptjs.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword'
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith({ _id: 'userId123' });
      expect(result).toEqual({ accessToken: 'mockedAccessToken' });
    });

    it('sollte einen Unauthorized Error werfen, wenn der User nicht gefunden wird', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(authService.login(mockCredentials)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it('sollte einen Unauthorized Error werfen, wenn das Passwort ungültig ist', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);
      (bcryptjs.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(mockCredentials)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});

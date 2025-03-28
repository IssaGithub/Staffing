import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  // Mock für den AuthService erstellen
  const mockAuthService = {
    signUp: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService, // Mock als Provider bereitstellen
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call signUp method of AuthService', async () => {
    // Verwende den Mock direkt statt den Service zu überschreiben
    mockAuthService.signUp.mockResolvedValue(undefined);

    const authCredentialsDTO = {
      email: 'patrick@test.de',
      password: 'password123',
    };
    await controller.signUp(authCredentialsDTO);
    expect(authService.signUp).toHaveBeenCalledWith(authCredentialsDTO);
  });
});

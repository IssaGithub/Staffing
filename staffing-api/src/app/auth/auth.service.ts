import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { AuthCredentialsDTO } from '../models/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { email, password } = authCredentialsDTO;
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        'Bei der Registrierung gabt es einen Fehler. Bitte versuchen Sie es später erneut.'
      );
    }
  }

  async login(
    authCredentialsDTO: AuthCredentialsDTO
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDTO;
    const user = await this.userModel.findOne({ email });
    if (user && (await bcryptjs.compare(password, user.password))) {
      const id = user._id.toString();
      const payload: JwtPayload = {
        _id: id,
      };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Falsche Anmeldedaten. Bitte versuchen Sie es erneut.'
      );
    }
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { AuthCredentialsDTO } from '../models/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
}

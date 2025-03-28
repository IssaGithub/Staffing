import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../models/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    public configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserDocument> {
    const { _id } = payload;
    const user: UserDocument = await this.userModel.findOne({
      _id,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  //Für Passwort-Validierung siehe AuthCredentialsDTO
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  //ID
  _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

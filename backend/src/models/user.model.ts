import mongoose, { Document, Schema, Types } from 'mongoose';
import { Roles } from '../config/constants';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: Roles;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(Roles), default: Roles.USER },
});

export const User = mongoose.model<IUser>('User', UserSchema);

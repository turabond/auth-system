import mongoose, { Document, Schema, Types } from 'mongoose';

export type Role = 'Admin' | 'Manager' | 'User';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: Role;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Manager', 'User'], default: 'User' },
});

export const User = mongoose.model<IUser>('User', UserSchema);

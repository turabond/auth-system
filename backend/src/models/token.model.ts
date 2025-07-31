import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  user: string;
  refreshToken: string;
}

const tokenSchema = new Schema<IToken>({
  user: { type: String, ref: 'User', required: true },
  refreshToken: { type: String, required: true },
});

export const Token = mongoose.model<IToken>('Token', tokenSchema);
export type TokenDocument = typeof Token extends mongoose.Model<infer T> ? T : never;

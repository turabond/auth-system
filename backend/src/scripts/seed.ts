import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model';
import { hashPassword } from '../utils/password';

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('Connected to DB');

  const users = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: await hashPassword('Admin123!'),
      role: 'Admin',
    },
    {
      username: 'manager',
      email: 'manager@example.com',
      password: await hashPassword('Manager123!'),
      role: 'Manager',
    },
    {
      username: 'user',
      email: 'user@example.com',
      password: await hashPassword('User123!'),
      role: 'User',
    },
  ];

  await User.deleteMany({});
  await User.insertMany(users);
  console.log('Users seeded');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});

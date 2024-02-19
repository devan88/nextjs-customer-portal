import { authConfig } from '@/utils/auth';
import NextAuth from 'next-auth';

export default NextAuth(authConfig);

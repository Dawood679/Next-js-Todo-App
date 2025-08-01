// types/next-auth.d.ts
import { NextAuth as _NextAuth } from 'next-auth';


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
}

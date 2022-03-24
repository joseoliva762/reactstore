/* eslint-disable no-unused-vars */
import { User } from '@models/user';

export interface AuthContextModel {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

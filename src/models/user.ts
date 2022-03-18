export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface Auth {
  access_token: string;
}

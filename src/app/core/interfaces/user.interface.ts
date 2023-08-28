export interface AuthResponse {
  expiresIn: number;
  message: string;
  token: string;
  user: User;
}

export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
};

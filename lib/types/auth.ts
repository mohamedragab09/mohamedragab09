
export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
}

export interface ProfileResponse {
  user: User;
}

export interface ApiError {
  message: string;
}

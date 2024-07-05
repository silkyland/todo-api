export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
}

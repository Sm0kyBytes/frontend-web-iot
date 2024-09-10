export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel extends LoginModel {
  username: string;
}

export interface UserModel {
  id?: number;
  username: string;
  email: string;
  password: string;
  create_at?: Date;
}

export interface UserProfile {
  username: string;
  email: string;
}

export interface UserProfileWithToken extends UserProfile {
  token: string;
}

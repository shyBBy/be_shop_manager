export interface UserInterface {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

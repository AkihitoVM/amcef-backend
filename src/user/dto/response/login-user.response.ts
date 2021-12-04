import { User } from "../../../models";

export class LoginResponse {
  accessToken!: string;
  user!: User;
}

import { UserEntity } from "../../../domain/entities/user/user.entity";

export interface CreateUserResponse {
  success: boolean;
  message: string;
  user?: UserEntity;
}

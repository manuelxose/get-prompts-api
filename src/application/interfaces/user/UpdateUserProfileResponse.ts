import { UserEntity } from "../../../domain/entities/user/user.entity";

export interface UpdateUserProfileResponse {
  success: boolean;
  message: string;
  user?: UserEntity;
}

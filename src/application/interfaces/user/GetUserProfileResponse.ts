import { UserEntity } from "../../../domain/entities/user/user.entity";

export interface GetUserProfileResponse {
  success: boolean;
  message: string;
  user?: UserEntity;
}

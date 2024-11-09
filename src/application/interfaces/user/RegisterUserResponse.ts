// src/application/interfaces/responses/user/RegisterUserResponse.ts

import { UserEntity } from "../../../domain/entities/user/user.entity";

export interface RegisterUserResponse {
  success: boolean;
  message: string;
  user?: UserEntity;
}

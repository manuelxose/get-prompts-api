// src/domain/interfaces/user/UserRepository.ts

import {
  CreateUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
  FindUserByIdDTO,
  FindUserByEmailDTO,
} from "../dtos/user";
import { UserEntity } from "../entities/user/user.entity";

export abstract class UserRepository {
  abstract create(user: CreateUserDTO): Promise<UserEntity>;
  abstract update(user: UpdateUserDTO): Promise<UserEntity>;
  abstract delete(userId: DeleteUserDTO): Promise<void>;
  abstract findById(userId: FindUserByIdDTO): Promise<UserEntity | null>;
  abstract findByEmail(email: FindUserByEmailDTO): Promise<UserEntity | null>; // Puede ser usado para verificar duplicados en perfiles
  abstract findAll(): Promise<UserEntity[]>;
}

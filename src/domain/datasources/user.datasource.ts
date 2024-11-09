import {
  CreateUserDTO,
  DeleteUserDTO,
  FindUserByEmailDTO,
  FindUserByIdDTO,
  UpdateUserDTO,
} from "../dtos/user";
import { UserEntity } from "../entities/user/user.entity";

export abstract class UserDataSource {
  abstract create(dto: CreateUserDTO): Promise<UserEntity>;
  abstract update(dto: UpdateUserDTO): Promise<UserEntity>;
  abstract delete(dto: DeleteUserDTO): Promise<void>;
  abstract findById(dto: FindUserByIdDTO): Promise<UserEntity | null>;
  abstract findByEmail(dto: FindUserByEmailDTO): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
}

// src/infrastructure/repositories/user.repository.ts

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserDataSource } from "../datasources";
import {
  CreateUserDTO,
  UpdateUserDTO,
  DeleteUserDTO,
  FindUserByIdDTO,
  FindUserByEmailDTO,
} from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user/user.entity";

class UserMongoRepository implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {
    // Métodos de inicialización o configuración de la base de datos si es necesario
  }
  async create(dto: CreateUserDTO): Promise<UserEntity> {
    return this.userDataSource.create(dto);
  }
  async update(dto: UpdateUserDTO): Promise<UserEntity> {
    return this.userDataSource.update(dto);
  }
  async delete(dto: DeleteUserDTO): Promise<void> {
    return this.userDataSource.delete(dto);
  }
  async findById(dto: FindUserByIdDTO): Promise<UserEntity | null> {
    return this.userDataSource.findById(dto);
  }
  async findByEmail(dto: FindUserByEmailDTO): Promise<UserEntity | null> {
    return this.userDataSource.findByEmail(dto);
  }
  async findAll(): Promise<UserEntity[]> {
    return this.userDataSource.findAll();
  }
}

export { UserMongoRepository as UserRepository };

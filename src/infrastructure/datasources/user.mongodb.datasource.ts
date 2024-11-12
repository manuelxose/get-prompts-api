// src/infrastructure/data-sources/MongoUserDataSource.ts

import logger from "../../core/adapters/logger.adapter";
import { UserModel } from "../../data/mongodb/models";
import { UserDataSource } from "../../domain/datasources";
import {
  CreateUserDTO,
  DeleteUserDTO,
  FindUserByEmailDTO,
  FindUserByIdDTO,
  UpdateUserDTO,
} from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user";
import { CustomError } from "../../domain/errors";
import { UserMapper } from "../mappers/user.mapper";

class MongoUserDataSource implements UserDataSource {
  // Crear un nuevo usuario
  async create(registerUserDTO: CreateUserDTO): Promise<UserEntity> {
    const newUser = new UserModel({
      id: registerUserDTO.id,
      displayName: registerUserDTO.displayName,
      photoURL: registerUserDTO.photoURL,
      phoneNumber: registerUserDTO.phoneNumber,
      isSeller: registerUserDTO.isSeller,
      promptsPublished: registerUserDTO.promptsPublished,
      paymentMethods: registerUserDTO.paymentMethods,
      promptsBought: registerUserDTO.promptsBought,
      role: registerUserDTO.role,
      createdAt: registerUserDTO.createdAt,
      updatedAt: registerUserDTO.updatedAt,
      nickName: registerUserDTO.nickName,
      stripeId: registerUserDTO.stripeId,
      promptsLiked: registerUserDTO.promptsLiked || [],
      views: registerUserDTO.views || 0,
      followers: registerUserDTO.followers || [],
      rank: registerUserDTO.rank || 0,
      bio: registerUserDTO.bio || "",
      instagram: registerUserDTO.instagram || "",
      twitter: registerUserDTO.twitter || "",
      youtube: registerUserDTO.youtube || "",
      website: registerUserDTO.website || "",
      bannerURL: registerUserDTO.bannerURL || "",
      following: registerUserDTO.following || [],
      allowMessages:
        registerUserDTO.allowMessages !== undefined
          ? registerUserDTO.allowMessages
          : true,
      acceptCustomJobs:
        registerUserDTO.acceptCustomJobs !== undefined
          ? registerUserDTO.acceptCustomJobs
          : false,
      countryCode: registerUserDTO.countryCode,
    });

    await newUser.save();

    return UserMapper.toEntity(newUser);
  }

  // Actualizar el perfil de un usuario existente
  async update(updateUserProfileDTO: UpdateUserDTO): Promise<UserEntity> {
    // Verificar si el email se está actualizando y si ya está en uso por otro usuario
    if (updateUserProfileDTO.id) {
      const existingUserWithEmail = await UserModel.findOne({
        email: updateUserProfileDTO.id,
      });

      if (
        existingUserWithEmail &&
        existingUserWithEmail.id !== updateUserProfileDTO.id
      ) {
        throw CustomError.badRequest("Email already in use by another user");
      }
    }

    // Encontrar y actualizar el usuario
    const updatedUser = await UserModel.findOneAndUpdate(
      { id: updateUserProfileDTO.id },
      {
        ...updateUserProfileDTO,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw CustomError.notFound("User not found");
    }

    return UserMapper.toEntity(updatedUser);
  }

  // Eliminar una cuenta de usuario
  async delete(deleteUserAccountDTO: DeleteUserDTO): Promise<void> {
    const { userId } = deleteUserAccountDTO;

    console.log("Deleting user with ID: ", userId);

    const result = await UserModel.findOneAndDelete({ userId });

    if (!result) {
      throw CustomError.notFound("User not found");
    }
  }

  // Obtener un usuario por su ID
  async findById(getUserByIdDTO: FindUserByIdDTO): Promise<UserEntity> {
    const user = await UserModel.findOne({ id: getUserByIdDTO.id });

    if (!user) {
      throw CustomError.notFound("User not found");
    }

    return UserMapper.toEntity(user);
  }

  // Obtener un usuario por su email
  async findByEmail(
    getUserByEmailDTO: FindUserByEmailDTO
  ): Promise<UserEntity> {
    const user = await UserModel.findOne({ email: getUserByEmailDTO.email });

    if (!user) {
      throw CustomError.notFound("User not found");
    }

    return UserMapper.toEntity(user);
  }

  // Obtener todos los usuarios
  async findAll(): Promise<UserEntity[]> {
    logger.info("getAllUsers: Start retrieving all users");

    try {
      logger.info("getAllUsers: Initiating database query for users");

      const users = await UserModel.find();

      if (!users) {
        logger.warn("getAllUsers: No users object returned from database");
        throw CustomError.notFound("No users found");
      }

      if (users.length === 0) {
        logger.warn("getAllUsers: Users array is empty");
        throw CustomError.notFound("No users found");
      }

      logger.info(`getAllUsers: ${users.length} users found`);

      const userEntities = users.map((user) => {
        logger.debug(`getAllUsers: Mapping user ID ${user.id}`);
        return UserMapper.toEntity(user);
      });

      logger.info("getAllUsers: Successfully retrieved and mapped users");

      return userEntities;
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        logger.error(`getAllUsers: Error encountered - ${error.message}`);
        throw error;
      } else {
        throw CustomError.internal("An error occurred while retrieving users");
      }
    }
  }
}

export { MongoUserDataSource as UserDataSource };

// src/infrastructure/data-sources/MongoAuthDataSource.ts

import { BcryptAdapter } from "../../core/adapters";
import {
  LoginUserDTO,
  RegisterUserDTO,
  LogoutUserDTO,
  GetActiveUserDTO,
} from "../../domain/dtos/auth";
import { AuthEntity } from "../../domain/entities/auth";
import { CustomError } from "../../domain/errors";
import { AuthDataSource } from "../../domain/datasources";
import { AuthModel } from "../../data/mongodb/models";
import { AuthMapper } from "../mappers/auth.mapper";

class MongoAuthDataSource implements AuthDataSource {
  private bcrypt = new BcryptAdapter();

  // Login a user using their credentials
  async login(loginUserDTO: LoginUserDTO): Promise<AuthEntity> {
    const auth = await AuthModel.findOne({ email: loginUserDTO.email });

    if (!auth) {
      throw CustomError.badRequest("User not found");
    }

    if (!auth.password) {
      throw CustomError.badRequest("Password not set for this user");
    }

    const isPasswordValid = await this.bcrypt.compare(
      loginUserDTO.password.trim(),
      auth.password.trim()
    );

    if (!isPasswordValid) {
      throw CustomError.badRequest("Invalid credentials: Incorrect password");
    }

    console.log("Returning mapped auth entity", auth);

    const authMapped = AuthMapper.toEntity(auth);
    return authMapped;
  }

  // Register a new user in the system
  async register(registerUserDTO: RegisterUserDTO): Promise<AuthEntity> {
    const existingAuth = await AuthModel.findOne({
      email: registerUserDTO.email,
    });

    if (existingAuth) {
      throw CustomError.badRequest("User already exists");
    }

    console.log("User to register: ", registerUserDTO);

    const newAuth = new AuthModel({
      id: registerUserDTO.id,
      userId: registerUserDTO.id, // Asumiendo que el ID del usuario es el mismo que el ID de auth
      method: registerUserDTO.method,
      emailVerified: registerUserDTO.emailVerified || false,
      createdAt: registerUserDTO.createdAt,
      updatedAt: registerUserDTO.updatedAt,
      password: registerUserDTO.password,
      providerId: registerUserDTO.providerId,
      email: registerUserDTO.email,
      refreshTokens: [], // Inicializar con refresh tokens vacíos
    });

    await newAuth.save();

    return AuthMapper.toEntity(newAuth);
  }

  // Logout a user
  async logout(logoutUserDTO: LogoutUserDTO): Promise<void> {
    const { userId, refreshToken } = logoutUserDTO;

    const auth = await AuthModel.findOne({ userId });

    if (!auth) {
      throw CustomError.notFound("Auth record not found for user");
    }

    // Eliminar el refresh token
    const tokenIndex = auth.refreshTokens.findIndex(
      (token) => token.token === refreshToken
    );

    if (tokenIndex === -1) {
      throw CustomError.badRequest("Refresh token not found");
    }

    auth.refreshTokens.splice(tokenIndex, 1);
    await auth.save();
  }

  // Reset password
  // async resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<void> {
  //   const { email, newPassword } = resetPasswordDTO;

  //   const auth = await AuthModel.findOne({ email });

  //   if (!auth) {
  //     throw CustomError.notFound("User not found");
  //   }

  //   const hashedPassword = await this.bcrypt.hash(newPassword);
  //   auth.password = hashedPassword;
  //   auth.updatedAt = new Date();

  //   await auth.save();
  // }

  // Update password
  // async updatePassword(
  //   updatePasswordDTO: UpdatePasswordDTO
  // ): Promise<AuthEntity> {
  //   const { userId, oldPassword, newPassword } = updatePasswordDTO;

  //   const auth = await AuthModel.findOne({ userId });

  //   if (!auth || !auth.password) {
  //     throw CustomError.badRequest("User not found or password not set");
  //   }

  //   const isPasswordValid = await this.bcrypt.compare(
  //     oldPassword,
  //     auth.password
  //   );

  //   if (!isPasswordValid) {
  //     throw CustomError.badRequest("Old password is incorrect");
  //   }

  //   const hashedNewPassword = await this.bcrypt.hash(newPassword);
  //   auth.password = hashedNewPassword;
  //   auth.updatedAt = new Date();

  //   await auth.save();

  //   return AuthMapper.toEntity(auth);
  // }

  // Update profile
  // async updateProfile(updateProfileDTO: UpdateProfileDTO): Promise<AuthEntity> {
  //   const { userId, email, displayName, photoURL, phoneNumber } =
  //     updateProfileDTO;

  //   const auth = await AuthModel.findOne({ userId });

  //   if (!auth) {
  //     throw CustomError.notFound("Auth record not found for user");
  //   }

  //   if (email) {
  //     // Verificar si el nuevo email ya está en uso
  //     const existingAuth = await AuthModel.findOne({ email });
  //     if (existingAuth && existingAuth.userId !== userId) {
  //       throw CustomError.badRequest("Email already in use by another user");
  //     }
  //     auth.email = email;
  //     auth.emailVerified = false; // Reiniciar la verificación de email
  //   }

  //   // **Nota:** Los campos como displayName, photoURL y phoneNumber pertenecen a UserEntity.
  //   // Debes actualizarlos a través del UserDataSource correspondiente.

  //   auth.updatedAt = new Date();

  //   await auth.save();

  //   return AuthMapper.toEntity(auth);
  // }

  // Obtener usuario activo por ID
  // async getActiveUser(getActiveUserDTO: GetActiveUserDTO): Promise<AuthEntity> {
  //   const auth = await AuthModel.findOne({ userId: getActiveUserDTO.userId });

  //   if (!auth) {
  //     throw CustomError.notFound("Active user not found");
  //   }

  //   return AuthMapper.toEntity(auth);
  // }

  // Obtener usuario activo por email
  // async getActiveUserByEmail(
  //   getActiveUserByEmailDTO: GetActiveUserByEmailDTO
  // ): Promise<AuthEntity> {
  //   const auth = await AuthModel.findOne({
  //     email: getActiveUserByEmailDTO.email,
  //   });

  //   if (!auth) {
  //     throw CustomError.notFound("Active user not found");
  //   }

  //   return AuthMapper.toEntity(auth);
  // }

  // Obtener usuario por ID (AuthEntity)
  async findById(getUserByIdDTO: GetActiveUserDTO): Promise<AuthEntity> {
    const auth = await AuthModel.findOne({ userId: getUserByIdDTO.id });

    if (!auth) {
      throw CustomError.notFound("Auth record not found");
    }

    return AuthMapper.toEntity(auth);
  }

  // Obtener todos los registros de autenticación
  // async getAll(): Promise<AuthEntity[]> {
  //   logger.info("getAll: Start retrieving all auth records");

  //   try {
  //     logger.info("getAll: Initiating database query for auth records");

  //     const auths = await AuthModel.find();

  //     if (!auths) {
  //       logger.warn("getAll: No auth records found in database");
  //       throw CustomError.notFound("No auth records found");
  //     }

  //     if (auths.length === 0) {
  //       logger.warn("getAll: Auth records array is empty");
  //       throw CustomError.notFound("No auth records found");
  //     }

  //     logger.info(`getAll: ${auths.length} auth records found`);

  //     const authEntities = auths.map((auth) => {
  //       logger.debug(`getAll: Mapping auth ID ${auth.id}`);
  //       return AuthMapper.toEntity(auth);
  //     });

  //     logger.info("getAll: Successfully retrieved and mapped auth records");

  //     return authEntities;
  //   } catch (error: unknown) {
  //     if (error instanceof CustomError) {
  //       logger.error(`getAll: Error encountered - ${error.message}`);
  //       throw error;
  //     } else {
  //       throw CustomError.internal(
  //         "An error occurred while retrieving auth records"
  //       );
  //     }
  //   }
  // }
}

export { MongoAuthDataSource as AuthDataSource };

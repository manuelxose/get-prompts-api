// src/domain/dtos/user/updateUserProfile.dto.ts

import { Validators } from "../../../shared/validators";
import { UserEntity } from "../../entities/user/user.entity";
import { CountryCode, UserRole } from "../../enums";

export class UpdateUserDTO {
  id!: string; // Usamos `!` para indicar que esta propiedad será asignada posteriormente
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  isSeller?: boolean;
  nickName?: string;
  bio?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
  bannerURL?: string;
  allowMessages?: boolean;
  acceptCustomJobs?: boolean;
  role?: UserRole;
  countryCode?: CountryCode;

  static create(
    data: Partial<UpdateUserDTO>
  ): [string | null, UpdateUserDTO | null] {
    const dto = new UpdateUserDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    // Validaciones utilizando el módulo de Validators
    if (dto.displayName && !Validators.isValidDisplayName(dto.displayName)) {
      errors.push("Display name must be between 3 and 50 characters");
    }
    if (dto.photoURL && !Validators.isValidURL(dto.photoURL)) {
      errors.push("Invalid URL format for photoURL");
    }
    if (dto.phoneNumber && !Validators.isValidPhoneNumber(dto.phoneNumber)) {
      errors.push("Invalid phone number format");
    }
    if (dto.role && !Validators.isValidRole(dto.role)) {
      errors.push("Invalid role");
    }
    if (dto.countryCode && !Validators.isValidCountryCode(dto.countryCode)) {
      errors.push("Invalid country code");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }

  static createFromDTO(dto: UpdateUserDTO): UserEntity {
    // Usamos un objeto de configuración para crear la instancia de UserEntity
    return UserEntity.create({
      id: dto.id,
      displayName: dto.displayName,
      photoURL: dto.photoURL,
      phoneNumber: dto.phoneNumber,
      isSeller: dto.isSeller,
      nickName: dto.nickName,
      bio: dto.bio,
      instagram: dto.instagram,
      twitter: dto.twitter,
      youtube: dto.youtube,
      website: dto.website,
      bannerURL: dto.bannerURL,
      allowMessages: dto.allowMessages ?? true,
      acceptCustomJobs: dto.acceptCustomJobs ?? false,
      role: dto.role || UserRole.USER,
      countryCode: dto.countryCode,
      createdAt: new Date(),
      updatedAt: new Date(),
      promptsPublished: [], // Inicializamos con valores predeterminados
      paymentMethods: [],
      promptsBought: [],
      promptsLiked: [],
      views: 0,
      followers: [],
      rank: 0,
      following: [],
      stripeId: "", // Valor predeterminado para stripeId
    });
  }
}
